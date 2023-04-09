import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { QueriedVolunteerApplicationData } from 'bookem-shared/src/types/database';
import { QueriedVolunteerEventData } from 'bookem-shared/src/types/database';
import {
  ApproveButton,
  ApproveText,
  Container,
  ItemContainer,
  PendingContainer,
  Question,
  Response,
  Status,
  Title,
} from '@/styles/components/Application/application.styles';

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
