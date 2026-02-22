const bcrypt = require('bcrypt');
const pool = require('../../config/db');
const {generateOTP}= require('../../modules/user/OTP/OTP.script');
const {SendOTPEmail} = require('../../NodeMailer/Nodemail_connection');
const redisClient = require('../../Redis_config/Redis_setup');

// Sign-up endpoint to handle user registration
exports.signUp = async (req, res) => {
    try {
        const { first_name, last_name, role, email, password } = req.body;
        // Check if the user already exists
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert the new user into the database
        const newUser = await pool.query(
            'INSERT INTO users (first_name, last_name, role, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [first_name, last_name, role, email, hashedPassword]
        );
        res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// login endpoint to handle user login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the user exists
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', user: user.rows[0] });

        // Create the OTP and store it in the RedisClient with an expiration time of 1 mins
        const otp = generateOTP();
        console.log("<< OTP >>:", otp); // Log the generated OTP for debugging
        await redisClient.set(email, otp, 'EX', 60); // Store OTP with a 60-second expiration
        // Send the OTP to the user's email
        await SendOTPEmail(email, otp);

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};