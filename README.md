# Node.js File Manager

Node.js File Manager is a comprehensive file management application built using Node.js, PostgreSQL, and AWS S3 bucket. It allows users to efficiently manage files and folders with features such as user registration, folder creation, file uploads to S3, and various file management operations.

## Features

- User registration and authentication
- Create folders and subfolders
- Upload files securely to AWS S3 bucket
- Manage files: rename, move, and delete
- PostgreSQL for storing user information and folder/file metadata

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)
- An [AWS account](https://aws.amazon.com/) with an S3 bucket

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aman8440/File_Manager.git
   
Install dependencies:

bash
Copy code
npm install
Configure environment variables:

Create a .env file in the project root and add the following:

env
Copy code
PORT=3000
DB_CONNECTION_STRING=your-postgres-connection-string
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=your-aws-region
S3_BUCKET_NAME=your-s3-bucket-name
Set up the PostgreSQL database:

Execute the SQL script located in db/init.sql to create the necessary tables.

Run the application:

bash
Copy code
npm start
Access the application:

Visit http://localhost:4000 in your browser.

API Endpoints
User Management
POST /api/register - Register a new user.
POST /api/login - Log in with existing credentials.
Folder Management
POST /api/folders - Create a new folder.
POST /api/folders/:folderId/subfolders - Create a subfolder inside an existing folder.
File Management
POST /api/files - Upload a file to a folder.
PUT /api/files/:fileId - Rename a file.
PUT /api/files/:fileId/move - Move a file to a different folder.
DELETE /api/files/:fileId - Delete a file.
Additional Notes
Ensure proper error handling and validation for all API endpoints.
Implement user authentication and authorization.
Structure the codebase into separate modules following best practices.
Bonus Features (Optional)
Implement user roles and permissions.
Provide API endpoints to share files or folders.
Add a search feature for files and folders.
Implement pagination and sorting for large collections.
Contributing
Feel free to contribute to the development of this project. Fork the repository and submit pull requests for improvements.

License
This project is licensed under the MIT License - see the LICENSE file for details.
