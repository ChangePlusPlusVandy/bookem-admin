import dbConnect from '@/lib/dbConnect';
import VolunteerPrograms from 'bookem-shared/src/models/VolunteerPrograms';
import Tags from 'bookem-shared/src/models/Tags';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get session user
  const session = await getServerSession(req, res, authOptions);

  // Get request parameter
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    /**
     * @route GET /api/events/program/[id]
     * @desc Get events by program id
     * @req program id, user in session
     * @res QueriedVolunteerProgramData
     */
    case 'GET':
      try {
        await dbConnect();

        if (!id) return res.status(400).json({ message: 'Missing id' });

        // check if id is a valid mongoose id
        if (!ObjectId.isValid(id as string))
          return res.status(400).json({ message: 'Invalid id' });

        // TODO: remove this after development
        await Tags.find({});

        // query program and populate fields with mongoose refs
        const program = await VolunteerPrograms.findById(id)
          .exec();

        // if program is not found
        if (!program)
          return res.status(400).json({ message: 'Program not found' });

        return res.status(200).json(program.events);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
      break;
    }
}