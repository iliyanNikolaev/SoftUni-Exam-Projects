const express = require('express');
const handlebars = require('express-handlebars');

function configureExpress(app){
    const hbs = handlebars.create({
        extname: '.hbs'
    });
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: false }));
}

module.exports = configureExpress;