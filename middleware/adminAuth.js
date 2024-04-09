const isLogin = async (req, res, next) => {
    try {
        if (req.session.admin_id) {
            next();
        } else {
            return res.redirect('/admin');
        }
    } catch (err) {
        res.render(err.message);
    }
};

const isLogout = async (req, res, next) => {
    try {
        if (req.session.admin_id) {
            return res.redirect("/admin/home");
        }
        next();
    } catch (err) {
        res.send(err.message);
    }
}; 

module.exports = {
    isLogin,
    isLogout,
};