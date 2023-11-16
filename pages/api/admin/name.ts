import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import dbConnect from 'lib/dbConnect';
import Admins from 'bookem-shared/src/models/Admins';
import { Document } from 'mongoose';

interface UserDoc extends Document {
  firstName: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await dbConnect();
    const user = (await Admins.findById(session.user._id)) as UserDoc | null;

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ name: user.firstName });
  } catch (error) {
    const e = error as Error;
    res.status(500).json({ error: e.message || 'Internal Server Error' });
  }
}
