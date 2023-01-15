import { UserTable } from '@/components/UserTable';
import React from 'react';
import { QueriedUserData as UserData } from 'bookem-shared/src/types/database';
import mongoose from 'mongoose';

/**
 * Page used to test UserTable component
 * Restructure is needed in the furture to add authentication before displaying the data
 * @returns
 */
export default function Users() {
  //Dummy users
  const users: Array<UserData> = [
    {
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
    {
      _id: new mongoose.Types.ObjectId(),
      name: 'user2',
      email: 'user2@bookem.org',
      password: 'abcdefg',
      phone: '1234567890',
      address: 'TN',
      sourceHeardFrom: 'Change++',
      ethnicity: 'Asian',
      gender: 'Female',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  return (
    <div>
      <UserTable
        headers={['Name', 'Email', 'Phone', 'Address']}
        users={users}
      />
    </div>
  );
}
