import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next/types';

import { HttpStatusCode } from 'constants/apiResponses';
import { Transaction } from 'interfaces/transaction/data';
import { TransactionForm } from 'interfaces/transaction/form';
import { connectToDatabase } from 'utils/database';

type Data = {
  success: boolean;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { from, to, value, token, hash } = req.body as TransactionForm;

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

      const currentDate = Date.now();
      const transaction: Transaction = {
        _id: new ObjectId(),
        userId: result._id,
        from,
        to,
        value,
        token,
        hash,
        createdAt: currentDate,
      };

      const response = await db.collection('transaction').insertOne(transaction);

      if (!result.transactions) {
        result.transactions = [];
      }

      result.transactions.push(response.insertedId);

      // const updated =
      await db.collection('user').updateOne({ email: email }, { $set: result });

      res.status(HttpStatusCode.OK).json({ success: true });
    } else {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        error: 'Error in session',
        success: false,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end(`${req.method} Not Allowed`);
  }
}
