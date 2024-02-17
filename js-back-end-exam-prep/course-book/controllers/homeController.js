const { getLast3Courses } = require('../services/courseService');
const { getProfileInfo } = require('../services/userService');
const { errorParser } = require('../utils/errorParser');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    try {
        const courses = await getLast3Courses();
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

homeController.get('/profile/:id', async (req, res) => {
    try {
        const { createdCourses, signedCourses } = await getProfileInfo(req.params.id);
        res.render('profile', {
            createdCourses,
            signedCourses
        });
    } catch (err) {
        const errors = errorParser(err);
        res.render('home', {
            errors
        });
    }
});

module.exports = homeController;