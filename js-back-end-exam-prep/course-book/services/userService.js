const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jwtSecret = 'ab89abf0-198b-473d-9a8a-8bc05af58e0d';
const User = require('../models/User');
const Course = require('../models/Course');

async function register(username, email, password) {
    const existing = await User.findOne({ username });
    if (existing) {
        throw new Error('username is taken');
    }
    const hashedPass = await bcrypt.hash(password, 5);
    const user = await User.create({
        username,
        email,
        password: hashedPass
    });
    const token = createSession(user);
    return token;
}
async function login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('wrong email or pass');
    }
    const hasMatch = await bcrypt.compare(password, user.password);
    if (!hasMatch) {
        throw new Error('wrong email or pass');
    }
    const token = createSession(user);
    return token;
}
function verifyToken(token) {
    return jsonwebtoken.verify(token, jwtSecret);
}
function createSession({ _id, username, email }) {
    const payload = {
        _id,
        username,
        email
    }
    const token = jsonwebtoken.sign(payload, jwtSecret);
    return token;
}

async function getProfileInfo(userId) {
    const user = await User.findById(userId);
    if(!user){
        throw new Error('user not exist');
    }

    const courses = await Course.find({})
                        .populate('owner')
                        .populate('signUpList')
                        .lean();
    
    const createdCourses = courses.filter(x => x.owner._id == userId);
    const signedCourses = [];
    for (const course of courses) {
        const list = course.signUpList;

        for (const signer of list) {
            if(signer._id == userId){
                signedCourses.push(course);
            }
        }
    }

    return {
        createdCourses,
        signedCourses
    }
}

module.exports = {
    register,
    login,
    verifyToken,
    getProfileInfo
}