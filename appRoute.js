const express = require('express');
const webPush = require('./push');
const appRouter = express();

appRouter.use(require('body-parser').json());

webPush(appRouter, '/');

appRouter.use(express.static(__dirname + '/public'));

//default route
appRouter.use(function (req, res) {
    res.render(__dirname + '/public/index.html');
});

module.exports = appRouter;