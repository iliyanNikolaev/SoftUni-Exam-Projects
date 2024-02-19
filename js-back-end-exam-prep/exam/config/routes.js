const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const stoneController = require("../controllers/stoneController");

function configureRoutes(app) {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/stones', stoneController);
    app.all('*', (req, res) => {
        res.render('404', {
            title: '404 Page',
            errors: ['This page not exist']
        })
    });
}

module.exports = configureRoutes;