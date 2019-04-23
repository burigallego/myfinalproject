'use strict';

const express = require('express');
const multer = require('multer');

const checkJwtToken = require('../controllers/session/check-jwt-token');
const createLinkResource = require('../controllers/resource/create-link-resource');
const createFileResource = require('../controllers/resource/create-file-resource');
const getCourseResources = require('../controllers/resource/get-course-resources');
const deleteLink = require('../controllers/resource/delete-link');
const deleteFile = require('../controllers/resource/delete-file');
const editResource = require('../controllers/resource/edit-resource');
const router = express.Router();
const upload = multer();



router.post('/resource/link', checkJwtToken, createLinkResource);
router.post('/resource/file', checkJwtToken, upload.single('file'), createFileResource);
router.get('/resource', checkJwtToken, getCourseResources);
router.delete('/resource/link', checkJwtToken, deleteLink);
router.delete('/resource/file', checkJwtToken, deleteFile);
router.put('/resource', checkJwtToken, editResource);
module.exports = router;