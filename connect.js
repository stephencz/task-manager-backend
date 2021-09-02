require('dotenv').config();
const mysql = require('mysql');

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USERNAME
const DB_PWD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME;

const make_connection = (res) => {
  let con = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PWD,
    database: DB_NAME
  });

  con.connect(function(err) {
    if (err) {
      res.send(err);
      throw err;
    } 
  });

  return con;

};

exports.make_connection = make_connection;
