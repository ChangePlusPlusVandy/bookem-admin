import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { QueriedVolunteerApplicationData } from 'bookem-shared/src/types/database';
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
  margin-left: auto;
  font-size: 15px;
  width: 40%;
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

const ApprovalForm = styled.form``;

const StatusContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
`;

const StatusPrompt = styled.label``;
const StatusOptions = styled.select``;

const Option = styled.option``;

const UserApplication = ({ application }: { application: any }) => {
  const [eventLoaded, setEventLoaded] = useState(false);
  const [event, setEvent] = useState<QueriedVolunteerEventData>();
  const [approvalStatus, setApprovalStatus] = useState('pending');

  const [dropdownOpen, setDropdownOpen] = useState(false);
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
      // console.log("I'm here!");
      await fetch(path, {
        method: 'POST',
        body: JSON.stringify(approveObject),
      });
      setApprovalStatus('rejected');
    } catch (err) {
      console.log(err);
    }
  }

  async function handlePendingApplication() {
    try {
      const approveObject = { updatedStatus: 'pending', id: application._id };
      const path = '/api/applications/updateStatus';
      await fetch(path, {
        method: 'POST',
        body: JSON.stringify(approveObject),
      });
      setApprovalStatus('pending');
    } catch (err) {
      console.log(err);
    }
  }

  function handleInputChange(e: any) {
    console.log(e.target.value);
    if (e.target.value === 'approved') {
      handleApproveApplication();
    } else if (e.target.value === 'rejected') {
      handleRejectApplication();
    } else {
      handlePendingApplication();
    }
  }

  return (
    <Container>
      <Title>Application for {event?.name}</Title>
      <StatusContainer>
        <StatusPrompt>Status: </StatusPrompt>
        <StatusOptions onChange={handleInputChange} value={approvalStatus}>
          <Option value="approved">approved</Option>
          <Option value="rejected">rejected</Option>
          <Option value="pending">pending</Option>
        </StatusOptions>
      </StatusContainer>
      {/* {application?.formData.map((item: any) => (
        <ItemContainer key={item.question}>
          <Question>{item.question}</Question>
          <Response>{item.answer}</Response>
        </ItemContainer>
      ))} */}
    </Container>
  );
};

export default UserApplication;
