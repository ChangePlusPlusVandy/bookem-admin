import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import dbConnect from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';
import Users from 'bookem-shared/src/models/Users';

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
    case 'GET':
      try {
        await dbConnect();

        // TODO: Remove after production
        Users.find();

        const event = await VolunteerEvents.findById(id).populate({
          path: 'volunteers',
        });
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        return res.status(200).json(event.volunteers);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
