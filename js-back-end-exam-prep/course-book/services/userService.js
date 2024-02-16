const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jwtSecret = 'ab89abf0-198b-473d-9a8a-8bc05af58e0d';
const User = require('../models/User');

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
function createSession({ _id, username }) {
    const payload = {
        _id,
        username
    }
    const token = jsonwebtoken.sign(payload, jwtSecret);
    return token;
}

module.exports = {
    register,
    login,
    verifyToken
}