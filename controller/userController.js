const user = require('../models/userModel');

const loadRegister = async (req, res) => {
    try {
        res.render('registration.ejs')
    } catch (err) {
        console.log(err.messege)
    }
};

const insertUser = async (req, res) => {
    try {
        const user = new user({
            name: req.body.txt,
            email: req.body.email,
            mobile: req.body.mobile,
            image:req.file.filename,
            password: req.body.pswd,
            is_admin:0,
        });
        
        const userData = await user.save();
        if (userData) {
            res.render('registration',{messege: 'Your registration has been successfull'})
        } else {
            res.render('registration',{messege: 'Your registration has been failed'})
        }

    } catch (err) {
        console.log(err.messege);
    }
}

module.exports = {
    loadRegister
} 