import VolunteerTable from '@/components/table/VolunteerTable';
import EventTable from '@/components/table/event-table/EventTable';
import { PageLayout, PageTitle } from '@/styles/table.styles';
import { useRouter } from 'next/router';
import React from 'react';

const UsersInEvent = () => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <PageLayout>
      <PageTitle>Volunteer in event </PageTitle>
      <VolunteerTable eventId={pid as string} />
    </PageLayout>
  );
};

export default UsersInEvent;
export { getServerSideProps } from '@/lib/getServerSideProps';
