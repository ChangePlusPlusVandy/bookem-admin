import dbConnect from '@/lib/dbConnect';
import Volunteer from '@/pages/volunteer/[pid]';
import Tags from 'bookem-shared/src/models/Tags';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';
import VolunteerPrograms from 'bookem-shared/src/models/VolunteerPrograms';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    /**
     * Add events to tags
     * @param {string[]} eventIds - Array of event ids
     * @param {string[]} tagNames - Array of tag names
     * @returns {string} - Message indicating success or failure
     */
    case 'PUT':
      try {
        await dbConnect();
        const { eventIds, tagNames } = JSON.parse(req.body);

        if (tagNames.length === 0) {
          // Remove the tags field of events
          await VolunteerEvents.updateMany(
            { _id: { $in: eventIds } },
            { tags: [] }
          );
          return res.status(200).json({
            message: 'Event removed from tags successfully',
            status: 'success',
          });
        }

        // Update the "tags" field of events to the id of "tags" variable
        const tags = await Tags.find({ tagName: { $in: tagNames } });
        const tagIds = tags.map(tag => tag._id);
        await VolunteerEvents.updateMany(
          { _id: { $in: eventIds } },
          { tags: tagIds }
        );

        return res.status(200).json({
          message: 'Event added to tag successfully',
          status: 'success',
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
      break;

    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method Not Allowed`);
  }
}
