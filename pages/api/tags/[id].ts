import dbConnect from '@/lib/dbConnect';
import Users from 'bookem-shared/src/models/Users';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';
import Tags from 'bookem-shared/src/models/Tags';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get session user
  const session = await getServerSession(req, res, authOptions);

  // Get request parameter
  const {
    query: { id },
    body: { newTagName },
    method,
  } = req;

  switch (method) {
    /**
     * @route DELETE /api/tags/[id]
     * @desc delete tag with id
     */
    case 'DELETE':
      try {
        await dbConnect();
        const deletedTag = await Tags.findByIdAndDelete(id);
        if (!deletedTag) {
          return res.status(404).json({ error: 'Tag not found' });
        }
        res.status(200).json({ message: 'Tag deleted successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: err });
      }
      break;
    case 'PUT':
      try {
        await dbConnect();
        // console.log(newTagName);
        const updatedTag = await Tags.findByIdAndUpdate(id, {
          tagName: newTagName,
        });
        if (!updatedTag) {
          return res.status(404).json({ error: 'Tag not found' });
        }
        res.status(200).json({ message: 'Tag edited successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: err });
      }
  }
}
