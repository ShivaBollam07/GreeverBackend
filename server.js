const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const connection = require('./Config/DBConfig');
const session = require('express-session');
const AuthRouter = require('./Routes/AuthRouter.js');
const UserRouter = require('./Routes/UserRouter.js');
const CoursesRouter = require('./Routes/CoursesRouter.js');


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
app.use('/app/v1/user', UserRouter);
app.use('/app/v1/courses', CoursesRouter);

app.use("*" , (req, res) => {
    res.status(404).json({error: 'Invalid URL'});
});

app.listen(process.env.BackendPort, () => {
    console.log(`Server Started Listening on ${process.env.BackendPort} Port`);
});  
