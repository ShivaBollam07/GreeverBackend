const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const connection = require('../Config/DBConfig');
dotenv.config({ path: './config.env' });


const UserController = {
    GetUserDetails: (req, res) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1] || req.body.token;
        const decoded = jwt.verify(token, process.env.JWTSecret);
        const email = decoded.email;
        connection.query('SELECT * FROM users WHERE email = ?', email, (error, results) => {
            if (error) {
                return res.json({ 'status': 'error', 'message': 'An error occurred while fetching user details', 'statusCode': 500 });
            }
            if (results.length === 0) {
                return res.json({ 'status': 'error', 'message': 'User not found', 'statusCode': 404 });
            }
            const user_id = results[0].user_id;
            connection.query('SELECT * FROM user_details WHERE user_id = ?', user_id, (error, results) => {
                if (error) {
                    return res.json({ 'status': 'error', 'message': 'An error occurred while fetching user details', 'statusCode': 500 });
                }
                else if (results.length === 0) {
                    return res.json({ 'status': 'error', 'message': 'User details not found', 'statusCode': 404 });
                }
                else {
                    return res.json({ 'status': 'success', 'data': results[0], 'message': 'User details retrieved successfully', 'statusCode': 200 });
                }
            });
        });
    },

    PostUserDetails: (req, res) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1] || req.body.token;
        const decoded = jwt.verify(token, process.env.JWTSecret);
        const email = decoded.email;
        const { full_name, about_yourself, address, personal_website_link, github_link } = req.body;

        if (!full_name) {
            return res.json({ 'status': 'error', 'message': 'Full name is required', 'statusCode': 400 });
        }
        if (!about_yourself) {
            about_yourself = 'Hello My name is ' + full_name;
        }
        if (!address) {
            address = 'Not provided';
        }
        if (!personal_website_link) {
            personal_website_link = 'Not provided';
        }
        if (!github_link) {
            github_link = 'Not provided';
        }

        const user_idgetter = `SELECT user_id FROM users WHERE email = ?`;

        connection.query(user_idgetter, email, (error, results) => {
            if (error) {
                return res.json({ 'status': 'error', 'message': 'An error occurred while fetching user details', 'statusCode': 500 });
            }
            if (results.length === 0) {
                return res.json({ 'status': 'error', 'message': 'User not found', 'statusCode': 404 });
            }
            const_check_if_user_details_exist = `SELECT * FROM user_details WHERE user_id = ?`;
            connection.query(const_check_if_user_details_exist, results[0].user_id, (error, results) => {
                if (error) {
                    return res.json({ 'status': 'error', 'message': 'An error occurred while fetching user details', 'statusCode': 500 });
                }
                if (results.length !== 0) {
                    return res.json({ 'status': 'error', 'message': 'User details already exist', 'statusCode': 400 });
                }
            });


            const user_id = results[0].user_id;
            const user_details = {
                user_id: user_id,
                full_name: full_name,
                about_yourself: about_yourself,
                address: address,
                personal_website_link: personal_website_link,
                github_link: github_link
            }
            connection.query('INSERT INTO user_details SET ?', user_details, (error, results) => {
                if (error) {
                    return res.json({ 'status': 'error', 'message': 'An error occurred while adding user details', 'statusCode': 500 });
                }
                return res.json({ 'status': 'success', 'data': results, 'message': 'User details added successfully', 'statusCode': 201 });
            });
        });
    },

    UpdateUserDetails: (req, res) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1] || req.body.token;
        const decoded = jwt.verify(token, process.env.JWTSecret);
        const email = decoded.email;

        const { full_name, about_yourself, address, personal_website_link, github_link } = req.body;

        const user_id_getter = `SELECT user_id FROM users WHERE email = ?`;
        const user_details = {
            full_name: full_name,
            about_yourself: about_yourself,
            address: address,
            personal_website_link: personal_website_link,
            github_link: github_link
        }

        connection.query(user_id_getter, email, (error, result) => {
            if (error) {
                res.json({ 'status': 'error', 'message': 'An error Occurred', 'statusCode': 500 })
            }
            else {
                const user_id = result[0].user_id;
                const updatequey = `UPDATE user_details SET full_name = COALESCE(?, full_name), about_yourself = COALESCE(?, about_yourself), address = COALESCE(?, address), personal_website_link = COALESCE(?, personal_website_link), github_link = COALESCE(?, github_link) WHERE user_id = ?`;
                connection.query(updatequey, [user_details.full_name, user_details.about_yourself, user_details.address, user_details.personal_website_link, user_details.github_link, user_id], (error, results) => {
                    if (error) {
                        return res.json({ 'status': 'error', 'message': 'An error occurred while updating user details', 'statusCode': 500 });
                    }
                    else {
                        return res.json({ 'status': 'success', 'data': user_details, 'message': 'User details updated successfully', 'statusCode': 200 });
                    }
                });
            }
        })
    }
}
module.exports = UserController;