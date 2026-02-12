const generateOTP = () => {
    const length= 6;
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluded similar looking chars like O, 0, I, 1
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
module.exports = { generateOTP };