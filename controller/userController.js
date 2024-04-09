const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (err) {
        console.log(err.message);
    }
};

const loadRegister = async (req, res) => {
    try {
        res.render('registration');
    } catch (err) {
        console.log(err.messege);
    }
};

const insertUser = async (req, res) => {
    try {
        const sPassword = await securePassword(req.body.password);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            image: req.file.filename,
            password: sPassword,
            is_admin: 0
        });
        
        const userData = await user.save();
        if (userData) {
            res.render('registration', { message: 'Your registration has been successfull' });
        } else {
            res.render('registration', { message: 'Your registration has been failed' });
        }
 
    } catch (err) {
        console.log(err.message);
    }
};


//login user method
const loginLoad = async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        console.log(err.message);
    }
};

// const verifyLogin = async (req, res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;

//         const userData = await User.findOne({ email: email });
//         if (userData) {
//             const passwordMatch = await bcrypt.compare(password, userData.password);
//             if (passwordMatch) {
//                 if (userData.is_varified === 0) {
//                     res.render('login', {message: "Please verify your mail"})
//                 } else {
//                     req.session.user_id = userData._id;
//                     res.redirect('/home')
//                 }
//             } else {
//                 res.render('login', { message: "Email and Password is incorrect" });
//             }
//         } else {
//             res.render('login', { message: "Email and Password is incorrect" });
//         }
//     } catch (err) {
//         console.log(err.message);
//     }
// };

const verifyLogin = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      const userData = await User.findOne({ email: email });
  
      if (userData) {
        const passwordMatch = await bcrypt.compare(password, userData.password);
  
        if (passwordMatch) {
          req.session.user_id = userData._id;
          res.redirect("/home");
        } else {
          res.render("login", { message: "Wrong Password" });
        }
      } else {
        res.render("login", { message: "No user found" });
      }
    } catch (error) {
      res.send(error.message);
    }
  };
 
const loadHome = async (req, res) => {
    try {
        const userData = await User.findById({ _id: req.session.user_id });
        res.render('home', { user: userData });
        res.render('home');
    } catch (err) {
        console.log(err.message);
    }
};

const userLogout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/');
    } catch (err) {
        console.log(err.message);
    }
};


//user profile edit & update
const editProfile = async (req, res) => {
    try {
        const id = req.query.id;
        const userData = await User.findById(id);
        if (userData) {
            res.render('edit', { user: userData });
        } else {
            res.redirect('/home');
        }
    } catch (err) {
        console.log(err.message);
    }
};

const updateProfile = async (req, res) => {
    try {
        if (req.file) {
            await User.findByIdAndUpdate(req.body.user_id, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    image: req.file.filename
                }
            });
        } else {
            await User.findByIdAndUpdate(req.body.user_id, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile
                }
            });
        }
        res.redirect('/home');
    } catch (err) {
        console.log(err.message);
    }
};


module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout,
    editProfile,
    updateProfile
};

