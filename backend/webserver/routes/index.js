'use strict';

const accountRouter = require('./account-router');
const userRouter = require('./user-router');
const courseRouter = require('./course-router');
const resourceRouter = require('./resource-router');
const workRouter = require('./work-router');

module.exports = {
    accountRouter,
    userRouter,
    courseRouter,
    resourceRouter,
    workRouter
};
