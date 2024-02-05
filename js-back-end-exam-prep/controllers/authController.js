const { isGuest } = require('../middlewares/guards');
const { register, login } = require('../services/userService');
const { errorParser } = require('../utils/errorParser');

const authController = require('express').Router();

authController.get('/register', isGuest, (req, res) => {
    res.render('register');
});
authController.post('/register', async (req, res) => {
    try {
        registerDto(req);
        const token = await register(req.body.username, req.body.password);
        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        const errors = errorParser(err);
        res.render('register', {
            errors,
            username: req.body.username
        });
    }
});
authController.get('/login', isGuest, (req, res) => {
    res.render('login');
});
authController.post('/login', async (req, res) => {
    try {
        loginDto(req);
        const token = await login(req.body.username, req.body.password);
        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        const errors = errorParser(err);
        res.render('login', {
            errors,
            username: req.body.username
        });
    }
});
authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;

function registerDto(req) {
    if(req.body.username == '' || req.body.password == '') {
        throw new Error('all fields are required');
    }
    if(req.body.password != req.body.repeat) {
        throw new Error('passwords dont match');
    }
}
function loginDto(req) {
    if(req.body.username == '' || req.body.password == '') {
        throw new Error('all fields are required');
    }
}