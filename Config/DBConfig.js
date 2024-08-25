const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const connection = mysql.createPool({
    host: process.env.Mysql_HOST,
    user: process.env.Mysql_USER,
    password: process.env.Mysql_PASSWORD,
    database: process.env.Mysql_DB_NAME,
});

module.exports = connection;