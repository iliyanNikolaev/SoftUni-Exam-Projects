function hasUser(req, res, next) {
    if(!req.user){
        return res.redirect('/auth/login');
    }
    next();
}
function isGuest(req, res, next) {
    if(req.user){
        return res.redirect('/');
    }
    next();
}

module.exports = {
    hasUser,
    isGuest
}