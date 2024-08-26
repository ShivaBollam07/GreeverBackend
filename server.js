const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');
const { connectToDB } = require('./Config/MongoConfig');
const connection = require('./Config/DBConfig');
const AuthRouter = require('./Routes/AuthRouter');
const UserRouter = require('./Routes/UserRouter');
const CoursesRouter = require('./Routes/CoursesRouter');
const VideoRouter = require('./Routes/VideoRouter');
const ReadingListRouter = require('./Routes/ReadingListRouter');

dotenv.config({ path: './config.env' });

// Connect to MYSQL
connection.getConnection((err) => {
    if (err) {
        console.error('Database Connection Failed: ' + err.stack);
        return;
    }
    console.log('Connected to MYSQL Database Greever');
});

// Connect to MongoDB
connectToDB();

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
app.use('/app/v1/video', VideoRouter);
app.use('/app/v1/reading_lists', ReadingListRouter);

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Invalid URL' });
});

app.listen(process.env.BackendPort, () => {
    console.log(`Server Started Listening on ${process.env.BackendPort} Port`);
});
