// const express = require('express');
// const app = express();
// require('dotenv').config();
// const cors = require('cors');
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// const buliding = require('../model/building/building_model');

// app.post('/building/building_create', buliding.addBuilding);
// app.get('/building/building_list', buliding.allBuilding);

// const ModuleInfoModel = require('../model/module_info/module_info_model');
// app.get('/module_info/module_info_list', ModuleInfoModel.moduleInfoList);

// app.get('/', (req, res) => {
//   res.send('Server running from MDHRShohel');
// });

// const port = process.env.PORT || 5002;
// app.listen(port, () => {
//   console.log(`server is running on port: ${port} from MDHRShohel`);
// });

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

// const usersModel = require('../model/usersModel');
const usersModel = require('../model/Admin/users_model/user_model');
app.post('/createUsers', usersModel.createUsers);
app.post('/loginUser', usersModel.loginUserEmailPassword);
app.get('/all_users', usersModel.usersListAll);
app.get('/get_all/admin_page_list', usersModel.getAllAdminPageList);

app.get(
  '/mobile_allowance/mobile_allowance_single/:id',
  usersModel.SingleMobileAllowance,
);
app.get(
  '/mobile_allowance/mobile_allowance_list',
  usersModel.MobileAllowanceAllList,
);

app.post(
  '/mobile_allowance/mobile_allowance_delete/:id',
  usersModel.mobileAllowanceDelete,
);

app.post(
  '/mobile_allowance/mobile_allowance_create',
  usersModel.CreateMobileAllowance,
);
app.post(
  '/transport_allowance/CreateTransportAllowance',
  usersModel.CreateTransportAllowance,
);

app.get(
  '/transport_allowance/transport_allowance_single/:id',
  usersModel.SingleTransportAllowance,
);
app.get(
  '/transport_allowance/transport_allowance_list',
  usersModel.TransportAllowanceAllList,
);

// app.post('/signup', (req, res) => {
//   const {full_name, email, password, mobile, gender, religion} = req.body;

//   // Perform any necessary validation here

//   const sql =
//     'INSERT INTO users ( full_name, email, password, mobile, gender,religion) VALUES (?, ?, ?, ?, ?, ?)';
//   const values = [full_name, email, password, mobile, gender, religion];

//   connection.query(sql, values, (error, results) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({error: 'User registration failed'});
//     }

//     return res.status(200).json({success: true, userId: results.insertId});
//   });
// });
app.get('/', (req, res) => {
  res.send('Server running shahriar chowdhury');
});

const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
