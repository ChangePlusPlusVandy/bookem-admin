import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/lib/dbConnect';

import { getSession } from 'next-auth/react';
import Users from 'bookem-shared/src/models/Users';
import { _id } from '@next-auth/mongodb-adapter';
import mongoose from 'mongoose';

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
    case 'POST':
    case 'GET':
      let aggregationPipeline: any[] = [
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
      ];

      try {
        // Connect to the database
        await dbConnect();

        // if filters are provided, match the users first
        if (req.body.filters) {
          let objectIdArray = req.body.filters.map(
            (s: string) => new mongoose.Types.ObjectId(s)
          );
          aggregationPipeline = [
            {
              $match: {
                _id: {
                  $in: objectIdArray,
                },
              },
            },
            ...aggregationPipeline,
          ];
        }
        const sumOfHours = await Users.aggregate(aggregationPipeline);
        res.status(200).json(sumOfHours[0].sum);
      } catch (e) {
        console.error('An error has occurred in totalHours.ts', e);
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
