import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Users from 'bookem-shared/src/models/Users';
import VolunteerLogs from 'bookem-shared/src/models/VolunteerLogs';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';

type ModelType = typeof Users | typeof VolunteerLogs | typeof VolunteerEvents;
interface Stats {
  userCount: number;
  volunteerHours: number;
  eventCount: number;
}
interface Error {
  error: string;
}

export default async function unifiedHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect();
  return handleAllStats(req, res);
}

async function handleAllStats(
  req: NextApiRequest,
  res: NextApiResponse<Stats | Error>
) {
  try {
    const userCount = await countDocuments(Users);
    const volunteerHours = await aggregateHours(VolunteerLogs);
    const eventCount = await countDocuments(VolunteerEvents);

    res
      .status(200)
      .json({
        userCount: userCount.count,
        volunteerHours: volunteerHours.totalHours,
        eventCount: eventCount.count,
      });
  } catch (e) {
    console.error('An error has occurred:', e);
    res.status(500).json({ error: 'Error fetching all stats' });
  }
}

async function countDocuments(model: ModelType) {
  const count = await model.countDocuments({});
  return { count };
}

async function aggregateHours(model: ModelType) {
  const aggregationPipeline = [
    {
      $group: {
        _id: null,
        totalHours: { $sum: '$hours' },
      },
    },
  ];
  const result = await model.aggregate(aggregationPipeline);
  return { totalHours: result[0]?.totalHours || 0 };
}
