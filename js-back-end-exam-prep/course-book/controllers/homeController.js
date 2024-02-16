const { getAllCourses } = require('../services/courseService');
const { errorParser } = require('../utils/errorParser');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    try {
        let courses = await getAllCourses();

        res.render('home', {
            courses
        });   
    } catch (err) {
        const errors = errorParser(err);
        res.render('home', {
            errors
        });
    }
});

module.exports = homeController;