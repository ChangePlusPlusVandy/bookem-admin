import EventTable from '@/components/table/event-table/EventTable';
import { PageTitle, PageLayout } from '@/styles/table.styles';
import React from 'react';

const event = () => {
  return (
    <PageLayout>
      <PageTitle>Event Management</PageTitle>
      <EventTable />
    </PageLayout>
  );
};

export default event;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
