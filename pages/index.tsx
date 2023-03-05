import { signOut } from 'next-auth/react';

const HomePage = () => {
  return (
    <div>
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
