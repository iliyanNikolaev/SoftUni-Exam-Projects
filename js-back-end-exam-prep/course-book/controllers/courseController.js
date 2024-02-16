const { hasUser } = require('../middlewares/guards');
const { createCourse, getAllCourses, getCourseById, deleteCourseById } = require('../services/courseService');
const { errorParser } = require('../utils/errorParser');

const courseController = require('express').Router();

courseController.get('/catalog', async (req, res) => {
    try {
        const courses = await getAllCourses();

        res.render('catalog', {
            courses
        });   
    } catch (err) {
        const errors = errorParser(err);
        res.render('404', {
            errors
        });   
    }
});

courseController.get('/details/:id', async (req, res) => {
    try {
        const course = await getCourseById(req.params.id);

        res.render('details', {
            course
        });
    } catch (err) {
        const errors = errorParser(err);
        res.render('404', {
            errors
        });   
    }
});

courseController.get('/edit/:id', hasUser, async (req, res) => {
    try {
        const course = await getCourseById(req.params.id);

        if(course.owner._id != req.user._id) {
            return res.redirect('/');
        }
    
        res.render('edit');
    } catch (err) {
        const errors = errorParser(err);
        res.render('404', {
            errors
        });   
    }
});

courseController.get('/delete/:id', hasUser, async (req, res) => {
    try {
        const course = await getCourseById(req.params.id);

        if(course.owner._id != req.user._id) {
            return res.redirect('/');
        }
        
        await deleteCourseById(req.params.id);
        
        res.redirect('/courses/catalog');   
    } catch (err) {
        const errors = errorParser(err);
        res.render('404', {
            errors
        });  
    }
});

courseController.get('/create', hasUser, (req, res) => {
    res.render('create');
});

courseController.post('/create', hasUser, async (req, res) => {
    try {
        createDto(req);

        const data = {
            title: req.body.title,
            type: req.body.type,
            certificate: req.body.certificate,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            owner: req.user._id
        }

        await createCourse(data);

        res.redirect('/');
    } catch (err) {
        const errors = errorParser(err);
        res.render('create', {
            errors,
            title: req.body.title,
            type: req.body.type,
            certificate: req.body.certificate,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price
        });        
    }
});

module.exports = courseController;

function createDto(req) {
    if(req.body.title == '' 
    || req.body.type == '' 
    || req.body.certificate == ''
    || req.body.image == ''
    || req.body.description == ''
    || isNaN(Number(req.body.price))) {
        throw new Error('invalid data');
    }
}