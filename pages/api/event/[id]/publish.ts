import dbConnect from '@/lib/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import VolunteerApplications from 'bookem-shared/src/models/VolunteerApplications';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';
import { QueriedVolunteerEventData } from 'bookem-shared/src/types/database';
import Users from 'bookem-shared/src/models/Users';
import ApplicationResponse from 'bookem-shared/src/models/ApplicationResponse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get request parameter
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'PUT':
      try {
        await dbConnect();

        console.log('Publishing event with id:', id);

        // Update event to published
        const event = await VolunteerEvents.findOneAndUpdate(
          { _id: id },
          { published: true },
          { new: true }
        );

        if (!event) {
          return res
            .status(200)
            .json({ message: 'Event not found', status: 'error' });
        }

        return res
          .status(200)
          .json({ message: 'Event published', status: 'success' });
      } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Sorry an internal error occurred' });
      }
      break;

    default:
      res.status(405).end('Method Not Allowed');
      break;
  }
}
