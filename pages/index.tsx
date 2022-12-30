import { useSession, signOut } from 'next-auth/react';
import styles from '@/styles/Home.module.css';
import LoginPage from './LoginPage';
import { UserTable } from '@/components/UserTable';
import { UserData } from 'types/database';
import mongoose from 'mongoose';

export default function Home() {
  const { data: session, status } = useSession();

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
    <div className={styles.container}>
      {status === 'loading' && <div>Loading...</div>}
      {!session && <LoginPage />}
      {session && (
        <>
          <div>You have signed in as {session.user?.email}</div>
          <button onClick={() => signOut()}>Sign out</button>

          {/* Display the list of users */}
          <UserTable
            headers={['Name', 'Email', 'Phone', 'Address']}
            users={users}
          />
        </>
      )}
    </div>
  );
}
