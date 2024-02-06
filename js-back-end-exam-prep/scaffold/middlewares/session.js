const { verifyToken } = require("../services/userService");

function session() {
    return function (req, res, next) {
        const token = req.cookies.token;
        if (token) {
            try {
                const userData = verifyToken(token);
                res.locals.isAuthenticated = true;
                res.locals.userData = userData;
            } catch (err) {
                res.clearCookie('token');
                return res.redirect('/auth/login');
            }
        }
        next();
    }
}

module.exports = session;