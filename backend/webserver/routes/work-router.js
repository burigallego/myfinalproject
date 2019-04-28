'use strict';

const express = require('express');
const multer = require('multer');

const sendFile = require('../controllers/work/send-work');
const getCourseWorks = require('../controllers/work/get-course-works');
const checkJwtToken = require('../controllers/session/check-jwt-token');



const router = express.Router();
const upload = multer();

router.post('/work', checkJwtToken, upload.single('file'), sendFile);
router.get('/work', checkJwtToken, getCourseWorks);

module.exports = router;