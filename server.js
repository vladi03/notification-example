const http = require('http');
const appRouter = require('./appRoute');

const port = 8088;//process.env.port || 1337;

//Create a server
const server = http.createServer(appRouter);

//Lets start our server
server.listen(port, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", port);
});