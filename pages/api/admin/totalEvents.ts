import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Users from 'bookem-shared/src/models/VolunteerEvents';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case 'POST':
    case 'GET':
      try {
        // Connect to the database
        await dbConnect();

        // Count the number of documents (representing JSON files) in the Users collection
        const count = await Users.countDocuments({});

        // Send the count as a response
        res.status(200).json({ count });
      } catch (e) {
        console.error('An error has occurred:', e);
        res.status(500).json({
          error: 'Sorry, an error occurred while connecting to the database',
        });
      }
      break;

    default:
      res.status(405).json({
        error: 'Sorry, only GET and POST requests are supported',
      });
      break;
  }
}