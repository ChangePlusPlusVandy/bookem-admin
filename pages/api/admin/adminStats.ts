import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Users from 'bookem-shared/src/models/Users';
import VolunteerLogs from 'bookem-shared/src/models/VolunteerLogs';
import VolunteerEvents from 'bookem-shared/src/models/VolunteerEvents';

export default async function unifiedHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect();

  switch (req.query.type) {
    case 'userCount':
      return handleRequest(req, res, Users, countDocuments);
    case 'volunteerHours':
      return handleRequest(req, res, VolunteerLogs, aggregateHours);
    case 'eventCount':
      return handleRequest(req, res, VolunteerEvents, countDocuments);
    default:
      return res.status(405).json({ error: 'Request type not supported' });
  }
}

async function handleRequest(req, res, model, operation) {
  switch (req.method) {
    case 'POST':
    case 'GET':
      try {
        const result = await operation(model);
        res.status(200).json(result);
      } catch (e) {
        console.error('An error has occurred:', e);
        res.status(500).json({ error: 'Error accessing the database' });
      }
      break;
    default:
      res.status(405).json({ error: 'Only GET and POST requests are supported' });
      break;
  }
}

async function countDocuments(model) {
  const count = await model.countDocuments({});
  return { count };
}

async function aggregateHours(model) {
  const aggregationPipeline = [
    {
      $group: {
        _id: null,
        totalHours: { $sum: "$hours" }
      }
    }
  ];
  const result = await model.aggregate(aggregationPipeline);
  return { totalHours: result[0]?.totalHours || 0 };
}
