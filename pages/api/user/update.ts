import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { HttpStatusCode } from 'constants/apiResponses';
import { Error } from 'interfaces/error';
import { ProfileForm } from 'interfaces/user/form';
import { connectToDatabase } from 'utils/database';

type Data = {
  success: boolean;
  userId?: ObjectId;
  email?: string;
  error?: Array<Error>;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { username, phone, country, biography } = req.body as ProfileForm;
    const errors: Array<Error> = [];
    const session = await getSession({ req });

    if (session) {
      const {
        user: { email },
      } = session;

      if (!username) {
        errors.push({ field: 'username', message: 'Username is required' });
      }

      if (!phone) {
        errors.push({ field: 'phone', message: 'Phone is required' });
      }

      if (!country) {
        errors.push({ field: 'country', message: 'Required' });
      }

      if (!biography) {
        errors.push({ field: 'biography', message: 'Required' });
      }

      if (errors.length) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, error: errors });
      }

      const db = await connectToDatabase();

      let result = await db.collection('user').findOne({ email: email });

      if (!result) {
        errors.push({ field: '', message: 'Invalid user.' });

        return res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          error: errors,
        });
      }

      result.handle = username;
      result.phone = phone;
      result.country = country;
      result.biography = biography;

      const currentDate = Date.now();
      result.updatedAt = currentDate;

      db.collection('user').updateOne({ email: email }, { $set: result }, function (err) {
        if (err) {
          return res.status(HttpStatusCode.BAD_REQUEST).json({
            error: [
              {
                message: JSON.stringify(err),
                field: '',
              },
            ],
            success: false,
          });
        }

        return res.status(HttpStatusCode.OK).json({
          email: email,
          success: true,
        });
      });
    } else {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
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
