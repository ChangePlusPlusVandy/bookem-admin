import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import VolunteerLogs from 'bookem-shared/src/models/VolunteerLogs';

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

        // Aggregate to sum the hours from the VolunteerLogs collection
        const aggregationPipeline = [
          {
            $group: {
              _id: null, // Group all documents together
              totalHours: {
                $sum: "$hours" // Sum the "hours" field from each document
              }
            }
          }
        ];

        const result = await VolunteerLogs.aggregate(aggregationPipeline);
        const totalHours = result[0]?.totalHours || 0;

        // Send the total hours as a response
        res.status(200).json({ totalHours });
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