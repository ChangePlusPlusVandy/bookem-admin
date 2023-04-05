import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  QueriedVolunteerApplicationData,
  VolunteerApplicationData,
} from 'bookem-shared/src/types/database';
import { QueriedVolunteerEventData } from 'bookem-shared/src/types/database';

const Container = styled.div`
  width: 100%;
  padding: 30px 50px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: top;
  overflow-y: auto;
`;

const Title = styled.p`
  font-weight: bold;
  margin: 0px auto;
  font-size: 20px;
`;
const Status = styled.p`
  margin: 0px auto;
  font-size: 15px;
`;

const Question = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin: 0px;
`;

const Response = styled.p`
  font-size: 15px;
  margin: 0px;
`;

const ItemContainer = styled.div``;
const UserApplication = ({
  application,
}: {
  application: VolunteerApplicationData;
}) => {
  const [eventLoaded, setEventLoaded] = useState(false);
  const [event, setEvent] = useState<QueriedVolunteerEventData>();

  async function getEvent() {
    try {
      const path = '/api/event/' + application.eventId;
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
    if (application) {
      getEvent();
    }
  }, [application]);

  return (
    <Container>
      <Title>Application for {event?.name}</Title>
      <Status>Status: {application.status}</Status>
      {application.formData.map((item: any) => (
        <ItemContainer key={item.question}>
          <Question>{item.question}</Question>
          <Response>{item.answer}</Response>
        </ItemContainer>
      ))}
    </Container>
  );
};

export default UserApplication;
