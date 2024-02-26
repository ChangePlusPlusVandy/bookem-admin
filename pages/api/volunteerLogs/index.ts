import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/lib/dbConnect';

import VolunteerLogs from 'bookem-shared/src/models/VolunteerLogs';
import { QueriedVolunteerLogData } from 'bookem-shared/src/types/database';
import { VolunteerLogData } from 'bookem-shared/src/types/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // check that user is authenticated
  const validateData = (volunteerLog: VolunteerLogData): boolean => {
    if (!volunteerLog.eventId) {
      res.status(500).json({
        message: 'You forgot to select an event.',
      });
      return false;
    }

    if (!volunteerLog.hours) {
      res
        .status(500)
        .json({ message: 'You forgot to fill in number of hours.' });
      return false;
    }

    if (!volunteerLog.numBooks) {
      res
        .status(500)
        .json({ message: 'You forgot to fill in number of books donated' });
      return false;
    }

    if (!volunteerLog.date) {
      res.status(500).json({ message: 'You forgot to fill in date' });
      return false;
    }
    return true;
  };

  switch (req.method) {
    case 'GET':
      try {
        // Connect to the database
        await dbConnect();
        const logs = await VolunteerLogs.find();
        res.status(200).json(logs);
      } catch (e) {
        console.error('An error has occurred in index.ts', e);
        res.status(500).json({
          error: 'Sorry, an error occurred while connecting to the database',
        });
      }
      break;

    case 'POST':
      try {
        // connect to our database
        await dbConnect();

        // start a try catch block to catch any errors in parsing the request body
        const volunteerLog = req.body as VolunteerLogData;

        if (!validateData(volunteerLog)) return;

        // construct the object we want to insert into our database
        await VolunteerLogs.insertMany(volunteerLog);

        // return the result of the action
        res.status(200).json({
          message: 'Successfully Logged hours',
        });
      } catch (e) {
        // if there is an error, print and return the error
        console.error('An error has occurred in volunteerLogs/create.ts', e);
        res.status(500).json({
          error:
            'Sorry, an error occurred while connecting/inserting to the database: ',
          message: '' + e,
        });
      }
      break;

    default:
      res.status(405).json({
        error: 'Sorry, only GET and POST requests are supported',
      });
      break;
  }
}
