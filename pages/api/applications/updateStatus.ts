import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';

import VolunteerApplications from 'bookem-shared/src/models/VolunteerApplications';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      console.log('req body', req.body);
      const body = JSON.parse(req.body);

      const id = body.id;
      console.log('id', id);
      const newStatus = { $set: { status: body.updatedStatus } };
      await dbConnect();
      try {
        await VolunteerApplications.updateOne({ _id: id }, newStatus);

        return res.status(200).json({ message: 'succesfully updated status' });
      } catch (e) {
        console.error('An error has occurred in updateStatus.ts', e);
        return res.status(500).json({
          error: 'Sorry, an error occurred while connecting to the database',
        });
      }
      break;
    default:
      res.status(405).json({
        error: 'Sorry, only POST requests are supported',
      });
      break;
  }
}
