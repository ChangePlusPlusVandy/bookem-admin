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
        // Start Transaction
        const session = await VolunteerEvents.startSession();
        session.startTransaction();

        // Delete tag from Tag collection
        const deletedTag = await Tags.findByIdAndDelete(id);
        if (!deletedTag) {
          await session.abortTransaction();
          session.endSession();
          return res.status(500).json({ message: 'Tag not found' });
        }

        // Delete tag from Events collection
        const events = await VolunteerEvents.find({ tags: id });
        const updatePromises = events.map(async event => {
          event.tags = event.tags.filter(
            (tag: ObjectId) => tag.toString() !== id
          );
          await event.save();
        });
        await Promise.all(updatePromises);

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'Tag deleted successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sorry an error occurred' });
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
