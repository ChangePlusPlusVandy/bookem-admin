import dbConnect from '@/lib/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'PUT':
      try {
        await dbConnect();
        const eventIds = req.body as string[];
        console.log(eventIds);

        return res
          .status(200)
          .json({
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
