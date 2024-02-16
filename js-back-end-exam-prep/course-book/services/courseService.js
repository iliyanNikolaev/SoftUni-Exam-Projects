const Course = require('../models/Course');

async function getAllCourses() {
    const courses = await Course.find({}).lean();
    return courses;
}

async function getCourseById(id) {
    const course = await Course.findById(id).populate('owner').populate('signUpList').lean();
    return course;
}

async function createCourse(courseData) {
    const { title, type, certificate, image, description, price, owner} = courseData;

    const created = await Course.create({
        title,
        type,
        certificate,
        image,
        description,
        price: Number(price),
        owner
    });

    return created;
}

async function deleteCourseById(id) {
    await Course.findByIdAndDelete(id);
}

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    deleteCourseById
}