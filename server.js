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
const ReadingListItemRouter = require('./Routes/ReadingListItemRouter');
const EducationRouter = require('./Routes/EducationRouter');
const ExperienceRouter = require('./Routes/ExperienceRouter');
const cors = require('cors');

dotenv.config({ path: './config.env' });

// Connect to MYSQL
connection.getConnection((err) => {
    if (err) {
        console.error('Database Connection Failed: ' + err.stack);
        return;
    }
    console.log('Connected to MYSQL Database ' +  process.env.Mysql_DB_NAME);
});

// Connect to MongoDB
connectToDB();

// db.courses.updateMany(
//     {},
//     { $set: { course_banner: "https://static.vecteezy.com/system/resources/previews/000/664/483/original/abstract-blue-banner-design-vector.jpg" } }
//   )

// run the above query 





const app = express();

// CORS configuration
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());

app.use(session({
    secret: process.env.SessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

app.use('/app/v1/auth', AuthRouter);
app.use('/app/v1/auth/getname', AuthRouter);
app.use('/app/v1/user', UserRouter);
app.use('/app/v1/education', EducationRouter);
app.use('/app/v1/experience', ExperienceRouter);
app.use('/app/v1/courses', CoursesRouter);
app.use('/app/v1/video', VideoRouter);
app.use('/app/v1/reading_lists', ReadingListRouter);
app.use('/app/v1/reading_list', ReadingListItemRouter);

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Invalid URL' });
});

app.listen(process.env.BackendPort, () => {
    console.log(`Server Started Listening on ${process.env.BackendPort} Port`);
});