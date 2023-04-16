import { signOut } from 'next-auth/react';
import MainDashboard from '@/components/Home/MainDashboard';
import React from 'react';

const userData = {
  name: 'Carol He',
  hoursVolunteered: 10,
  booksShared: 5,
  dollarsDonated: 100,
};

const HomePage = () => {
  return (
    <>
      <MainDashboard userData={userData} />
    </>
  );
};

export default HomePage;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
