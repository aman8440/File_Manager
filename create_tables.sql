CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  username CHAR(20) UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

SELECT * FROM users WHERE username = $1 OR email = $2;

-- Query to insert a new user into the users table
INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *;

-- Query to get a user by username
SELECT * FROM users WHERE username = $1;

CREATE TABLE folders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  parent_folder_id INT,
  user_id INT NOT NULL,
  FOREIGN KEY (parent_folder_id) REFERENCES folders(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO folders (name, user_id, parent_folder_id) VALUES ('SampleFolder', 1, NULL);

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  size INT NOT NULL,
  folder_id INT NOT NULL,
  user_id INT NOT NULL,
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (folder_id) REFERENCES folders(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);