'use strict';

const express = require('express');
const createAccount = require('../controllers/account/create-account');
const login = require('../controllers/account/login');
const activateAccount = require('../controllers/account/activate-account');



const accountRouter = express.Router();

accountRouter.post('/account', createAccount);
accountRouter.post('/account/login', login);
accountRouter.get('/account/activate', activateAccount);


module.exports = accountRouter;
