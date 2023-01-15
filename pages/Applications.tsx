import React from 'react';
import { QueriedVolunteerProgramApplicationDTO as VolunteerProgramApplicationData } from 'bookem-shared/src/types/database';
import mongoose from 'mongoose';
import { ProgramApplicationTable } from '@/components/ProgramApplicationTable';

/**
 * Page used to test ProgramApplicationTable component
 * Restructure is needed in the future to add authentication before displaying the data
 * @returns
 */
export default function applications() {
  const applications: Array<VolunteerProgramApplicationData> = [
    {
      _id: new mongoose.Types.ObjectId(),
      userId: new mongoose.Types.ObjectId(),
      user: {
        _id: new mongoose.Types.ObjectId(),
        name: 'user1',
        email: 'user1@bookem.org',
        password: 'abcdefg',
        phone: '1234567890',
        address: 'TN',
        sourceHeardFrom: 'Change++',
        ethnicity: 'Asian',
        gender: 'Male',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      programId: new mongoose.Types.ObjectId(),
      program: {
        _id: new mongoose.Types.ObjectId(),
        name: 'program 1',
        description: 'program 1',
        programDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      formData: new mongoose.Schema.Types.Mixed(''),
      createdAt: new Date(),
    },
  ];

  return (
    <>
      <ProgramApplicationTable
        headers={['Applicant', 'Email', 'Program', 'Program Date']}
        applications={applications}
      />
    </>
  );
}
