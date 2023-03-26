import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  QueriedUserData,
  QueriedVolunteerLogData,
  VolunteerLogData,
} from 'bookem-shared/src/types/database';
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import { setEnvironmentData } from 'worker_threads';

const Header = styled.div`
  width: 100%;
  padding: 60px;
  height: 9vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1vh;
  align-items: center;
`;

const HeaderText = styled.p`
  font-size: 30px;
`;

const Export = styled.button`
  border: none;
  height: 40px;
  width: 150px;
  border-radius: 10px;
  &:hover {
    background-color: gray;
  }
`;
const GeneralSection = styled.div`
  margin-left: 20px;
`;

const GeneralSectionHeader = styled.p`
  font-weight: bold;
  font-size: 18px;
`;

const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
  top: 0px;
  position: sticky;
  justify-self: flex-start;
  background-color: #e3e3e3;
  height: 40px;
  border-radius: 10px 0px 0px;
  z-index: 1;
`;

const SectionFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: none;
  bottom: 0px;
  position: sticky;
  justify-self: flex-start;
  background-color: #e3e3e3;
  height: 25px;
  font-size: 15px;
  padding: 0px 15px;
  border-radius: 0px 0px 10px;
  z-index: 1;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const Body = styled.div`
  display: flex;
  height: 80vh;
  width: 100%;
  gap: 30px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Info = styled.p`
  margin: 0 auto;
  font-size: 18px;
`;

const ProgramNotes = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow-y: hidden;
  border-radius: 10px;
  width: 30%;
`;

const StackedBoxes = styled.div`
  height: 48%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  border: solid #e3e3e3 1px;
  border-radius: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
`;
const Section = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: solid #e3e3e3 1px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 10px;
  width: 25%;
  border-top: none;
`;

const IndividualHours = styled.div`
  border-bottom: solid #e3e3e3 1px;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 18px;
  gap: 10px;
  padding: 20px 40px;
`;

const EventTitle = styled.p`
  margin: 0px;
  font-size: 18px;
  font-weight: bold;
`;
const Application = styled.div``;
const RifNotes = styled.div``;

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
    sourceHeardFrom: 'source',
    ethnicity: 'ethnicity',
    gender: 'gender',
    backgroundCheck: {
      passed: true,
      expirationDate: new Date(),
    },
    userType: 'type',
    programs: [new mongoose.Types.ObjectId()],
    tags: [],
    _id: new mongoose.Types.ObjectId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [loggedHoursLoaded, setLoggedHoursLoaded] = useState(false);

  const [loggedHours, setLoggedHours] = useState<QueriedVolunteerLogData[]>([]);

  const getUser = async () => {
    try {
      const path = '/api/volunteer/' + pid;
      const res = await fetch(path, {
        method: 'GET',
      });
      const data = await res.json();
      console.log('Data here: ', data);
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
      console.log('Data here: ', data);
      setLoggedHoursLoaded(true);
      setLoggedHours(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (pid) {
      getUser();
      getVolunteerLogs();
    }
  }, [pid]);

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
      {userInfoLoaded && (
        <Header>
          <HeaderText>{userInfo.name}</HeaderText> <Export>Export</Export>
        </Header>
      )}
      <Body>
        {userInfoLoaded && (
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
        {loggedHoursLoaded && (
          <Section>
            <SectionHeader> Log Hour History </SectionHeader>
            {loggedHours.map(data => (
              // eslint-disable-next-line react/jsx-key
              <IndividualHours>
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
        <ProgramNotes>
          <StackedBoxes>
            <SectionHeader></SectionHeader>
          </StackedBoxes>
          <StackedBoxes>
            <SectionHeader></SectionHeader>
          </StackedBoxes>
        </ProgramNotes>
      </Body>
    </Container>
  );
}

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
