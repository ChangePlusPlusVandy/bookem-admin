import dbConnect from '@/lib/dbConnect';
import Users from 'bookem-shared/src/models/Users';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';
import Tags from 'bookem-shared/src/models/Tags';
import { QueriedTagData } from 'bookem-shared/src/types/database';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import VolunteerPrograms from 'bookem-shared/src/models/VolunteerPrograms';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get session user
  const session = await getServerSession(req, res, authOptions);

  switch (req.method) {
    /**
     * @route GET /api/tags
     * @desc Get all tags
     */
    case 'GET':
      await dbConnect();
      try {
        // query events and return all tags
        const allTags = (await Tags.find()) as QueriedTagData[];
        return res.status(200).json(allTags);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
      break;
    /**
     * @route POST /api/tags
     * @desc create a new tag with empty events array
     */
    case 'POST':
      await dbConnect();
      try {
        //create a new tag with events[] initialized to empty
        const { tagName } = req.body;
        const newTag = new Tags({
          tagName,
          events: [],
        });
        await newTag.save();
        res.status(200).json({ message: 'New tag created successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: err });
      }
      break;

    // case 'PUT':
    // case 'DELETE':
    // default:
    // res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'POST']);
    // res.status(405).end(`Method ${method} Not Allowed`);
  }
}
