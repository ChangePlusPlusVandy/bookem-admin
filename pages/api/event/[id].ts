import dbConnect from '@/lib/dbConnect';
import Users from 'bookem-shared/src/models/Users';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';
import Tags from 'bookem-shared/src/models/Tags';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import VolunteerPrograms from 'bookem-shared/src/models/VolunteerPrograms';
import VolunteerApplications from 'bookem-shared/src/models/VolunteerApplications';
import mongoose from 'mongoose';
import ApplicationResponse from 'bookem-shared/src/models/ApplicationResponse';

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
        await VolunteerPrograms.findOne();
        await Tags.findOne();

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
    case 'DELETE':
      try {
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
          const deletedApplication = await VolunteerApplications.findOne({
            event: id,
          });

          const deletedEvent = await VolunteerEvents.findByIdAndDelete(id);
          if (!deletedEvent) {
            await session.abortTransaction();
            return res.status(400).json({ message: 'Event not found' });
          }

          if (deletedApplication) {
            await Promise.all([
              ...deletedApplication.responses.map(async responseId => {
                // Find responses to this application
                const response = await ApplicationResponse.findById(responseId);
                if (response) {
                  // Update User collection
                  const user = await Users.findById(response.user);
                  if (user) {
                    user.events = user.events.filter(
                      eventId => eventId.toString() !== id
                    );
                    user.save();
                  }
                  // Remove response
                  response.remove();
                }
              }),
              // Remove Application
              deletedApplication.remove(),
            ]);
          }
        });
        session.endSession();
        return res.status(200).json({ message: 'Event deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sorry an error occurred' });
      }
      break;
    // default:
    // res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'POST']);
    // res.status(405).end(`Method ${method} Not Allowed`);
  }
}
