import { signOut, useSession } from 'next-auth/react';
import styles from '@/styles/Home.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <>
        <div>You have signed in</div>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    </div>
  );
};

export default HomePage;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
