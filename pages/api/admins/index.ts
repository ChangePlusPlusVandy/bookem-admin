import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/lib/dbConnect';

import { getSession } from 'next-auth/react';
import Admins from 'bookem-shared/src/models/Admins';
import { AdminData } from 'bookem-shared/src/types/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({
      error: 'You are unauthorized to perform this action. Please login first',
    });
    return;
  }

  switch (req.method) {
    case 'GET':
      // Connect to the database
      await dbConnect();

      try {
        const allAdmin = (await Admins.find()) as unknown as AdminData;
        res.status(200).json(allAdmin);
      } catch (e) {
        console.error('An error has occurred in index.ts', e);
        res.status(500).json({
          error: 'Sorry, an error occurred while connecting to the database',
        });
      }
      break;

    default:
      res.status(405).json({
        error: 'Sorry, only GET requests are supported',
      });
      break;
  }
}
