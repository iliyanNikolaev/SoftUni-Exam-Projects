const homeController = require("../controllers/homeController");

function configureRoutes(app) {
    app.use('/', homeController)
}

module.exports = configureRoutes;