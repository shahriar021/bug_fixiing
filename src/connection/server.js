const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const buliding = require('../model/building/building_model');

app.post('/building/building_create', buliding.addBuilding);
app.get('/building/building_list', buliding.allBuilding);

const ModuleInfoModel = require('../model/module_info/module_info_model');
app.get('/module_info/module_info_list', ModuleInfoModel.moduleInfoList);


app.get('/', (req, res) => {
  res.send('Server running from MDHRShohel');
});

const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`server is running on port: ${port} from MDHRShohel`);
});
