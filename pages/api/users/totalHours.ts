import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/lib/dbConnect';

import { getSession } from 'next-auth/react';
import Users from 'bookem-shared/src/models/Users';
import { UserData } from 'bookem-shared/src/types/database';
import VolunteerLogs from 'bookem-shared/src/models/VolunteerLogs';

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
        let sumOfHours = await Users.aggregate([
          {
            $lookup: {
              from: 'volunteerLogs',
              localField: '_id',
              foreignField: 'userId',
              as: 'logs',
            },
          },
          {
            $project: {
              userId: 1,
              totalHours: {
                $sum: '$logs.hours',
              },
            },
          },
          {
            $group: {
              _id: null,
              sum: {
                $sum: '$totalHours',
              },
            },
          },
        ]);
        console.log(sumOfHours[0].sum);
        res.status(200).json(sumOfHours[0].sum);
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
