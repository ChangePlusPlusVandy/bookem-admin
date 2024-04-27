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
    /**
     * @route GET /api/event/applications
     * @desc Return a list of questions + a list of responses
     * @req event id
     * @res a list of questions + a list of responses
     */
    case 'GET':
      try {
        await dbConnect();

        await ApplicationResponse.find();
        await Users.find();

        const application = await VolunteerApplications.find({
          event: id,
        })
          .populate({
            path: 'responses',
            populate: {
              path: 'user',
              model: 'User',
              select: 'name email',
            },
          })
          .exec();

        if (!application)
          return res.status(500).json({ message: 'Application not found' });

        return res.status(200).json(application);
      } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
      break;

    case 'POST':
      try {
        await dbConnect();

        const newApplication = new VolunteerApplications(req.body);

        // check if event exists
        const event = await VolunteerEvents.findById(newApplication.event);
        if (!event) {
          return res
            .status(200)
            .json({ message: 'Event not found', status: 'error' });
        }

        // check if application exists
        const existingApplication = await VolunteerApplications.findOne({
          event: newApplication.event,
        });

        if (existingApplication) {
          existingApplication.questions = newApplication.questions;
          const savedApplication = await existingApplication.save();
          if (!savedApplication) {
            return res
              .status(200)
              .json({ message: 'Failed to save application', status: 'error' });
          }
        } else {
          const savedApplication = await newApplication.save();
          if (!savedApplication) {
            return res
              .status(200)
              .json({ message: 'Failed to save application', status: 'error' });
          }
        }

        return res
          .status(200)
          .json({ message: 'Application saved', status: 'success' });
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
