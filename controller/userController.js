const User = require('../models/userModel');

const loadRegister = async (req, res) => {
    try {
        res.render('registration.ejs')
    } catch (err) {
        console.log(err.messege)
    }
};

const insertUser = async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            image: req.file.filename,
            password: req.body.pswd,
            is_admin:0
        });
        
        const userData = await user.save();
        if (userData) {
            res.render('registration',{message: 'Your registration has been successfull'})
        } else {
            res.render('registration',{message: 'Your registration has been failed'})
        }
 
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    loadRegister,
    insertUser
} 