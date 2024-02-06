const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('../middlewares/session');
const bodyTrim = require('../middlewares/bodyTrim');

function configureExpress(app){
    const hbs = handlebars.create({
        extname: '.hbs'
    });
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session());
    app.use(bodyTrim());
}

module.exports = configureExpress;