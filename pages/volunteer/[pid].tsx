import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  QueriedUserData,
  QueriedVolunteerLogData,
} from 'bookem-shared/src/types/database';
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import { setEnvironmentData } from 'worker_threads';

const Header = styled.div`
  padding: 60px;
  font-size: 30px;
  height: 9vh;
  margin-bottom: 1vh;
  align-items: center;
`;

const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0px;
  position: sticky;
  justify-self: flex-start;
  background-color: gray;
  height: 40px;
  padding: 2px;
  border-radius: 20px;
  padding: auto;
  color: white;
  z-index: 5;
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
  font-size: 20px;
`;

const ProgramNotes = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow-y: hidden;
  border-radius: 20px;
  width: 30%;
`;

const StackedBoxes = styled.div`
  height: 48%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: solid black 1px;
  border-radius: 20px;
  padding: 20px;
  width: 100%;
`;
const Section = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: solid black 1px;
  overflow-y: auto;
  border-radius: 20px;
  width: 25%;
  border-top: none;
`;

const IndividualHours = styled.div`
  border-bottom: solid black 1px;
  width: 100%;
  padding: 20px;
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

  return (
    <Container>
      {userInfoLoaded && <Header>{userInfo.name}</Header>}
      <Body>
        {userInfoLoaded && (
          <Section>
            <SectionHeader> General Info </SectionHeader>
            <Info>{userInfo.email}</Info>
            <Info>{userInfo.phone}</Info>
            <Info>{userInfo.address}</Info>
            <Info>{userInfo.ethnicity}</Info>
            <Info>{userInfo.gender}</Info>
            <Info>{userInfo.sourceHeardFrom}</Info>
          </Section>
        )}
        {loggedHoursLoaded && (
          <Section>
            <SectionHeader> Log Hour History </SectionHeader>
            {loggedHours.map(data => (
              // eslint-disable-next-line react/jsx-key
              <IndividualHours>
                {'School: ' + data.school}
                <br></br>
                {'Hours: ' + data.hours}
                <br></br>
                {'Date: ' + data.date}
              </IndividualHours>
            ))}
          </Section>
        )}
        <ProgramNotes>
          <StackedBoxes></StackedBoxes>
          <StackedBoxes></StackedBoxes>
        </ProgramNotes>
      </Body>
    </Container>
  );
}

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
