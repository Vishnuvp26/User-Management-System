const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user_management_system');

const express = require('express');
const app = express();

// for user route
const userRoute = require('./routes/userRoute')
app.use('/', userRoute);

const User = require('./models/userModel')

app.listen(3000,()=> {
    console.log('Server is running at http://localhost:3000');
});


