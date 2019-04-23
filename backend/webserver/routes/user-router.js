'use strict';

const express = require('express');
const multer = require('multer');


const getUserProfile = require('../controllers/user/get-user-profile');
const checkJwtToken = require('../controllers/session/check-jwt-token');
const updateUserProfile = require('../controllers/user/update-user-profile');
const uploadAvatar = require('../controllers/user/upload-avatar');
const getCourseUsers = require('../controllers/user/get-course-users');

const router = express.Router();
const upload = multer();

router.put('/user', checkJwtToken, updateUserProfile);
router.post('/user/avatar', checkJwtToken, upload.single('avatar'), uploadAvatar);
router.get('/user', checkJwtToken, getUserProfile);
router.get('/user/course', checkJwtToken, getCourseUsers)



module.exports = router;
