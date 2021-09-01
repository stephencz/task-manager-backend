require('../connect');
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USERNAME
const DB_PWD = process.env.DB_PASSWORD

const DB_NAME = process.env.DB_NAME;

let connection = connect(DB_HOST, DB_USER, DB_PWD);

//CREATE DATABASE
connection.query('CREATE DATABASE IF NOT EXISTS ' + DB_NAME + ';');
connection.query('USE ' + DB_NAME + ';');
connection.commit();

//CREATE TASKS TABLE


//CREATE TAGS TABLE


//CREATE TASK-TAGS MAPPING TABLE


connection.end()