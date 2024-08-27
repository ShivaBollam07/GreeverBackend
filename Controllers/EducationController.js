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

const EducationController = {
  getAllEducationForAUser: async (req, res) => {
    const token = req.body.token;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const email = decoded.email;

      const userQuery = `SELECT * FROM users WHERE email = ?`;
      const userResult = await queryAsync(userQuery, [email]);

      if (userResult.length === 0) {
        return res.json({ status: 'failed', error: 'User not found.', StatusCode: 404 });
      }

      const user_id = userResult[0].user_id;

      const educationQuery = `
        SELECT * 
        FROM education_helper_table AS eh
        JOIN education AS ed ON eh.education_id = ed.education_id
        WHERE eh.user_id = ?`;
      const educationResult = await queryAsync(educationQuery, [user_id]);

      return res.json({ status: 'success', data: educationResult, message: 'Education fetched successfully.', StatusCode: 200 });
    } catch (error) {
      console.error('Error fetching education:', error);
      return res.json({ status: 'failed', error: 'An error occurred.', StatusCode: 500 });
    }
  },

  addEducation: async (req, res) => {
    const token = req.body.token;
    const { institute_name, institute_location, degree, major, start_date, end_date, grade } = req.body;

    if (!institute_name || !institute_location || !degree || !major || !start_date || !end_date || !grade) {
      return res.json({ status: 'failed', error: 'All fields are required.', StatusCode: 400 });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const email = decoded.email;

      const userQuery = `SELECT * FROM users WHERE email = ?`;
      const userResult = await queryAsync(userQuery, [email]);

      if (userResult.length === 0) {
        return res.json({ status: 'failed', error: 'User not found.', StatusCode: 404 });
      }

      const user_id = userResult[0].user_id;

      const insertEducationQuery = `
        INSERT INTO education (institute_name, institute_location, degree, major, start_date, end_date, grade)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const educationResult = await queryAsync(insertEducationQuery, [institute_name, institute_location, degree, major, start_date, end_date, grade]);

      const education_id = educationResult.insertId;

      const insertHelperQuery = `INSERT INTO education_helper_table (user_id, education_id) VALUES (?, ?)`;
      await queryAsync(insertHelperQuery, [user_id, education_id]);

      return res.json({ status: 'success', message: 'Education added successfully.', StatusCode: 200 });
    } catch (error) {
      console.error('Error adding education:', error);
      return res.json({ status: 'failed', error: 'Failed to add education.', StatusCode: 500 });
    }
  },

  getSingleEducationbasedonUserIdandEducationId: async (req, res) => {
    const token = req.body.token;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const email = decoded.email;

      const userQuery = `SELECT * FROM users WHERE email = ?`;
      const userResult = await queryAsync(userQuery, [email]);

      if (userResult.length === 0) {
        return res.json({ status: 'failed', error: 'User not found.', StatusCode: 404 });
      }

      const user_id = userResult[0].user_id;
      const education_id = req.params.education_id;

      const educationQuery = `
        SELECT * 
        FROM education_helper_table AS eh
        JOIN education AS ed ON eh.education_id = ed.education_id
        WHERE eh.user_id = ? AND eh.education_id = ?`;
      const educationResult = await queryAsync(educationQuery, [user_id, education_id]);

      if (educationResult.length === 0) {
        return res.json({ status: 'failed', error: 'Education not found.', StatusCode: 404 });
      }

      return res.json({ status: 'success', data: educationResult[0], message: 'Education fetched successfully.', StatusCode: 200 });
    } catch (error) {
      console.error('Error fetching education:', error);
      return res.json({ status: 'failed', error: 'An error occurred.', StatusCode: 500 });
    }
  },

  deleteEducation: async (req, res) => {
    const token = req.body.token;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const email = decoded.email;

      const userQuery = `SELECT * FROM users WHERE email = ?`;
      const userResult = await queryAsync(userQuery, [email]);

      if (userResult.length === 0) {
        return res.json({ status: 'failed', error: 'User not found.', StatusCode: 404 });
      }

      const user_id = userResult[0].user_id;
      const education_id = req.params.education_id;

      const deleteQuery = `DELETE FROM education_helper_table WHERE user_id = ? AND education_id = ?`;
      const deleteResult = await queryAsync(deleteQuery, [user_id, education_id]);

      if (deleteResult.affectedRows === 0) {
        return res.json({ status: 'failed', error: 'Education not found.', StatusCode: 404 });
      }

      return res.json({ status: 'success', message: 'Education deleted successfully.', StatusCode: 200 });
    } catch (error) {
      console.error('Error deleting education:', error);
      return res.json({ status: 'failed', error: 'An error occurred.', StatusCode: 500 });
    }
  }
};

module.exports = EducationController;
