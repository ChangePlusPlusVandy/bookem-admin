import dbConnect from '@/lib/dbConnect';
import Users from 'bookem-shared/src/models/Users';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';
import Tags from 'bookem-shared/src/models/Tags';
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

  // Get request parameter
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    /**
     * @route GET /api/event/[id]
     * @desc Get event by id
     * @req event id, user in session
     * @res QueriedVolunteerEventData
     */
    case 'GET':
      try {
        await dbConnect();

        if (!id) return res.status(400).json({ message: 'Missing id' });

        // check if id is a valid mongoose id
        if (!ObjectId.isValid(id as string))
          return res.status(400).json({ message: 'Invalid id' });

        // TODO: remove this after development
        await Tags.find({});

        // query event and populate fields with mongoose refs
        const event = await VolunteerEvents.findById(id)
          .populate({ path: 'program' })
          .populate({ path: 'tags' })
          .exec();

        // if event is not found
        if (!event)
          return res.status(400).json({ message: 'Program not found' });

        return res.status(200).json(event);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
      break;

    /**
     * @route POST /api/event/[id]
     * @desc Signup/Unsignup the user
     * @req event id, user in session
     * @res Success message
     */
    case 'POST':
      try {
        await dbConnect();

        // Query event
        const event = await VolunteerEvents.findById(id);

        // Query logged in user
        const user = await Users.findById(session.user._id);

        // Find the index of logged in user in event.volunteers
        const userIndex = event.volunteers.indexOf(user._id);

        // Find the index of event in user.events
        const eventIndex = user.events.indexOf(event._id);

        if (userIndex === -1 && eventIndex === -1) {
          // Register to the event
          event.volunteers.unshift(user._id);
          user.events.unshift(event._id);
        } else if (userIndex === -1 || eventIndex === -1) {
          throw new Error('Inconsistency between collections!');
        } else {
          // Unregister
          // Remove the user and event
          event.volunteers.splice(userIndex, 1);
          user.events.splice(eventIndex, 1);
        }

        // Resave both document
        await user.save();
        await event.save();

        return res.status(200).json('Register Success');
      } catch (error: any) {
        res.status(500).json({ message: error.message });
        console.error(error);
      }

      break;

    /**
     * @route PATCH /api/event/[id]
     * @desc Update the event by id
     * @req event id, user in session
     * @res Success message
     */
    case 'PATCH':
      try {
        // connect to db
        await dbConnect();

        if (!id) return res.status(400).json({ message: 'Missing id' });

        // check if id is a valid mongoose id
        if (!ObjectId.isValid(id as string))
          return res.status(400).json({ message: 'Invalid id' });

        // validate that req.body follows the VolunteerEventSchema
        const newEvent = new VolunteerEvents(req.body);

        try {
          await newEvent.validate();
        } catch (error: any) {
          return res.status(400).json({ message: error.message });
        }

        // update event based on input
        const event = await VolunteerEvents.findByIdAndUpdate(id, req.body);

        // if event is not found
        if (!event)
          return res.status(400).json({ message: 'Program not found' });

        return res.status(200).json('Update Success');
      } catch (error: any) {
        res.status(500).json({ message: error.message });
        console.error(error);
      }

      break;
    // case 'PUT':
    // case 'DELETE':
    // default:
    // res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'POST']);
    // res.status(405).end(`Method ${method} Not Allowed`);
  }
}
