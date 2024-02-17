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
        const token = await register(req.body.username, req.body.email, req.body.password);
        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        const errors = errorParser(err);
        res.render('register', {
            errors,
            username: req.body.username,
            email: req.body.email
        });
    }
});
authController.get('/login', isGuest, (req, res) => {
    res.render('login');
});
authController.post('/login', async (req, res) => {
    try {
        loginDto(req);
        const token = await login(req.body.email, req.body.password);
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
    if(req.body.username == '' || req.body.email == '' || req.body.password == '') {
        throw new Error('all fields are required');
    }
    if(req.body.username.length < 2) {
        throw new Error('The username should be at least 2 characters long');
    }
    if(req.body.email.length < 10) {
        throw new Error('The email should be at least 10 characters long');
    }
    if(req.body.password.length < 4) {
        throw new Error('The password should be at least 4 characters long');
    }
    if(req.body.password != req.body.repeat) {
        throw new Error('passwords dont match');
    }
}
function loginDto(req) {
    if(req.body.email == '' || req.body.password == '') {
        throw new Error('all fields are required');
    }
}