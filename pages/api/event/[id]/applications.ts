import dbConnect from '@/lib/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import VolunteerApplications from 'bookem-shared/src/models/VolunteerApplications';

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

        const applicationWithResponses = await VolunteerApplications.find({
          eventId: id,
        });

        return res.status(200).json(applicationWithResponses);
      } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
      break;
  }
}
