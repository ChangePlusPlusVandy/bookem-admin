import dbConnect from '@/lib/dbConnect';
import Volunteer from '@/pages/volunteer/[pid]';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';
import VolunteerPrograms from 'bookem-shared/src/models/VolunteerPrograms';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'PUT':
      try {
        await dbConnect();
        const { eventIds, programName } = JSON.parse(req.body);
        console.log(eventIds);

        if (programName === 'None') {
          // Remove the program field of events
          await VolunteerEvents.updateMany(
            { _id: { $in: eventIds } },
            { program: null }
          );
          return res.status(200).json({
            message: 'Event removed from program successfully',
            status: 'success',
          });
        }

        const program = await VolunteerPrograms.findOne({ name: programName });
        // Update the "program" field of events to the id of "program" variable
        await VolunteerEvents.updateMany(
          { _id: { $in: eventIds } },
          { program: program._id }
        );

        return res.status(200).json({
          message: 'Event added to program successfully',
          status: 'success',
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'POST']);
      res.status(405).end(`Method Not Allowed`);
  }
}
