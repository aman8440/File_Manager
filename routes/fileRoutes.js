// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const { uploadFile, getFileById, getAllFilesInFolder } = require('../controllers/fileController');
const { authenticateUser } = require('../middleware/auth');

// Upload File
router.post('/upload', authenticateUser, uploadFile);
router.post('/getupload', authenticateUser, getFileById);
router.post('/getallupload', authenticateUser, getAllFilesInFolder);

module.exports = router;
