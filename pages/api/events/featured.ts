import dbConnect from '@/lib/dbConnect';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';
import Tags from 'bookem-shared/src/models/Tags'; // Replace with the actual path to your Tags model
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get request method
  const { method } = req;

  switch (method) {
    /**
     * @route GET /api/events/featured
     * @desc Get all events with the tag 'featured'
     * @res QueriedVolunteerEventData[]
     */
    case 'GET':
      try {
        await dbConnect();

        // First, find the ObjectId for the 'featured' tag
        const featuredTag = await Tags.findOne({ tagName: 'featured' });
        if (!featuredTag) {
          return res.status(404).json({ message: 'Featured tag not found.' });
        }

        // Now, use the ObjectId to query for events
        const featuredEvents = await VolunteerEvents.find({
          tags: featuredTag._id, // Use the ObjectId of the 'featured' tag
        }).sort({ startDate: 1 });

        return res.status(200).json(featuredEvents);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch featured events.' });
      }
      break;

    // case 'POST':
    // case 'PUT':
    // case 'DELETE':
    default:
      // Inform the client about allowed methods if necessary
      // res.setHeader('Allow', ['GET']); // Uncomment and adjust according to supported methods
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
