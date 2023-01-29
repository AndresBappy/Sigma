import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { HttpStatusCode } from 'constants/apiResponses';
import { Error } from 'interfaces/error';
import { connectToDatabase } from 'utils/database';

type Data = {
  success: boolean;
  userId?: ObjectId;
  email?: string;
  error?: Array<Error>;
};

type AvatarForm = {
  avatar: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { avatar } = req.body as AvatarForm;
    const errors: Array<Error> = [];
    const session = await getSession({ req });

    if (!avatar) {
      errors.push({ field: 'avatar', message: 'Avatar is required' });
    }

    if (errors.length) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, error: errors });
    }

    if (session) {
      const {
        user: { email },
      } = session;

      const db = await connectToDatabase();

      let result = await db.collection('user').findOne({ email: email });

      if (!result) {
        errors.push({ field: '', message: 'Invalid user.' });

        return res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          error: errors,
        });
      }

      result.avatar = avatar;

      const currentDate = Date.now();
      result.updatedAt = currentDate;

      db.collection('user').updateOne({ email: email }, { $set: result }, function (err) {
        if (err) {
          return res.status(400).json({
            error: [
              {
                message: JSON.stringify(err),
                field: '',
              },
            ],
            success: false,
          });
        }

        return res.status(200).json({
          email: email,
          success: true,
        });
      });
    } else {
      return res.status(400).json({
        error: [
          {
            message: 'Error in session',
            field: '',
          },
        ],
        success: false,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end(`${req.method} Not Allowed`);
  }
}
