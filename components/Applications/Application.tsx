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

const PendingContainer = styled.div`
  width: 50%;
  min-width: 150px;
  margin: 0px auto;
  border: black 1px solid;
  border-radius: 10px;
  height: 50px;
  flex: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ApproveText = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin: auto;
`;
const ApproveButton = styled.button`
  height: 35px;
  width: 35px;
  border-radius: 100%;
  flex: none;
  border: none;
  margin: auto;
`;

const UserApplication = ({
  application,
}: {
  application: QueriedVolunteerApplicationData;
}) => {
  const [eventLoaded, setEventLoaded] = useState(false);
  const [event, setEvent] = useState<QueriedVolunteerEventData>();
  const [approvalStatus, setApprovalStatus] = useState('pending');

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
      setApprovalStatus(application.status);
    }
  }, [application]);

  async function handleApproveApplication() {
    try {
      const approveObject = { updatedStatus: 'approved', id: application._id };
      const path = '/api/applications/updateStatus';
      await fetch(path, {
        method: 'POST',
        body: JSON.stringify(approveObject),
      });
      setApprovalStatus('approved');
    } catch (err) {
      console.log(err);
    }
  }
  async function handleRejectApplication() {
    try {
      const approveObject = { updatedStatus: 'rejected', id: application._id };
      const path = '/api/applications/updateStatus';
      await fetch(path, {
        method: 'POST',
        body: JSON.stringify(approveObject),
      });
      setApprovalStatus('rejected');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <Title>Application for {event?.name}</Title>
      {approvalStatus !== 'pending' && (
        <Status>Status: {approvalStatus}</Status>
      )}
      {approvalStatus === 'pending' && (
        <PendingContainer>
          <ApproveText>Approve?</ApproveText>
          <ApproveButton onClick={handleApproveApplication}></ApproveButton>
          <ApproveButton onClick={handleRejectApplication}>X</ApproveButton>
        </PendingContainer>
      )}
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
