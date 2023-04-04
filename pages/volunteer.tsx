import VolunteerTable from '@/components/table/VolunteerTable';
import { VolunteerLayout } from '@/styles/volunteer.styles';
import React from 'react';

const volunteer = () => {
  return (
    <VolunteerLayout>
      <VolunteerTable />
    </VolunteerLayout>
  );
};

export default volunteer;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
