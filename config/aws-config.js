// config/aws-config.js
const AWS = require('aws-sdk');
require('dotenv').config();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucketName: process.env.S3_BUCKET_NAME,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

module.exports = s3;
