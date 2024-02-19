const express = require('express');
const configureExpress = require('./config/express');
const configureRoutes = require('./config/routes');
const connectToDB = require('./config/database');

start();

async function start() {
    const app = express();
    await connectToDB();
    configureExpress(app);
    configureRoutes(app);
    app.listen(3000, () => console.log('app is started on url http://localhost:3000'));
}