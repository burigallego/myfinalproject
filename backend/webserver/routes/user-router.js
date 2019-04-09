'use strict';

const express = require('express');


const checkJwtToken = require('../controllers/session/check-jwt-token');
const updateUserProfile = require('../controllers/user/update-user-profile');



const router = express.Router();

router.put('/user', checkJwtToken, updateUserProfile);


module.exports = router;
