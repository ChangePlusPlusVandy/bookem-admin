// FeaturedEvents.tsx
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EventCard = React.lazy(() => import('@/components/shared/EventCard')); // Lazy loading the EventCard
import { QueriedVolunteerEventData } from 'bookem-shared/src/types/database';
import { fetchData } from '@/utils/utils';

import {
  FeaturedEventsContainer,
  EventsScrollContainer,
  Header,
  Events,
} from '@/styles/components/featuredEvents.styles'; // Assume you have similar styles to upcomingEvents.styles

// Vertical list of sample FeaturedEvents
const FeaturedEvents = () => {
  const [events, setEvents] = useState<QueriedVolunteerEventData[]>();
  const [error, setError] = useState<Error>();
  const router = useRouter();

  // Fetch featured events when rendered
  useEffect(() => {
    fetchData('/api/events/featured')
      .then(data => setEvents(data))
      .catch(err => setError(err));
  }, []);

  return (
    <>
      {error && <div>404 Event not found!</div>}
      {!events && !error && <div>Loading...</div>}
      {events && (
        <div style={{ marginTop: '50px' }}>
          <Header>Bookmarked events</Header>
          <FeaturedEventsContainer>
            
            <EventsScrollContainer>
              <Suspense fallback={<Header>Please Wait...</Header>}>
                {events.map(event => (
                  <EventCard
                    key={event._id.toString()}
                    eventData={event}
                    size={'small'}
                    href={'/event/' + event._id}
                  />
                ))}
              </Suspense>
              <button onClick={() => router.push('/events/featured')}>Show More</button>
            </EventsScrollContainer>
          </FeaturedEventsContainer>
        </div>
      )}
    </>
  );
};

export default FeaturedEvents;