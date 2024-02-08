const connection = require('../../../connection/config/database');
const sha1 = require('sha1');
const bcrypt = require('bcrypt');

const usersModel = {
  createUsers: async (req, res) => {
    try {
      const {full_name, email, password, mobile, gender, religion, dob} =
        req.body;

      // Hash the password using SHA-1
      const hashedPassword = sha1(password);

      // Insert the user into the database
      const sql =
        'INSERT INTO users (  full_name, email,password,mobile, gender, religion, dob  ) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [
        full_name,
        email,
        hashedPassword,
        mobile,
        gender,
        religion,
        dob,
      ];

      connection.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({message: 'User creation failed'});
        } else {
          res.status(200).json({message: 'User created successfully', result});
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  loginUserEmailPassword: async (req, res) => {
    const {email, password} = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.query(sql, [email], async (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({message: 'Login failed'});
      } else if (result.length === 0) {
        res.status(401).json({message: 'User not found'});
      } else {
        const user = result[0];
        const hashedPassword = sha1(password); // Hash the password using SHA-1

        if (hashedPassword === user.password) {
          // Compare with the stored hash
          res.status(200).json({message: 'Login successful'});
          // res.redirect('http://192.168.0.107:3000')
        } else {
          res.status(401).json({message: 'Invalid password'});
        }
      }
    });
  },

  usersListAll: async (req, res) => {
    try {
      const data = 'select * from users';

      connection.query(data, function (error, result) {
        if (!error) {
          //   return  res.send(result,'nayan')

          res.status(200).send(result);
          // res.sendFile(path.join(__dirname + "../../App.js"));
        } else {
          console.log(error, 'nayan');
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  getAllAdminPageList: async (req, res) => {
    try {
      const data = 'select * from 	admin_page_list';
      connection.query(data, function (error, result) {
        console.log(result);
        if (!error) {
          res.send(result);
        } else {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  CreateMobileAllowance: async (req, res) => {
    try {
      const {
        recharge_user,
        mobile,
        amount,
        recharge_time,
        created_date,
        modified_date,
        created_by,
      } = req.body;

      // Hash the password using SHA-1

      // Insert the user into the database
      const sql =
        'INSERT INTO mobile_allowance (recharge_user, mobile, amount, recharge_time, created_date, modified_date, created_by ) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [
        recharge_user,
        mobile,
        amount,
        recharge_time,
        created_date,
        modified_date,
        created_by,
      ];

      connection.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({message: 'User creation failed'});
        } else {
          res.status(200).json({message: 'User created successfully', result});
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  CreateTransportAllowance: async (req, res) => {
    try {
      const {
        travel_from,
        travel_to,
        vehicle_name,
        km_travel,
        travel_from_time,
        travel_to_time,
        amount,
      } = req.body;

      // Hash the password using SHA-1

      // Insert the user into the database
      const sql =
        'INSERT INTO transport_allowance (travel_from,  travel_to, vehicle_name, km_travel,travel_from_time, travel_to_time , amount) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [
        travel_from,
        travel_to,
        vehicle_name,
        km_travel,
        travel_from_time,
        travel_to_time,
        amount,
      ];

      connection.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .json({message: 'Transport Allowance creation failed'});
        } else {
          res.status(200).json({
            message: 'Transport Allowance created successfully',
            result,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  SingleMobileAllowance: async (req, res) => {
    try {
      const query = 'SELECT * FROM mobile_allowance WHERE id = ?';
      connection.query(query, [req.params.id], (error, result) => {
        if (!error && result.length > 0) {
          console.log(result);
          return res.send(result);
        } else {
          console.log(error || 'Product not found');
          return res.status(404).json({message: 'Product not found.'});
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  MobileAllowanceAllList: async (req, res) => {
    try {
      const data = 'select * from mobile_allowance';

      connection.query(data, function (error, result) {
        if (!error) {
          //   return  res.send(result,'nayan')

          res.status(200).send(result);
          // res.sendFile(path.join(__dirname + "../../App.js"));
        } else {
          console.log(error, 'nayan');
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  SingleTransportAllowance: async (req, res) => {
    try {
      const query = 'SELECT * FROM transport_allowance WHERE id = ?';
      connection.query(query, [req.params.id], (error, result) => {
        if (!error && result.length > 0) {
          console.log(result);
          return res.send(result);
        } else {
          console.log(error || 'Product not found');
          return res.status(404).json({message: 'Product not found.'});
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  TransportAllowanceAllList: async (req, res) => {
    try {
      const data = 'select * from transport_allowance';

      connection.query(data, function (error, result) {
        if (!error) {
          //   return  res.send(result,'nayan')

          res.status(200).send(result);
          // res.sendFile(path.join(__dirname + "../../App.js"));
        } else {
          console.log(error, 'nayan');
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  mobileAllowanceDelete: async (req, res) => {
    try {
      const query = 'DELETE FROM mobile_allowance WHERE id = ?';
      connection.query(query, [req.params.id], (error, result) => {
        if (!error && result.affectedRows > 0) {
          console.log(result);
          return res.send(result);
        } else {
          console.log(error || 'Product not found');
          return res.status(404).json({message: 'Product not found.'});
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = usersModel;
