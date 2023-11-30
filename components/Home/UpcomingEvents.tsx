import React, { Suspense, useEffect, useState } from 'react';

const EventCard = React.lazy(() => import('@/components/shared/EventCard')); // implement lazy loading
import { QueriedVolunteerEventData } from 'bookem-shared/src/types/database';
import { fetchData } from '@/utils/utils';

import {
  EventsContainer,
  Header,
  Events,
} from '@/styles/components/upcomingEvents.styles';
import { useRouter } from 'next/router';

// vertical list of sample PastEvents
const UpcomingEvents = ({}: any) => {
  const [events, setEvents] = useState<QueriedVolunteerEventData[]>();
  const [error, setError] = useState<Error>();
  const router = useRouter();
  // Fetch upcoming events when rendered
  useEffect(() => {
    fetchData('/api/events/upcoming')
      .then(data => setEvents(data))
      .catch(err => setError(err));
  }, []);
  return (
    <>
      {/* TODO: render 404 page */}
      {error && <>404 Event not found!</>}
      {!events && !error && <div>Loading...</div>}
      {events && (
        <EventsContainer>
          <Header>Upcoming events</Header>
          <Events>
            {/* if PastEvents aren't loading in yet, component will display "Please Wait..." */}
            <Suspense fallback={<Header>Please Wait...</Header>}>
              {events.map(event => (
                // Iterate through events to and pass data to EventCard
                <EventCard
                  key={event._id.toString()}
                  eventData={event}
                  size={'small'}
                  href={'/event/' + event._id}
                />
              ))}
            </Suspense>
          </Events>
          <button onClick={() => router.push('/program')}>Show More</button>
        </EventsContainer>
      )}
    </>
  );
};

export default UpcomingEvents;
