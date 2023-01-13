import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

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

        if (email === 'test@example.com' && password === '1234q') {
          const user = { id: '1', name: 'User Test', email: 'test@example.com' };

          return user;
        } else {
          throw new Error('Invalid username or password');
        }
      },
    }),
  ],
};
export default NextAuth(authOptions);
