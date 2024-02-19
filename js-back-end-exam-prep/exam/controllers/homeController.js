const { getLast3Stones } = require('../services/stoneService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    try {
        const stones = await getLast3Stones();
        res.render('home', {
            title: 'Home Page',
            stones
        });   
    } catch (err) {
        const errors = errorParser(err);
        res.render('404', {
            title: '404 Page',
            errors
        });
    }
});

module.exports = homeController;