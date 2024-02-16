const authController = require("../controllers/authController");
const courseController = require("../controllers/courseController");
const homeController = require("../controllers/homeController");

function configureRoutes(app) {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/courses', courseController);
    app.all('*', (req, res) => {
        res.render('404');
    });
}

module.exports = configureRoutes;