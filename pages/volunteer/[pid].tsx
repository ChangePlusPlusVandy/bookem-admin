import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  QueriedUserData,
  QueriedVolunteerLogData,
  QueriedVolunteerApplicationData,
  ApplicationStatus,
} from 'bookem-shared/src/types/database';
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import UserApplication from '@/components/Application/Application';
import {
  ApplicationContainer,
  BackButton,
  Body,
  Container,
  EventTitle,
  Export,
  ForwardButton,
  GeneralSection,
  GeneralSectionHeader,
  Header,
  HeaderText,
  IndividualHours,
  Info,
  NotesContainer,
  RightContainer,
  Section,
  SectionFooter,
  SectionHeader,
} from '@/styles/volunteer/pid.styles';

export default function Volunteer() {
  const router = useRouter();
  const { pid } = router.query;

  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState<QueriedUserData>({
    name: 'name',
    email: 'email',
    password: 'password',
    phone: 'phone',
    address: 'address',
    birthday: new Date().toDateString(),
    emergencyName: 'emergencyName',
    emergencyPhone: 'emergencyPhone',
    emergencyRelationship: 'emergencyRelationship',
    members: [],
    volunteerReason: 'volunteerReason',
    occupation: 'occupation',
    occupationTitle: 'occupationTitle',
    occupationOrg: 'occupationOrg',
    joinNewsletter: true,
    sourceHeardFrom: 'source',
    ethnicity: 'ethnicity',
    gender: 'gender',
    backgroundCheck: {
      passed: true,
      expirationDate: new Date(),
    },
    events: [],
    _id: new mongoose.Types.ObjectId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [curApplicationIndex, setCurApplicationIndex] = useState(0);
  const [loggedHoursLoaded, setLoggedHoursLoaded] = useState(false);
  const [loggedHours, setLoggedHours] = useState<QueriedVolunteerLogData[]>([]);
  const [userFound, setUserFound] = useState(false);
  const [userApplications, setUserApplications] = useState<
    QueriedVolunteerApplicationData[]
  >([
    {
      _id: new mongoose.Types.ObjectId(),
      userId: new mongoose.Types.ObjectId(),
      formData: [],
      eventId: new mongoose.Types.ObjectId(),
      status: ApplicationStatus.Pending,
      createdAt: new Date(),
    },
  ]);
  const [applicationsLoaded, setApplicationsLoaded] = useState(false);

  const getUser = async () => {
    try {
      const path = '/api/volunteer/' + pid;
      const res = await fetch(path, {
        method: 'GET',
      });
      const data = await res.json();
      setUserInfoLoaded(true);
      setUserInfo(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getVolunteerLogs = async () => {
    try {
      const path = '/api/volunteerLogs/' + pid;
      const res = await fetch(path, {
        method: 'GET',
      });
      const data = await res.json();
      setLoggedHoursLoaded(true);
      console.log('data here', data);
      if (!data.error) {
        setLoggedHours(data);
        setUserFound(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getApplications = async () => {
    try {
      const path = '/api/applications/' + pid;
      const res = await fetch(path, {
        method: 'GET',
      });
      const data = await res.json();
      console.log(data);
      setUserApplications(data);
      setApplicationsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (pid) {
      getUser();
      getVolunteerLogs();
      getApplications();
    }
  }, [pid]);

  function goForward() {
    if (curApplicationIndex == userApplications.length - 1) {
      setCurApplicationIndex(0);
    } else {
      setCurApplicationIndex(curApplicationIndex + 1);
    }
  }

  function goBackward() {
    if (curApplicationIndex == 0) {
      setCurApplicationIndex(userApplications.length - 1);
    } else {
      setCurApplicationIndex(curApplicationIndex - 1);
    }
  }
  function convertToDate(date: Date) {
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
  }

  function totalHours(data: Array<QueriedVolunteerLogData>) {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].hours;
    }
    return total;
  }

  function totalBooks(data: Array<QueriedVolunteerLogData>) {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].numBooks ?? 0;
    }
    return total;
  }

  return (
    <Container>
      {!userFound && <Header>User Not Found</Header>}
      {userInfoLoaded && userFound && (
        <Header>
          <HeaderText>{userInfo.name}</HeaderText> <Export>Export</Export>
        </Header>
      )}
      <Body>
        {userInfoLoaded && userFound && (
          <Section>
            <SectionHeader> General Info </SectionHeader>
            <GeneralSection>
              <GeneralSectionHeader>Contact</GeneralSectionHeader>
              <Info>{userInfo.email}</Info>
              <Info>{userInfo.phone}</Info>
            </GeneralSection>
            <GeneralSection>
              <GeneralSectionHeader>Ethnicity</GeneralSectionHeader>
              <Info>{userInfo.ethnicity}</Info>
            </GeneralSection>
            <GeneralSection>
              <GeneralSectionHeader>Gender</GeneralSectionHeader>
              <Info>{userInfo.gender}</Info>
            </GeneralSection>
            <GeneralSection>
              <GeneralSectionHeader>Address</GeneralSectionHeader>
              <Info>{userInfo.address}</Info>
            </GeneralSection>
            <GeneralSection>
              <GeneralSectionHeader>Source</GeneralSectionHeader>
              <Info>{userInfo.sourceHeardFrom}</Info>
            </GeneralSection>
          </Section>
        )}
        {loggedHoursLoaded && userFound && (
          <Section>
            <SectionHeader> Log Hour History </SectionHeader>
            {loggedHours.map(data => (
              <IndividualHours key={data._id.toString()}>
                <EventTitle>{data.school}</EventTitle>
                {'Hours: ' + data.hours}
                <br></br>
                {'Date: ' + convertToDate(new Date(data.date))}
                <br></br>
                {'Books Distributed: ' + data.numBooks}
              </IndividualHours>
            ))}
            <SectionFooter>
              <div>Total Hours: {totalHours(loggedHours)} </div>
              <div>Total Books: {totalBooks(loggedHours)}</div>
            </SectionFooter>
          </Section>
        )}
        {applicationsLoaded && userFound && (
          <RightContainer>
            <ApplicationContainer>
              <SectionHeader>Applications</SectionHeader>
              <UserApplication
                application={
                  userApplications[curApplicationIndex]
                }></UserApplication>
              <BackButton onClick={goBackward}></BackButton>
              <ForwardButton onClick={goForward}></ForwardButton>
            </ApplicationContainer>
            <NotesContainer>
              <SectionHeader>RIF Notes</SectionHeader>
            </NotesContainer>
          </RightContainer>
        )}
      </Body>
    </Container>
  );
}

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
