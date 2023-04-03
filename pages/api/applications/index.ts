import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/lib/dbConnect';

import VolunteerApplications from 'bookem-shared/src/models/VolunteerApplications';

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
        console.log('userid' + userid);
        const logs = await VolunteerApplications.find({
          userId: userid,
        });

        console.log('found this many: ', logs.length);

        // if user does not exist, handle
        if (!logs) res.status(400).json({ message: 'No logs found' });

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
