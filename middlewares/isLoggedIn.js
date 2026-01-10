const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return redirect('/admin/');
        }
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        req.role = tokenData.role;
        req.fullname = tokenData.fullname;
        res.locals.user = req; // Pass the user data to the view
        next();
    } catch (error) {
        return res.redirect('/admin/');
    }
};

module.exports = isLoggedIn;