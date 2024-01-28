import dbConnect from '@/lib/dbConnect';
import Users from 'bookem-shared/src/models/Users';
import VolunteerPrograms from 'bookem-shared/src/models/VolunteerPrograms';
import Tags from 'bookem-shared/src/models/Tags';
import {
  QueriedUserData,
  QueriedVolunteerProgramData,
} from 'bookem-shared/src/types/database';
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

  switch (req.method) {
    /**
     * @route GET /api/program/
     * @desc Get all programs
     * @res QueriedVolunteerProgramData
     */
     case 'GET':
      try {
        await dbConnect();
        const allPrograms = await VolunteerPrograms.find();
        return res.status(200).json(allPrograms); // directly returning the array
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
