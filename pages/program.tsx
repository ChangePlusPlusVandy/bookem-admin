import EventTable from '@/components/table/event-table/EventTable';
import { PageTitle, PageLayout } from '@/styles/table.styles';
import React from 'react';

const program = () => {
  return (
    <PageLayout>
      <PageTitle>Program Management</PageTitle>
      <EventTable />
    </PageLayout>
  );
};

export default program;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
