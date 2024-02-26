import dbConnect from '@/lib/dbConnect';
import Tags from 'bookem-shared/src/models/Tags';
import { QueriedTagData } from 'bookem-shared/src/types/database';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    /**
     * @route GET /api/tags/
     * @desc Get all tags
     * @res QueriedTagData[] - array of tags
     */
    case 'GET':
      try {
        await dbConnect();
        const allTags = await Tags.find();
        return res.status(200).json(allTags); // directly returning the array
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
      break;

    // case 'PUT':
    // case 'DELETE':
    // default:
    // res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'POST']);
    // res.status(405).end(`Method ${method} Not Allowed`);
  }
}
