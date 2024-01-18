const { uploadToS3 } = require('../utils/s3');
const pool = require('../config/db-config');

const uploadFile = async (req, res) => {
  const { file, folderId } = req.body;
  const userId = req.user.id; 

  try {
    if (!file || !folderId) {
      return res.status(400).json({ error: 'Invalid file or folder ID' });
    }
    const s3UploadResult = await uploadToS3(file, folderId);

    const insertFileQuery = 'INSERT INTO files (name, size, folder_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const insertedFile = await pool.query(insertFileQuery, [file.name, file.size, folderId, userId]);

    res.status(201).json({ file: insertedFile.rows[0] });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getFileById = async (req, res) => {
  const fileId = req.params.fileId;

  try {
    const getFileQuery = 'SELECT * FROM files WHERE id = $1';
    const file = await pool.query(getFileQuery, [fileId]);
    if (file.rows.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.status(200).json({ file: file.rows[0] });
  } catch (error) {
    console.error('Error getting file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllFilesInFolder = async (req, res) => {
  const folderId = req.params.folderId;

  try {
    const getAllFilesQuery = 'SELECT * FROM files WHERE folder_id = $1';
    const files = await pool.query(getAllFilesQuery, [folderId]);

    res.status(200).json({ files: files.rows });
  } catch (error) {
    console.error('Error getting files in folder:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { uploadFile, getFileById, getAllFilesInFolder };
