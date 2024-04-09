const express = require('express');
const admin_route = express();

const session = require('express-session');
const config = require("../config/config");

admin_route.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
}));

admin_route.use(express.json());
admin_route.use(express.urlencoded({ extended: true }));

admin_route.set("view engine", "ejs");
admin_route.set("views", "./views/admin");

const adminController = require("../controller/adminController");

admin_route.get('/', adminController.loadLogin);

admin_route.post("/", adminController.verifyLogin);

admin_route.get('/home', adminController.loadDashboard);

admin_route.get('/logout', adminController.logout);

admin_route.get("*", (req, res) => {
    res.redirect("/admin");
});

module.exports = admin_route;