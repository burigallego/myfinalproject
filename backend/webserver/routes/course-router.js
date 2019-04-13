'use strict';

const express = require('express');
const checkJwtToken = require('../controllers/session/check-jwt-token');
const createCourse = require('../controllers/course/create-course');
const getCourses = require('../controllers/course/get-courses');
const getUserCourses = require('../controllers/course/get-user-courses');

const router = express.Router();

router.post('/course', checkJwtToken, createCourse);
router.get('/course', checkJwtToken, getCourses);
router.get('/course/user', checkJwtToken, getUserCourses);

module.exports = router;