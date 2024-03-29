import dbConnect from '@/lib/dbConnect';
import { hash } from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import Admins from 'bookem-shared/src/models/Admins';
import { QueriedAdminData, AdminData } from 'bookem-shared/src/types/database';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case 'POST':
      try {
        //Get current session of the user an check if the user is superadmin
        const session = await getServerSession(req, res, authOptions);

        if (session.user.status !== 'superadmin') {
          res.status(401).json({ message: 'Not authorized' });
          throw new Error('Not authorized');
        }

        // start a try catch block to catch any errors in parsing the request body
        const admin = req.body as QueriedAdminData;

        // Get the user's email and password from the request body
        const { firstName, lastName, email, password } = admin;

        // Check if the user's email and password are valid
        if (!email || !email.includes('@') || !password) {
          res.status(422).json({ message: 'Invalid email or password' });
          throw new Error('Invalid email or password');
        }

        // Connect to the database
        await dbConnect();

        // Check if the user already exists in database
        const checkExisting = (await Admins.findOne({
          email,
        })) as QueriedAdminData;

        // If the user already exists, return an error
        if (checkExisting) {
          res.status(422).json({ message: 'Admin email already exists' });
          throw new Error('Admin email already exists');
        }

        // Hash the user's password
        const hashedPassword = await hash(password, 12);

        // construct the user object to insert into the database
        let adminToInsert: AdminData = {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          phone: admin.phone,
          status: admin.status,
        };

        // Create a new user in the database
        const status = await Admins.insertMany(adminToInsert);

        // Return the status of the user creation
        res.status(201).json({ message: 'Admin created', ...status });
      } catch (e) {
        console.log('Here is the error: ', e);
        res.status(500).json({ message: 'An error occurred', error: e });
      }
      break;
    default:
      res.status(400).json({ message: 'Invalid request method' });
      break;
  }
}
