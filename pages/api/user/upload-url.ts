import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';

import { HttpStatusCode } from 'constants/apiResponses';
import { connectToDatabase } from 'utils/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const session = await getSession({ req });

    if (session) {
      const {
        user: { email },
      } = session;

      const db = await connectToDatabase();

      let result = await db.collection('user').findOne({ email: email });

      if (!result) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Invalid user.',
        });
      }

      const file = req.query.file?.toString() || '';
      const filename =
        uuidv4() + '-' + new Date().getTime() + '.' + file.substring(file.lastIndexOf('.') + 1, file.length);
      const s3Client = new S3Client({
        region: process.env.AWS_S3_REGION,
        credentials: {
          accessKeyId: process.env.AWS_S3_ACCESS_KEY || '',
          secretAccessKey: process.env.AWS_S3_SECRET_KEY || '',
        },
      });

      if (result.avatar) {
        const data = await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME || '',
            Key: result.avatar,
          })
        );

        console.log(data);
      }

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
    } else {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        error: 'Error in session',
        success: false,
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end(`${req.method} Not Allowed`);
  }
}
