const pool = require('../config/db-config');

const createFolder = async (req, res) => {
  const { folderName, parentFolderId } = req.body;
  const userId = req.user.id;
  try {

    if (!folderName || typeof folderName !== 'string') {
      return res.status(400).json({ error: 'Invalid folder name' });
    }

    const folderExistsQuery = 'SELECT * FROM folders WHERE name = $1 AND user_id = $2';
    const folderExistsResult = await pool.query(folderExistsQuery, [folderName, userId]);

    if (folderExistsResult.rows.length > 0) {
      return res.status(400).json({ error: 'Folder with the same name already exists for the user' });
    }
    const createFolderQuery = 'INSERT INTO folders (name, user_id, parent_folder_id) VALUES ($1, $2, $3) RETURNING *';
    const createdFolder = await pool.query(createFolderQuery, [folderName, userId, parentFolderId]);

    res.status(201).json({ folder: createdFolder.rows[0] });
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getFolderById = async (folderId) => {
  const getFolderQuery = 'SELECT * FROM folders WHERE id = $1';

  try {
    const folder = await pool.query(getFolderQuery, [folderId]);
    return folder.rows[0];
  } catch (error) {
    throw error;
  }
};

const getAllFoldersForUser = async (userId) => {
  const getAllFoldersQuery = 'SELECT * FROM folders WHERE user_id = $1';

  try {
    const folders = await pool.query(getAllFoldersQuery, [userId]);
    return folders.rows;
  } catch (error) {
    throw error;
  }
};

const getSubfoldersOfParent = async (parentFolderId) => {
  const getSubfoldersQuery = 'SELECT * FROM folders WHERE parent_folder_id = $1';

  try {
    const subfolders = await pool.query(getSubfoldersQuery, [parentFolderId]);
    return subfolders.rows;
  } catch (error) {
    throw error;
  }
};

const doesFolderExistForUser = async (name, userId) => {
  const checkFolderExistenceQuery = 'SELECT * FROM folders WHERE name = $1 AND user_id = $2';

  try {
    const existingFolder = await pool.query(checkFolderExistenceQuery, [name, userId]);
    return existingFolder.rows.length > 0;
  } catch (error) {
    throw error;
  }
};

module.exports = { createFolder, getFolderById, getAllFoldersForUser, getSubfoldersOfParent, doesFolderExistForUser };
   