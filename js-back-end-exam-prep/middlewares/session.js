const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const userData = verifyToken(token);
            console.log('logged user => ' + userData.username)
            req.user = userData;
        } catch (err) {
            res.clearCookie('token');
            return res.redirect('/auth/login');
        }
    }
    next();
}
