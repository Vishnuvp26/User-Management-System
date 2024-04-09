const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const loadLogin = async (req, res) => {
    try {
        res.render("login");
    } catch (err) {
        res.send(err.message);
    }
};

const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
            
        const userData = await User.findOne({ email: email });
        if (userData) {
            if (userData.is_admin === 1) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (passwordMatch) {
                req.session.admin_id = userData._id;
                res.redirect("/admin/home");
            } else {
                res.render("login", { message: "Wrong Password" });
            }
            } else {
            res.render("login", { message: "No user found" });
            }
        } else {
            res.render("login", { message: "No user found" });
        }
    } catch (error) {
        res.send(error.message);
    }
};

const loadDashboard = async (req, res) => {
    try {
        const userData = await User.findById({ _id: req.session.admin_id });
        res.render("home", { admin: userData });
    } catch (err) {
        res.send(err.message);
    }
};

const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect("/admin");
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = {
    loadLogin,
    verifyLogin,
    loadDashboard,
    logout
};