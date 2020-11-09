//Varaibles/Requirements
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors')

const connection = mysql.createConnection({
    // Localhost
    host     : 'localhost',
    // MySQL user + database
      user     : 'root',
      password : '',
      database : 'repotadb'
 });
      // Imports added to server:
app.use(cors(corsOptions = {
    origin: '*',
    credentials: true
  }));
  app.use(bodyParser.json());
  
  //node server for mysql
  connection.connect(function (err) {
    if (err) throw err;
    else
    // connect to database message
      console.log("\n\n CONNECTED TO DATABASE \n\n");
  });


  var Autos = {
    getAutos: function (callback) {
      // run query
      return connection.query('show tables', callback);
    }
  }
  
  // function to get data 
  app.get('/autos', function (req, res) {
    Autos.getAutos(function (err, data) {
      if (err) res.status(400).send(err)
  
      // Complete - send callback
      res.send(data);
      console.log(data);
    });
  });

  //Express Server
app.listen('8081', () => console.log("Express Server Running on port no : 8081"));

module.exports = connection;