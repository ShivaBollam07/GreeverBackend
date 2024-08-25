const express = require('express');
const dotenv = require('dotenv');
const AuthRouter = require('./Routes/AuthRouter');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const connection = require('./Config/DBConfig');
const session = require('express-session');


dotenv.config({path: './config.env'});

connection.getConnection((err) => {
    if(err) {
        console.log('Error connecting to Database Greever: ' + err);
    } else {
        console.log('Connected to Database Greever');
    }
});

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use(session({
    secret: process.env.SessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use('/app/v1/auth', AuthRouter);


app.listen(process.env.BackendPort, () => {
    console.log(`Server Started Listening on ${process.env.BackendPort} Port`);
});  