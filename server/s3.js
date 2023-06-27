const aws = require('aws-sdk');
const crypto = require('crypto');
require('dotenv').config();

const region = 'us-east-1';
const bucketName = 'toyshare';
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
});

const generateUploadURL = async () => {
  const rawBytes = await crypto.randomBytes(16);
  const imageName = rawBytes.toString('hex');
  console.log(imageName);

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  });

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
};

module.exports = generateUploadURL;
