import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { HttpStatusCode } from 'constants/apiResponses';
import { User } from 'interfaces/user/profile';
import { connectToDatabase } from 'utils/database';

type Data = {
  success: boolean;
  user?: User;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
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
          error: 'Invalid user',
        });
      }

      const sum = await db
        .collection('transaction')
        .aggregate([
          { $match: { userId: result._id /*, status: 3 */ } },
          {
            $group: {
              _id: null,
              totalAmount: { $sum: '$value' },
            },
          },
        ])
        .toArray();

      const user: User = {
        _id: result?._id,
        name: result.name,
        lastname: result.lastname,
        email,
        handle: result.handle,
        phone: result.phone,
        country: result.country,
        biography: result.biography,
        avatar: result.avatar ? `${process.env.AWS_URL}/${result.avatar}` : undefined,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        balance: (sum.length && sum[0].totalAmount) || 0,
      };

      res.status(HttpStatusCode.OK).json({ success: true, user });
    } else {
      return res.status(400).json({
        success: false,
        error: 'Error in session',
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end(`${req.method} Not Allowed`);
  }
}
