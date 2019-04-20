'use strict';

const express = require('express');
const checkJwtToken = require('../controllers/session/check-jwt-token');
const createCourse = require('../controllers/course/create-course');
const getCourses = require('../controllers/course/get-courses');
const getUserCourses = require('../controllers/course/get-user-courses');
const subscribeCourse = require('../controllers/course/subscribe-course');
const searchCourses = require('../controllers/course/search-courses');
const unsubscribeCourse = require('../controllers/course/unsubscribe-course')

const router = express.Router();

router.post('/course', checkJwtToken, createCourse);
router.get('/course', checkJwtToken, getCourses);
router.get('/course/user', checkJwtToken, getUserCourses);
router.get('/course/subscription', checkJwtToken, subscribeCourse);
router.get('/course/search', checkJwtToken, searchCourses);
router.delete('/course/subscription', checkJwtToken, unsubscribeCourse)

module.exports = router;