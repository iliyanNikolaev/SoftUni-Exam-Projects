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
    await Course.create({ ...courseData, price: Number(courseData.price) });
}

async function editCourseById(id, courseData) {
    await Course.findByIdAndUpdate(id, { ...courseData, price: Number(courseData.price) });
}

async function deleteCourseById(id) {
    await Course.findByIdAndDelete(id);
}

async function getLast3Courses() {
    const courses = await Course.find().sort({ createdAt: -1 }).limit(3).lean();
    return courses;
}

async function signUpForCourse(courseId, userId) {
    await Course.updateOne({
        _id: courseId
    },
    {
        $push: { signUpList: userId }
    });
}

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    editCourseById,
    deleteCourseById,
    getLast3Courses,
    signUpForCourse
}