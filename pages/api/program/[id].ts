import dbConnect from '@/lib/dbConnect';
import Users from 'bookem-shared/src/models/Users';
import VolunteerPrograms from 'bookem-shared/src/models/VolunteerPrograms';
import Tags from 'bookem-shared/src/models/Tags';
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

  // Get request parameter
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    /**
     * @route GET /api/program/[id]
     * @desc Get program by id
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
          // .populate({ path: 'program' })
          .exec();

          console.log(program)

        // if program is not found
        if (!program)
          return res.status(400).json({ message: 'Program not found' });

        return res.status(200).json(program);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
      break;

    /**
     * @route POST /api/program/[id]
     * @desc Signup/Unsignup the user
     * @req program id, user in session
     * @res Success message
     */
    case 'POST':
      try {
        await dbConnect();

        // Query program
        const program = await VolunteerPrograms.findById(id);

        // Query logged in user
        const user = await Users.findById(session.user._id);

        // Find the index of logged in user in program.volunteers
        const userIndex = program.volunteers.indexOf(user._id);

        // Find the index of program in user.programs
        const programIndex = user.programs.indexOf(program._id);

        if (userIndex === -1 && programIndex === -1) {
          // Register to the program
          program.volunteers.unshift(user._id);
          user.programs.unshift(program._id);
        } else if (userIndex === -1 || programIndex === -1) {
          throw new Error('Inconsistency between collections!');
        } else {
          // Unregister
          // Remove the user and program
          program.volunteers.splice(userIndex, 1);
          user.programs.splice(programIndex, 1);
        }

        // Resave both document
        await user.save();
        await program.save();

        return res.status(200).json('Register Success');
      } catch (error: any) {
        res.status(500).json({ message: error.message });
        console.error(error);
      }

      break;

    /**
     * @route PATCH /api/program/[id]
     * @desc Update the program by id
     * @req program id, user in session
     * @res Success message
     */
    case 'PATCH':
      try {
        // connect to db
        await dbConnect();

        if (!id) return res.status(400).json({ message: 'Missing id' });

        // check if id is a valid mongoose id
        if (!ObjectId.isValid(id as string))
          return res.status(400).json({ message: 'Invalid id' });

        // validate that req.body follows the VolunteerProgramSchema

        // update program based on input
        const program = await VolunteerPrograms.findByIdAndUpdate(id, req.body);
        console.log('before update: ', program);
        console.log('after update: ', req.body);

        // if program is not found
        if (!program)
          return res.status(400).json({ message: 'Program not found' });

        return res.status(200).json('Update Success');
      } catch (error: any) {
        res.status(500).json({ message: error.message });
        console.error(error);
      }

      break;
    // case 'PUT':
    // case 'DELETE':
    // default:
    // res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'POST']);
    // res.status(405).end(`Method ${method} Not Allowed`);
  }
}
