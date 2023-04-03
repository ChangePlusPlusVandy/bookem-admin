import dbConnect from '@/lib/dbConnect';
import Users from 'bookem-shared/src/models/Users';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';
import {
  QueriedUserData,
  QueriedVolunteerEventData,
} from 'bookem-shared/src/types/database';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get session user
  const session = await getServerSession(req, res, authOptions);

  switch (req.method) {
    /**
     * @route GET /api/event/
     * @desc Get all events
     * @res QueriedVolunteerEventData
     */
    case 'GET':
      try {
        await dbConnect();

        // Query event
        const allEvents: QueriedVolunteerEventData =
          (await VolunteerEvents.find()) as unknown as QueriedVolunteerEventData;

        return res.status(200).json(allEvents);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
      break;
    // case 'PUT':
    // case 'DELETE':
    // default:
    // res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'POST']);
    // res.status(405).end(`Method ${method} Not Allowed`);
  }
}
