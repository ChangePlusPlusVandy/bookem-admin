import VolunteerLogTable from '@/components/Table/VolunteerLogTable/VolunteerLogTable';
import { PageLayout, PageTitle } from '@/styles/table.styles';
import React from 'react';

const Logs = () => {
  return (
    <>
      <PageLayout>
        <PageTitle>Volunteer Log Table</PageTitle>
        <VolunteerLogTable />
      </PageLayout>
    </>
  );
};

export default Logs;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
