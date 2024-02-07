const connection = require('../../connection/config/database');

const BuildingModel = {

    
  addBuilding: async (req, res) => {
    try {
      const {building_name, created_by, created_date} = req.body;

      const sql =
        'INSERT INTO building (building_name, created_by, created_date) VALUES (?, ?, ?)';
      const values = [building_name, created_by, created_date];

      connection.query(sql, values, (err, result) => {
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
  },

  allBuilding: async (req, res) => {
    try {
      const query = 'SELECT * FROM building';
      connection.query(query, (error, result) => {
        if (!error) {
          console.log(result);
          return res.send(result);
        } else {
          console.log(error);
          return res.status(500).json({message: 'Failed to get products.'});
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};


module.exports = BuildingModel;