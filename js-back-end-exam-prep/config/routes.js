const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");

function configureRoutes(app) {
    app.use('/', homeController);
    app.use('/auth', authController);

}

module.exports = configureRoutes;