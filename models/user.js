// models/user.js
const pool = require('../config/db-config');

const createUser = async (username, email, password) => {
  const query = 'INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3) RETURNING *';
  const values = [name, username, email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { createUser };
