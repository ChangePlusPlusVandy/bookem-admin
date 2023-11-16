import { signOut } from 'next-auth/react';
import MainDashboard from '@/components/Home/MainDashBoard';

const userData = {
  name: 'Carol He',
  totalVolunteers: 10,
  totalVolunteerHours: 5,
  totalEvents: 100,
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
