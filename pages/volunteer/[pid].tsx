import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QueriedUserData } from 'bookem-shared/src/types/database';
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import { setEnvironmentData } from 'worker_threads';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Info = styled.p`
  margin: 0 auto;
  font-size: 20px;
`;
const GeneralInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-bottom: solid black 1px;
`;
const LoggedHours = styled.div``;
const Application = styled.div``;
const RifNotes = styled.div``;

export default function Volunteer() {
  const router = useRouter();
  const { pid } = router.query;

  const [isLoaded, setIsLoaded] = useState(false);
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

  const getUser = async () => {
    try {
      const path = '/api/volunteer/' + pid;
      const res = await fetch(path, {
        method: 'GET',
      });
      const data = await res.json();
      console.log('Data here: ', data);
      setIsLoaded(true);
      setUserInfo(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (pid) {
      getUser();
    }
  }, [pid]);

  return (
    <>
      {isLoaded && (
        <Container>
          <GeneralInformation>
            <Info>{userInfo.name}</Info>
            <Info>{userInfo.email}</Info>
            <Info>{userInfo.phone}</Info>
            <Info>{userInfo.address}</Info>
            <Info>{userInfo.ethnicity}</Info>
            <Info>{userInfo.gender}</Info>
            <Info>{userInfo.sourceHeardFrom}</Info>
          </GeneralInformation>
        </Container>
      )}
    </>
  );
}
