const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config({ path: '.env'} );

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USERNAME
const DB_PWD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME;

// Connects to Database
const connect = (host, user, pwd) => {
  let con = mysql.createConnection({
    host: host,
    user: user,
    password: pwd
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
  });

  return con
};

//Connect
let connection = connect(DB_HOST, DB_USER, DB_PWD);

//CREATE DATABASE
connection.query('CREATE DATABASE IF NOT EXISTS ' + DB_NAME + ';');
connection.query('USE ' + DB_NAME + ';');
connection.commit();

//CREATE TASKS TABLE
connection.query('CREATE TABLE IF NOT EXISTS tasks( task_id INT NOT NULL AUTO_INCREMENT, task_description VARCHAR(255), task_date DATE, PRIMARY KEY (task_id) );')
connection.commit();

//CREATE TAGS TABLE
connection.query('CREATE TABLE IF NOT EXISTS tags( tag_id INT NOT NULL AUTO_INCREMENT, tag_text VARCHAR(128), tag_fg VARCHAR(10), tag_bg VARCHAR(10), PRIMARY KEY (tag_id) );');
connection.commit();

//CREATE TASK-TAGS MAPPING TABLE
connection.query('CREATE TABLE IF NOT EXISTS task_tags( task_tag_id INT NOT NULL AUTO_INCREMENT, task_id INT NOT NULL, tag_id INT NOT NULL, PRIMARY KEY(task_tag_id), FOREIGN KEY (task_id) REFERENCES tasks(task_id),FOREIGN KEY (tag_id) REFERENCES tags(tag_id) );')
connection.commit();

connection.end()