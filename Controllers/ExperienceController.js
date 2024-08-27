const dotenv = require('dotenv');
const connection = require('../Config/DBConfig');
dotenv.config({ path: './config.env' });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const session = require('express-session');

const queryAsync = (sql, params) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

const ExperienceController = {
    getAllExperienceForAUser: async (req, res) => {
        const token = req.body.token;
        try {
            const decoded = jwt.verify(token, process.env.JWTSecret);
            const email = decoded.email;

            const userQuery = `SELECT * FROM users WHERE email = ?`;
            const userResult = await queryAsync(userQuery, [email]);

            if (userResult.length === 0) {
                return res.json({ status: 'failed', error: 'User not found.', StatusCode: 404 });
            }

            const user_id = userResult[0].user_id;

            const experienceQuery = `
        SELECT * 
        FROM experience_helper_table AS eh
        JOIN experience AS ed ON eh.experience_id = ed.experience_id
        WHERE eh.user_id = ?`;
            const experienceResult = await queryAsync(experienceQuery, [user_id]);

            return res.json({ status: 'success', data: experienceResult, message: 'Experience fetched successfully.', StatusCode: 200 });
        } catch (error) {
            console.error('Error fetching experience:', error);
            return res.json({ status: 'failed', error: 'An error occurred.', StatusCode: 500 });
        }
    },

    addExperience: async (req, res) => {
        const token = req.body.token;
        const { company_name, company_location, job_title, description, start_date, end_date } = req.body;

        if (!company_name || !company_location || !job_title || !description || !start_date || !end_date) {
            return res.json({ status: 'failed', error: 'Please fill all fields.', StatusCode: 400 });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWTSecret);
            const email = decoded.email;

            const userQuery = `SELECT * FROM users WHERE email = ?`;
            const userResult = await queryAsync(userQuery, [email]);

            if (userResult.length === 0) {
                return res.json({ status: 'failed', error: 'User not found.', StatusCode: 404 });
            }

            const user_id = userResult[0].user_id;

            const experienceQuery = `INSERT INTO experience (company_name, company_location, job_title, description, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)`;
            const experienceResult = await queryAsync(experienceQuery, [company_name, company_location, job_title, description, start_date, end_date]);

            const experience_id = experienceResult.insertId;

            const experienceHelperQuery = `INSERT INTO experience_helper_table (user_id, experience_id) VALUES (?, ?)`;
            await queryAsync(experienceHelperQuery, [user_id, experience_id]);

            return res.json({ status: 'success', message: 'Experience added successfully.', StatusCode: 200 });



        } catch (error) {
            console.error('Error adding experience:', error);
            return res.json({ status: 'failed', error: 'Failed to add experience.', StatusCode: 500 });
        }
    },

    getSingleExperiencebasedonUserIdandExperienceId: async (req, res) => {
        const token = req.body.token;
        try {
            const decoded = jwt.verify(token, process.env.JWTSecret);
            const email = decoded.email;

            const userQuery = `SELECT * FROM users WHERE email = ?`;
            const userResult = await queryAsync(userQuery, [email]);

            if (userResult.length === 0) {
                return res.json({ status: 'failed', error: 'User not found.', StatusCode: 404 });
            }

            const user_id = userResult[0].user_id;
            const experience_id = req.params.experience_id;

            const experienceQuery = `
        SELECT * 
        FROM experience_helper_table AS eh
        JOIN experience AS ed ON eh.experience_id = ed.experience_id
        WHERE eh.user_id = ? AND eh.experience_id = ?`;
            const experienceResult = await queryAsync(experienceQuery, [user_id, experience_id]);

            if (experienceResult.length === 0) {
                return res.json({ status: 'failed', error: 'Experience not found.', StatusCode: 404 });
            }

            return res.json({ status: 'success', data: experienceResult[0], message: 'Experience fetched successfully.', StatusCode: 200 });
        } catch (error) {
            console.error('Error fetching experience:', error);
            return res.json({ status: 'failed', error: 'An error occurred.', StatusCode: 500 });
        }
    },

    deleteExperience: async (req, res) => {
        const token = req.body.token;
        try {
            const decoded = jwt.verify(token, process.env.JWTSecret);
            const email = decoded.email;

            const userQuery = `SELECT * FROM users WHERE email = ?`;
            const userResult = await queryAsync(userQuery, [email]);

            if (userResult.length === 0) {
                return res.json({ status: 'failed', error: 'User not found.', StatusCode: 404 });
            }

            const user_id = userResult[0].user_id;
            const experience_id = req.params.experience_id;

           
            const experienceHelperQuery = `DELETE FROM experience_helper_table WHERE experience_id = ?`;
            await queryAsync(experienceHelperQuery, [experience_id]);

            const experienceQuery = `DELETE FROM experience WHERE experience_id = ?`;
            await queryAsync(experienceQuery, [experience_id]);


            return res.json({ status: 'success', message: 'Experience deleted successfully.', StatusCode: 200 });
        } catch (error) {
            console.error('Error deleting experience:', error);
            return res.json({ status: 'failed', error: 'An error occurred.', StatusCode: 500 });
        }
    }
};

module.exports = ExperienceController;
