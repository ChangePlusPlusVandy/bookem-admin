import { useSession, signOut } from 'next-auth/react';
import styles from '@/styles/Home.module.css';
import LoginPage from './login';

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

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
