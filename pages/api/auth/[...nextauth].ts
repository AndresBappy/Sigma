import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { connectToDatabase } from 'utils/database';
import { validPassword } from 'utils/password';

type ExtendedUser = User & { lastname?: string; id?: string };

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const email = credentials?.email || '';
        const password = credentials?.password || '';

        if (!email || !password) {
          throw new Error('Please enter email and password');
        }

        const db = await connectToDatabase();

        const result = await db.collection('user').findOne({ email });

        if (!result) {
          throw new Error('Invalid credentials');
        }

        const valid = validPassword(password, result?.password);

        if (result && valid) {
          const user: ExtendedUser = {
            id: result._id.toString(),
            name: result.name,
            lastname: result.lastname,
            email,
          };

          return user;
        } else {
          throw new Error('Invalid username or password');
        }
      },
    }),
  ],
};
export default NextAuth(authOptions);
