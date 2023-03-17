import Event from '@/components/Event/Event';
import { QueriedVolunteerProgramData } from 'bookem-shared/src/types/database';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * Event Detail Page
 * @returns
 */
const EventDetail = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [event, setEvent] = useState<QueriedVolunteerProgramData>();
  const [error, setError] = useState<Error>();

  // use simple fetch to fetch when component is mounted
  useEffect(() => {
    if (pid) {
      fetch('/api/event/' + pid)
        .then(res => {
          if (!res.ok) {
            throw new Error(
              'An error has occurred while fetching: ' + res.statusText
            );
          }
          return res.json();
        })
        .then(data => setEvent(data))
        .catch(err => setError(err));
    } else setError(new Error('No pid found'));
  }, []);

  return (
    <>
      {/* TODO: render 404 page */}
      {error && <>404 Event not found!</>}
      {!event && !error && <div>Loading...</div>}
      {event && <Event event={event} />}
    </>
  );
};

export default EventDetail;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
