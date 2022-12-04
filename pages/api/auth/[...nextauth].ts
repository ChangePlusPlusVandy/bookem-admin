// NextAuth documentation: https://next-auth.js.org/getting-started/example
import dbConnect from 'lib/dbConnect';
import Users from 'models/Users';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from 'lib/mongodb';
import bcrypt from 'bcrypt';
import { SessionStrategy } from 'next-auth/core/types';

const sessionStrategy: SessionStrategy = 'jwt';

export const authOptions = {
  // configure adaptor to mongoDB database using mongoose
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: sessionStrategy,
  },
  providers: [
    // Credentials docs: https://next-auth.js.org/providers/credentials
    CredentialsProvider({
      id: 'credentials',
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'test_user@bookem.org',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // if credentials do not exist, return null
        if (!credentials) return null;

        // get user email and password from credentials
        const { email, password } = credentials;

        // connect to database
        await dbConnect();

        // check if user's email exists in database
        const user = await Users.findOne({ email });

        // if user does not exist, return null
        if (!user) return null;

        // compare password hash with database hash
        const checkPassword = await bcrypt.compare(password, user.password);

        // if password is incorrect, return null
        if (!checkPassword) return null;

        // success. return user
        return user;
      },
    }),
    // Google docs: https://next-auth.js.org/providers/google
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  // callbacks: {
  //   async session(session: { user: UserData; token: any }, token: any) {
  //     //session.accessToken = token.accessToken;
  //     console.log('Session token');
  //     console.log(token);
  //     if (userAccount !== null) {
  //       session.user = userAccount;
  //     } else if (typeof token !== typeof undefined) {
  //       session.token = token;
  //     }
  //     console.log('session callback returning');
  //     console.log(session);
  //     return session;
  //   },
  //   async jwt(
  //     token: { user: any },
  //     user: any,
  //     account: any,
  //     profile: any,
  //     isNewUser: any
  //   ) {
  //     console.log('JWT Token User');
  //     console.log(token.user);
  //     if (typeof user !== typeof undefined) {
  //       token.user = user;
  //     }
  //     return token;
  //   },
  // },
};

export default NextAuth(authOptions);
