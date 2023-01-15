import { useSession, signOut } from 'next-auth/react';
import styles from '@/styles/Home.module.css';
import LoginPage from './LoginPage';
import { UserTable } from '@/components/UserTable';
import { QueriedUserData as UserData } from 'bookem-shared/src/types/database';
import mongoose from 'mongoose';

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div className={styles.container}>
      {status === 'loading' && <div>Loading...</div>}
      {!session && <LoginPage />}
      {session && (
        <>
          <div>You have signed in as {session.user?.email}</div>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}
