import dbConnect from '@/lib/dbConnect';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get request method
  const { method } = req;

  switch (method) {
    /**
     * @route GET /api/events/upcoming
     * @desc Get all events in the future
     * @res QueriedVolunteerEventData[]
     */
    case 'GET':
      try {
        await dbConnect();

        // Select all events where eventDate > today order by progamDate ascending
        const events = await VolunteerEvents.find({
          startDate: { $gt: new Date() },
        })
          .sort({ startDate: 1 })
          .limit(5);

        return res.status(200).json(events);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
      break;

    // case 'POST':
    // case 'PUT':
    // case 'DELETE':
    default:
      // res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
