import VolunteerTable from '@/components/table/VolunteerTable';
import { PageLayout, PageTitle } from '@/styles/table.styles';
import React from 'react';

const volunteer = () => {
  return (
    <PageLayout>
      <PageTitle>Volunteer Management</PageTitle>
      <VolunteerTable />
    </PageLayout>
  );
};

export default volunteer;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
