import VolunteerTable from '@/components/table/volunteer-table/VolunteerTable';
import EventTable from '@/components/table/event-table/EventTable';
import { PageLayout, PageTitle } from '@/styles/table.styles';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { QueriedVolunteerEventDTO } from 'bookem-shared/src/types/database';
import useSWR from 'swr';
import { fetcher } from '@/utils/utils';

const UsersInEvent = () => {
  const router = useRouter();
  const { pid } = router.query;

  const {
    data: event,
    error,
    isLoading,
    mutate,
  } = useSWR<QueriedVolunteerEventDTO>('/api/event/' + pid, fetcher, {
    onSuccess: data => {
      setEventName(data.name);
    },
  });
  // Refetch data when data is updated
  useEffect(() => {
    mutate();
  }, [mutate, event]);

  const [eventName, setEventName] = useState<string>('');

  // check for errors and loading
  if (error) return <div>Failed to load event table</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <PageLayout>
      <PageTitle>Volunteer in {eventName} </PageTitle>
      <VolunteerTable eventId={pid as string} />
    </PageLayout>
  );
};

export default UsersInEvent;
export { getServerSideProps } from '@/lib/getServerSideProps';
