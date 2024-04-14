import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/lib/dbConnect';

import VolunteerLogs from 'bookem-shared/src/models/VolunteerLogs';
import { QueriedVolunteerLogData } from 'bookem-shared/src/types/database';
import { VolunteerLogData } from 'bookem-shared/src/types/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case 'GET':
      try {
        // Connect to the database
        await dbConnect();
        const logs = await VolunteerLogs.find();
        res.status(200).json(logs);
      } catch (e) {
        console.error('An error has occurred in index.ts', e);
        res.status(500).json({
          error: 'Sorry, an error occurred while connecting to the database',
        });
      }
      break;

    default:
      res.status(405).json({
        error: 'Sorry, only GET and POST requests are supported',
      });
      break;
  }
}
