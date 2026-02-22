const nodemailer = require('nodemailer');
require('dotenv').config();// Load environment variables from .env file

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD // Use an app password for Gmail if 2FA is enabled
    }
});

const SendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: `"NexaSoft System" <${transporter.options.auth.user}>`,
        to: email,
        subject: "Your Login OTP",
        text: `Your OTP is:  <b>${otp}</b> . It will expire in 1 min .`,
        html: `Your OTP is:  <b>${otp}</b><p>It will expire in 1 min .</p>`
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { SendOTPEmail };


