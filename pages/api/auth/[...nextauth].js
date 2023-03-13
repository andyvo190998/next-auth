import NextAuth from 'next-auth/next';
import { connectDb } from '../../../helpers/db';
import { isValid } from '../../../helpers/hashedPassword';
import User1 from '../../../helpers/User1';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectDb();
        const user = await User1.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('User not found');
        }

        const checkPassword = await isValid(
          credentials.password,
          user.password
        );
        if (!checkPassword) {
          throw new Error('Incorrect  password');
        }

        return { email: user.email };
      },
    }),
  ],
});
