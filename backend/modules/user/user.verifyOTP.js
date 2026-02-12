const redisClient = require('../../Redis_config/Redis_setup');

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        // Retrieve the OTP from Redis
        const storedOTP = await redisClient.get(email);

        if (!storedOTP) {
            return res.status(410).json({ message: 'OTP has expired or does not exist' });
        }
        // Compare the provided OTP with the stored OTP
        if (storedOTP !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        // Proceed for valid OTP
        res.status(200).json({ message: 'OTP verified successfully' });

        // Optionally, you can delete the OTP from Redis after successful verification
        await redisClient.del(email);
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
    }   
};