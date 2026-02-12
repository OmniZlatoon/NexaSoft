const express = require('express');
const userRoutes = require('./modules/user/user.routes');
const db = require('./config/db');
const redisClient= require('./Redis_config/Redis_setup');
require('dotenv').config();
const Port = process.env.PORT || 2000;
const app = express();

app.use(express.json());
app.use('/nexasoft/users', userRoutes);

// // Connect to the DB
// db.connect().then(() => {
//     console.log('Connected to the database');
// }).catch((err) => {
//     console.error('Database connection error:', err);
// });


// Connect to the Redis Client
app.post('/test-redis', async (req, res) => {
    // You can now use the client directly here
    await redisClient.set('status', 'running');
    const value = await redisClient.get('status');
    res.send(`Redis status: ${value}`);
});

app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`);
})