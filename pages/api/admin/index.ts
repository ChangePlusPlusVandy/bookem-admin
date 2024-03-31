import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/lib/dbConnect';

import { getSession } from 'next-auth/react';
import Admins from 'bookem-shared/src/models/Admins';
import { QueriedAdminData, AdminData } from 'bookem-shared/src/types/database';
import { hash } from 'bcrypt';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await getServerSession(req, res, authOptions);
  switch (req.method) {
    case 'GET':
      // Connect to the database
      await dbConnect();

      try {
        const allUsers = (await Admins.find()) as QueriedAdminData[];
        res.status(200).json(allUsers);
      } catch (e) {
        console.error('An error has occurred in index.ts', e);
        res.status(500).json({
          error: 'Sorry, an error occurred while connecting to the database',
        });
      }
      break;

    case 'POST':
      try {
        if (session.user.status !== 'superadmin') {
          res.status(401).json({
            message: 'Sorry, only super admin is allowed to create new admins',
          });
          throw new Error('Only super admin is allowed to create new admins');
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
        console.error('Here is the error: ', e);
        res.status(500).json({ message: 'An error occurred', error: e });
      }
      break;
    default:
      res.status(405).json({
        error: 'Sorry, only GET requests are supported',
      });
      break;
  }
}
