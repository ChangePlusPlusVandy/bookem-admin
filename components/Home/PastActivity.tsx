import React, { Suspense } from 'react';
import styled from 'styled-components';
import { dummyEventData } from '@/components/Home/UpcomingEvents';
const EventCard = React.lazy(() => import('@/components/EventCard'));

// vertical list of sample past events (another component)

const Container = styled.div`
  background-color: #d9d9d9;
  width: 24vw;
  height: 100vh;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: space-evenly;

  ul {
    padding: 0;
  }
`;

const Header = styled.p`
  font-size: 25px;
  margin-top: 50px;
  text-align: center;
  font-weight: 400;
`;

const PastActivity = () => {
  return (
    <Container>
      <Header>Past activity</Header>
      <ul>
        <Suspense fallback={<Header>Please Wait...</Header>}>
          <EventCard eventData={dummyEventData} size="small" />
          <EventCard eventData={dummyEventData} size="small" />
          <EventCard eventData={dummyEventData} size="small" />
          <EventCard eventData={dummyEventData} size="small" />
          <EventCard eventData={dummyEventData} size="small" />
          <EventCard eventData={dummyEventData} size="small" />
        </Suspense>
      </ul>
    </Container>
  );
};

export default PastActivity;
