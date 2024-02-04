import dbConnect from '@/lib/dbConnect';
import Users from 'bookem-shared/src/models/Users';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';
import Tags from 'bookem-shared/src/models/Tags';
import {
  QueriedUserData,
  QueriedVolunteerEventData,
} from 'bookem-shared/src/types/database';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import VolunteerPrograms from 'bookem-shared/src/models/VolunteerPrograms';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get session user
  const session = await getServerSession(req, res, authOptions);

  await dbConnect();

  switch (req.method) {
    /**
     * @route GET /api/event/
     * @desc Get all events
     * @res QueriedVolunteerEventData
     */
    case 'GET':
      try {
        await dbConnect();

        // TODO: remove this after development
        await Tags.find({});
        await VolunteerPrograms.find({});

        // query events and populate fields with mongoose refs
        const allEvents = await VolunteerEvents.find()
          .populate({ path: 'program' })
          .populate({ path: 'tags' })
          .exec();

        return res.status(200).json(allEvents);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
      break;

    case 'POST':
      try {
        // Extract data from the request body
        const eventData = req.body;

        // Optionally, add session user info to the event data
        // e.g., eventData.organizer = session.user.id;

        // Create a new event
        const event = new VolunteerEvents(eventData);

        // Save the event to the database
        await event.save();

        // Send a success response
        res.status(201).json({ success: true, event });
      } catch (error) {
        console.error(error);
        res
          .status(400)
          .json({ success: false, message: 'Error creating event' });
      }
      break;

    // case 'PUT':
    // case 'DELETE':
    // default:
    // res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'POST']);
    // res.status(405).end(`Method ${method} Not Allowed`);
  }
}
