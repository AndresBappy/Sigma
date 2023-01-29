import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { HttpStatusCode } from 'constants/apiResponses';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const file = req.query.file?.toString() || '';
  const filename = uuidv4() + '-' + new Date().getTime() + '.' + file.substring(file.lastIndexOf('.') + 1, file.length);
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || '',
      secretAccessKey: process.env.AWS_SECRET_KEY || '',
    },
  });

  const post = await createPresignedPost(s3Client, {
    Bucket: process.env.AWS_S3_BUCKET_NAME || '',
    Key: filename,
    Fields: {
      acl: 'public-read',
      'Content-Type': req.query.fileType?.toString() || '',
    },
    Expires: 600, // seconds
    Conditions: [
      ['content-length-range', 0, 1048576], // up to 1 MB
    ],
  });

  res.status(HttpStatusCode.OK).json(post);
}
