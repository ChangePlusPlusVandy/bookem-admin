// import Event from '@/components/Event/Event';
import EventTable from '@/components/table/event-table/EventTable';
import ProgramEventTableImpl from '@/components/table/event-table/ProgramEventTableImpl';
import { PageTitle, PageLayout } from '@/styles/table.styles';
import { QueriedVolunteerEventData } from 'bookem-shared/src/types/database';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * Event Detail Page
 * @returns
 */
const ProgramEventDetail = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [events, setEvents] = useState<QueriedVolunteerEventData>();
  const [error, setError] = useState<Error>();
  const [programName, setProgramName] = useState<string>('');

  // use simple fetch to fetch when component is mounted
  useEffect(() => {
    if (pid) {
      fetch('/api/events/program/' + pid)
        .then(res => {
          if (!res.ok) {
            throw new Error(
              'An error has occurred while fetching: ' + res.statusText
            );
          }
          return res.json();
        })
        .then(data => setEvents(data))
        .catch(err => setError(err));

      fetch('/api/program/' + pid)
        .then(res => {
          if (!res.ok) {
            throw new Error(
              'An error has occurred while fetching: ' + res.statusText
            );
          }
          return res.json();
        })
        .then(data => setProgramName(data.name))
        .catch(err => setError(err));
    } else setError(new Error('No pid found'));
  }, [programName, pid]);

  return (
    <>
      {/* TODO: render 404 page */}
      {error && <>404 Events not found!</>}
      {!events && !error && <div>Loading...</div>}
      {events && (
        <>
          <PageLayout>
            <PageTitle>Events for {programName}</PageTitle>
            <EventTable programId={pid as string} programname={events.name} />
          </PageLayout>
        </>
      )}
    </>
  );
};

export default ProgramEventDetail;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
