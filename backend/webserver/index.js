'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
let server = null;
app.use(bodyParser.json());



app.use((req, res, next) => {
    const accessControlAllowMethods = [
        'POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'];

    const accessControlAllowHeaders = [
        'Location', 'Authorization', 'Content-Type'];

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    // Access-Control-Allow-Methods: put accessControlAllowHeaders separated by comma
    res.header('Access-Control-Allow-Methods', accessControlAllowMethods.join(','));
    // put accessControlAllowHeaders separated by comma
    res.header('Access-Control-Allow-Headers', accessControlAllowHeaders.join(','));
    res.header('Access-Control-Expose-Headers', accessControlAllowHeaders.join(','));
    next();
});

app.use('/api', routes.accountRouter);
app.use('/api', routes.userRouter);
app.use('/api', routes.courseRouter);
app.use('/api', routes.resourceRouter);



app.use('*', (req, res, next) => {
    return res.status(404).send({
        message: 'Route not found',
    });
});

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).send(err);
    }

    if (err.name === 'AuthenticatedError') {
        return res.status(401).send();
    }

    console.error('Error 500', err);
    return res.status(500).send({
        message: err.message,
    });
});

async function listen(port) {
    if (server === null) {
        server = await app.listen(port);
    } else {
        console.error("Can't listen, server already initialized");
    }
}

/**
 * Stop listening requests
 */
async function close() {
    if (server) {
        await server.close();
        server = null;
    } else {
        console.error("Can't close a non started server");
    }
}

module.exports = {
    listen,
    close,
};

