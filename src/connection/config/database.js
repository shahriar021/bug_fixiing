var mysql = require('mysql');

var connections = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'hr_allowance',
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

module.exports = connections;
