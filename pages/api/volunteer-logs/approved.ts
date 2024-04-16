import dbConnect from '@/lib/dbConnect';
import Users from 'bookem-shared/src/models/Users';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';
import VolunteerLogs from 'bookem-shared/src/models/VolunteerLogs';
import { QueriedVolunteerLogDTO } from 'bookem-shared/src/types/database';
import { NextApiRequest, NextApiResponse } from 'next';

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
        await Users.find();
        await VolunteerEvents.find();

        const logs = (await VolunteerLogs.find({ status: 'approved' })
          .populate({ path: 'user' })
          .populate({ path: 'event' })
          .exec()) as QueriedVolunteerLogDTO[];

        return res.status(200).json(logs);
      } catch (e) {
        console.error('An error has occurred in index.ts', e);
        res.status(500).json({
          error: 'Sorry, an error occurred',
        });
      }
      break;
    case 'PUT':
      try {
        await dbConnect();

        const logIds = req.body as string[];

        await VolunteerLogs.updateMany(
          { _id: { $in: logIds } },
          { status: 'approved' }
        );

        return res.status(200).json({
          message: 'The hours have been approved!',
          status: 'success',
        });
      } catch (error) {
        console.error('An error has occurred in index.ts', error);
        res.status(500).json({
          error: 'Sorry, an error occurred',
        });
      }

    default:
      res.status(405).json({
        error: 'Sorry, only GET requests are supported',
      });
      break;
  }
}
