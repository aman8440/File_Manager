// routes/folders.js
const express = require('express');
const { createFolder, getFolderById, getAllFoldersForUser, getSubfoldersOfParent, doesFolderExistForUser } = require('../controllers/fold');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

router.post('/folders', authenticateUser, createFolder);
router.get('/getfolders', authenticateUser, getFolderById);
router.get('/getallfolders', authenticateUser, getAllFoldersForUser);
router.get('/getsubfolders', authenticateUser, getSubfoldersOfParent);
router.get('/doesfolders', authenticateUser, doesFolderExistForUser);

module.exports = router;
