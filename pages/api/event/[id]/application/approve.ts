import dbConnect from '@/lib/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import ApplicationResponse from 'bookem-shared/src/models/ApplicationResponse';
import mongoose from 'mongoose';
import {
  ApplicationStatus,
  ApplicationResponseData,
} from 'bookem-shared/src/types/database';
import { enumChecking as checkEnum } from '@/utils/utils';
import Users from 'bookem-shared/src/models/Users';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';

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
     * @route PUT /api/event/[id]/application/approve
     * @desc update the status of a response to approved
     * @req responseIds (array of response ids)
     * @res a message telling whether the response is updated
     */
    case 'PUT':
      try {
        await dbConnect();

        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
          const responseIds = req.body as string[];
          const updated = await ApplicationResponse.updateMany(
            { _id: { $in: responseIds } },
            { status: 'approved' }
          );
          if (!updated) {
            await session.abortTransaction();
            return res
              .status(200)
              .json({ message: 'Response not found', status: 'error' });
          }

          await Promise.all(
            responseIds.map(async responseId => {
              const response = await ApplicationResponse.findById(responseId);
              if (!response) {
                await session.abortTransaction();
                return res
                  .status(200)
                  .json({ message: 'Response not found', status: 'error' });
              }

              const [user, event] = await Promise.all([
                Users.findById(response.user),
                VolunteerEvents.findById(response.event),
              ]);
              if (!user || !event) {
                await session.abortTransaction();
                return res
                  .status(200)
                  .json({ message: 'Response not found', status: 'error' });
              }

              event.volunteers.push(user._id);
              user.events.push(event._id);

              event.save();
              user.save();
            })
          );
        });
        await session.endSession();

        return res.status(200).json({
          message: 'The applications have been approved!',
          status: 'success',
        });
      } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
      break;
  }
}
