import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/lib/dbConnect';

import VolunteerLogs from 'bookem-shared/src/models/VolunteerLogs';
import { QueriedVolunteerLogData } from 'bookem-shared/src/types/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { userid } = req.query;
  switch (req.method) {
    case 'GET':
      // Connect to the database
      await dbConnect();
      try {
        const user = (await VolunteerLogs.findOne({
          userId: userid,
        })) as QueriedVolunteerLogData;

        // if user does not exist, handle
        if (!user) res.status(400).json({ message: 'User not found' });

        res.status(200).json(user);
      } catch (e) {
        console.error('An error has occurred in index.ts', e);
        res.status(500).json({
          error: 'Sorry, an error occurred while connecting to the database',
        });
      }
      break;

    default:
      res.status(405).json({
        error: 'Sorry, only GET requests are supported',
      });
      break;
  }
}