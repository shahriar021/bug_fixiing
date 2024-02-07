const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var mysql = require('mysql');

var connections = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'urbanit101_psms_dsms',
});
app.get('/all_building', (req, res) => {
  const query = 'SELECT * FROM building';
  connections.query(query, (error, result) => {
    if (!error) {
      console.log(result);
      return res.send(result);
    } else {
      console.log(error);
      return res.status(500).json({message: 'Failed to get products.'});
    }
  });
});


app.post('/Admin/building/building_create', (req, res) => {


 try {
   const {building_name, created_by, created_date} = req.body;


   const sql =
     'INSERT INTO building (building_name, created_by, created_date) VALUES (?, ?, ?)';
   const values = [building_name, created_by, created_date];

   connections.query(sql, values, (err, result) => {
     if (err) {
       console.error(err);
       res.status(500).json({message: ' building creation failed'});
     } else {
       res.status(200).json({
         message: 'building created successfully',
         result,
       });
     }
   });
 } catch (error) {
   console.log(error);
 }
});


app.get('/get_all/module_info', (req, res) => {
  const query = `
    SELECT ap.id AS page_group_id, ap.page_group, ap.controller_name, ap.display_name, ap.method_name
      FROM admin_page_list ap
      WHERE ap.parent_id != 0
      AND ap.menu_type = 1 
      GROUP BY ap.page_group, ap.controller_name, ap.display_name, ap.method_name
      HAVING ap.page_group IS NOT NULL AND ap.page_group != '';  
      `;

  connections.query(query, (error, results) => {
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
});

  connections.query(function (error) {
    if (!!error) {
      console.log('connected');
      const data = 'select * from 	users';
      connections.query(data, function (error, result) {
        console.log(result);
      });
    } else {
      console.log(error, 'Error');
    }
  });

app.get('/', (req, res) => {
  res.send('Server running from MDHRShohel');
});

const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`server is running on port: ${port} from MDHRShohel`);
});
