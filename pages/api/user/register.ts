import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

import { HttpStatusCode } from 'constants/apiResponses';
import { Error } from 'interfaces/error';
import { RegisterForm } from 'interfaces/user/form';
import { connectToDatabase } from 'utils/database';
import { generateHash } from 'utils/password';

type Data = {
  success: boolean;
  userId?: ObjectId;
  email?: string;
  error?: Array<Error>;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { name, lastname, email, password, confirm } = req.body as RegisterForm;
    const errors: Array<Error> = [];

    if (!name) {
      errors.push({ field: 'name', message: 'Name is required' });
    }

    if (!lastname) {
      errors.push({ field: 'lastname', message: 'Lastname is required' });
    }

    if (!email) {
      errors.push({ field: 'email', message: 'Email is required' });
    }

    if (!password) {
      errors.push({ field: 'password', message: 'Password is required' });
    }

    if (password !== confirm) {
      errors.push({ field: 'password', message: 'Password and confirmation does not match' });
    }

    const db = await connectToDatabase();

    let result = await db.collection('user').findOne({ email: email });

    if (result?._id) {
      errors.push({ field: 'email', message: 'Email registered' });
    }

    if (errors.length) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, error: errors });
    }

    const currentDate = Date.now();
    const newUser = {
      _id: new ObjectId(),
      name,
      lastname,
      email,
      password: generateHash(password),
      createdAt: currentDate,
    };

    const response = await db.collection('user').insertOne(newUser);

    res.status(HttpStatusCode.OK).json({ success: true, userId: response?.insertedId, email });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end(`${req.method} Not Allowed`);
  }
}
