const express = require('express');
const userRoutes = require('./modules/user/user.routes');
const db = require('./config/db');
require('dotenv').config();
const Port = process.env.PORT || 2000;
const app = express();

app.use(express.json());
app.use('/nexasoft/users', userRoutes);

db.connect().then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.error('Database connection error:', err);
});


app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`);
})