import AdminTable from '@/components/table/AdminTable';
import { Title, VolunteerLayout } from '@/styles/volunteer.styles';
import React from 'react';

const settings = () => {
  return (
    <VolunteerLayout>
      <Title>Admin Management & Settings</Title>
      <AdminTable />
    </VolunteerLayout>
  );
};

export default settings;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
