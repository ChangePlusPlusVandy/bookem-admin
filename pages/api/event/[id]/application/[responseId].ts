import dbConnect from '@/lib/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import VolunteerApplications from 'bookem-shared/src/models/VolunteerApplications';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { makeSessionForAPITest } from '@/utils/api-testing';
import ApplicationResponse from 'bookem-shared/src/models/ApplicationResponse';
import { ApplicationStatus, ApplicationResponseData } from 'bookem-shared/src/types/database';
import { enumChecking as checkEnum } from '@/utils/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get session user
  const session =
    (await getServerSession(req, res, authOptions)) || makeSessionForAPITest();

  // Get request parameter
  const {
    query: { id, responseId },
    method,
  } = req;

  switch (method) {
    /**
     * @route GET /api/event/[id]/application/[responseId]
     * @desc Get specific response
     * @req event: id, response: responseId
     * @res a specific response
     */
    case 'GET':
      try {
        await dbConnect();

        const applicationResponse = await ApplicationResponse.findOne({
          _id: responseId,
        });

        if (!applicationResponse) {
          return res.status(404).json({ message: 'Response not found' });
        }

        return res.status(200).json(applicationResponse);
      } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
      break;

    /**
     * @route PUT /api/event/[id]/application/[responseId]
     * @desc update the status of a response
     * @req event: id, response: responseId
     * @res a message telling whether the response is updated
     */
    case 'PUT':
      try {
        await dbConnect();

        const applicationResponse = await ApplicationResponse.findOne({
          _id: responseId,
        });

        if (!applicationResponse) {
          return res.status(404).json({ message: 'Response not found' });
        }

        const responseUpdate = req.body as ApplicationResponseData;

        const updateStatus = responseUpdate.status as ApplicationStatus;
        // enum checking to ensure status is valid
        if (!checkEnum(responseUpdate.status, ApplicationStatus)) {
          return res.status(400).json({ message: 'Invalid status' });
        }

        // update the status
        await ApplicationResponse.findOneAndUpdate(
          { _id: responseId },
          {
            status: updateStatus,
          }
        );

        return res.status(200).json({ message: 'Response updated' });
      } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
      break;
  }
}
