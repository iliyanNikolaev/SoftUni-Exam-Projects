const { hasUser } = require('../middlewares/guards');
const { createCourse, getAllCourses, getCourseById, deleteCourseById, editCourseById, signUpForCourse } = require('../services/courseService');
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
    
        res.render('edit', {
            course
        });
    } catch (err) {
        const errors = errorParser(err);
        res.render('404', {
            errors
        });   
    }
});

courseController.post('/edit/:id', hasUser, async (req, res) => {
    try {
        createAndEditDto(req);

        const course = await getCourseById(req.params.id);

        if(course.owner._id != req.user._id) {
            return res.redirect('/');
        }

        const data = {
            title: req.body.title,
            type: req.body.type,
            certificate: req.body.certificate,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            owner: req.user._id
        }

        await editCourseById(req.params.id, data);

        res.redirect('/courses/details/'+req.params.id);
    } catch (err) {
        const errors = errorParser(err);
        const course = {
            title: req.body.title,
            type: req.body.type,
            certificate: req.body.certificate,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            owner: req.user._id
        };
        res.render('edit', {
            errors,
            course
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
        createAndEditDto(req);

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

        res.redirect('/courses/catalog');
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

courseController.get('/signup/:id', hasUser, async (req, res) => {
    try {
        const course = await getCourseById(req.params.id);

        if(course.owner._id == req.user._id) {
            return res.redirect('/');
        }
    
        await signUpForCourse(req.params.id, req.user._id);
        
        res.redirect('/courses/details/'+req.params.id);
    } catch (err) {
        const errors = errorParser(err);
        res.render('404', {
            errors
        });  
    }
});

module.exports = courseController;

function createAndEditDto(req) {
    if(req.body.title == '' 
    || req.body.type == '' 
    || req.body.certificate == ''
    || req.body.image == ''
    || req.body.description == ''
    || isNaN(Number(req.body.price))) {
        throw new Error('invalid data');
    }
    if(req.body.title.length < 5) {
        throw new Error('The Title should be at least 5 characters');
    }
    const imageRegex = /^(http:\/\/|https:\/\/)/;
    if(!imageRegex.test(req.body.image)) {
        throw new Error('The Course Image should start with http:// or https://');
    }
    if(req.body.description.length < 10){
        throw new Error('The Description should be a minimum of 10 characters long');
    }
    if(req.body.type.length < 3){
        throw new Error('The Type should be a minimum of 3 characters long');
    }
    if(req.body.certificate.length < 2){
        throw new Error('The Certificate should be a minimum of 2 characters long');
    }
    if(Number(req.body.price) <= 0) {
        throw new Error('The Price should be a positive number');
    }
}

/**
You should make the following validations while creating or editing a course post:
•	The Title should be at least 5 characters
•	The Course Image should start with http:// or https://
•	The Description should be a minimum of 10 characters long
•	The Type should be a minimum of 3 characters long
•	The Certificate should be a minimum of 2 characters long
•	The Price should be a positive number
 */