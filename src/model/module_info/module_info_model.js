const connection = require('../../connection/config/database');

const ModuleInfoModel = {

  moduleInfoList: async (req, res) => {
    try {
      
      const query = `
    SELECT ap.id AS page_group_id, ap.page_group, ap.controller_name, ap.display_name, ap.method_name
      FROM admin_page_list ap
      WHERE ap.parent_id != 0
      AND ap.menu_type = 1 
      GROUP BY ap.page_group, ap.controller_name, ap.display_name, ap.method_name
      HAVING ap.page_group IS NOT NULL AND ap.page_group != '';  
      `;

      connection.query(query, (error, results) => {
        if (error) {
          console.error('Error executing MySQL query:', error);
          res.status(500).json({message: 'Internal server error'});
          return;
        }

        // Helper function to compare names case-insensitively
        const areNamesEqual = (name1, name2) =>
          name1.toLowerCase() === name2.toLowerCase();

        // Process the data to group by page_group and create an object
        const groupedData = results.reduce((acc, row) => {
          const {
            page_group_id,
            page_group,
            controller_name,
            display_name,
            method_name,
          } = row;
          const pageGroupLowerCase = page_group.toLowerCase(); // Convert to lowercase

          if (!acc[pageGroupLowerCase]) {
            acc[pageGroupLowerCase] = {
              page_group_id,
              page_group: pageGroupLowerCase, // Store in lowercase
              controllers: [],
            };
          }

          const controller = acc[pageGroupLowerCase].controllers.find(c =>
            areNamesEqual(c.controller_name, controller_name),
          ); // Compare names case-insensitively

          if (controller) {
            const display = controller.display_names.find(display =>
              areNamesEqual(display.display_name, display_name),
            ); // Compare names case-insensitively
            if (display) {
              display.method_names.push(method_name);
            } else {
              controller.display_names.push({
                display_name,
                method_names: [method_name],
              });
            }
          } else {
            acc[pageGroupLowerCase].controllers.push({
              controller_name,
              display_names: [{display_name, method_names: [method_name]}],
            });
          }

          return acc;
        }, {});

        const responseData = Object.values(groupedData);

        if (responseData.length > 0) {
          res.json(responseData);
        } else {
          res.status(404).json({message: 'Data not found'});
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  
};

module.exports = ModuleInfoModel;
