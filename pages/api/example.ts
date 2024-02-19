import { makeSessionForAPITest } from '@/utils/api-testing';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import dbConnect from '@/lib/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get session user
  let session =
    (await getServerSession(req, res, authOptions)) || makeSessionForAPITest();

  switch (req.method) {
    case 'GET':
      try {
        res.status(200).json({ message: session.user._id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
  }
}
