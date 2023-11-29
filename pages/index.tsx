import { signOut } from 'next-auth/react';
import MainDashboard from '@/components/Home/MainDashBoard';

const HomePage = () => {
  return (
    <>
      <MainDashboard />
    </>
  );
};

export default HomePage;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
