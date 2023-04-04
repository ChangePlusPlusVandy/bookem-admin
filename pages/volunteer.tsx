import VolunteerTable from '@/components/table/VolunteerTable';
import { VolunteerLayout, Title } from '@/styles/volunteer.styles';
import React from 'react';

const volunteer = () => {
  return (
    <VolunteerLayout>
      <Title>Volunteer Management</Title>
      <VolunteerTable />
    </VolunteerLayout>
  );
};

export default volunteer;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
