const s3 = require('../config/aws-config');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
require('dotenv').config();

const uploadToS3 = async (file, folderId) => {
  try {
    const fileKey = `${folderId}/${uuidv4()}-${file.name}`;

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      Body: file.data,
      ContentType: file.mimetype,
      ACL: 'public-read', 
    };

    const result = await s3.upload(params).promise();

    return {
      key: fileKey,
      url: result.Location
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { uploadToS3 };
