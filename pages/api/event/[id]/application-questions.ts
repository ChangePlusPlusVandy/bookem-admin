import dbConnect from '@/lib/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import VolunteerApplications from 'bookem-shared/src/models/VolunteerApplications';
import { QueriedVolunteerApplicationData } from 'bookem-shared/src/types/database';

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
     * @route GET /api/event/application-questions
     * @desc Return a list of questions
     * @req event id
     * @res a list of questions
     */
    case 'GET':
      try {
        await dbConnect();

        const application = (await VolunteerApplications.findOne({
          event: id,
        })) as QueriedVolunteerApplicationData;

        if (!application)
          return res.status(500).json({ message: 'Application not found' });

        return res.status(200).json(application.questions);
      } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
      break;

    default:
      res.status(405).end('Method Not Allowed');
      break;
  }
}
