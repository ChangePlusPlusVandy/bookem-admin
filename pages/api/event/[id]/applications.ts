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
  }
}
