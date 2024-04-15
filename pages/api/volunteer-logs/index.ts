import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/lib/dbConnect';

import VolunteerLogs from 'bookem-shared/src/models/VolunteerLogs';
import { QueriedVolunteerLogDTO } from 'bookem-shared/src/types/database';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';
import Users from 'bookem-shared/src/models/Users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case 'GET':
      try {
        // Connect to the database
        await dbConnect();

        // TODO: remove this after development

        const logs = (await VolunteerLogs.find()
          .populate({ path: 'user' })
          .populate({ path: 'event' })
          .exec()) as QueriedVolunteerLogDTO[];

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
        error: 'Sorry, only GET requests are supported',
      });
      break;
  }
}
