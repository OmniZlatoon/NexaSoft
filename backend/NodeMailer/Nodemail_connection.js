const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "obaseviv@gmail.com",
        pass: " tfaj agox mwrh ejuv" // Use an app password for Gmail if 2FA is enabled
    }
});

const SendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: `"NexaSoft System" <${transporter.options.auth.user}>`,
        to: email,
        subject: "Your Login OTP",
        text: `Your OTP is ${otp}: . It will expire in 1 min seconds.`,
        html: `<b>Your OTP is ${otp}: </b><p>It will expire in 1 min seconds.</p>`
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { SendOTPEmail };


