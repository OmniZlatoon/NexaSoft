const redisClient = require('../../Redis_config/Redis_setup');
const {OTPverify} = require('../user/HASh-FOLD/verifyHashOTP');

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Retrieve the hashed OTP from Redis
        const storedHash = await redisClient.get(email);
        if (!storedHash) {

             // delete the OTP from Redis after expiration or invalidation
            await redisClient.del(email);
            return res.status(410).json({ message: 'OTP has expired or is invalid' });
           
        }
        // Verify the provided OTP against the stored hash
        const isOTPValid = await OTPverify(storedHash, otp);
        if (!isOTPValid) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
       
        // Delete the OTP from Redis after Verification
        await redisClient.del(email);
        res.status(200).json({ message: 'OTP verified successfully ✅  ' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};