import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { QueriedVolunteerApplicationData } from 'bookem-shared/src/types/database';
import { QueriedVolunteerEventData } from 'bookem-shared/src/types/database';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextItem = styled.p`
  margin-left: auto;
  margin-right: auto;
`;
export default function UserApplication(
  props: QueriedVolunteerApplicationData
) {
  const [eventLoaded, setEventLoaded] = useState(false);
  const [event, setEvent] = useState<QueriedVolunteerEventData>();

  async function getEvent() {
    try {
      const path = '/api/event/' + props.eventId;
      const res = await fetch(path, {
        method: 'GET',
      });
      const data = await res.json();
      setEventLoaded(true);
      setEvent(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (props) {
      getEvent();
    }
  }, [props]);

  return (
    <Container>
      <TextItem>Application for {event?.name}</TextItem>
      <TextItem>Application: {props.formData}</TextItem>
      <TextItem>Status: {props.status}</TextItem>
    </Container>
  );
}
