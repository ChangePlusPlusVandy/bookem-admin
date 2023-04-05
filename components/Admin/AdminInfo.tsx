import {
    AboutBox,
  BoldText,
  FirstandLast,
  Title,
} from '@/styles/components/Admin/adminInfo.styles';
import React from 'react';

const CategoryandData = (props: { category: string; data: string }) => {
  return (
    <div>
      <BoldText>{props.category}</BoldText>
      <p>{props.data}</p>
    </div>
  );
};

const AdminInfo = () => {

    // get current admin data from database


  return (
    <AboutBox>
      <Title>Your Account</Title>
      <FirstandLast>
        <BoldText>First Name</BoldText>
        <BoldText>Last Name</BoldText>
      </FirstandLast>
      <FirstandLast>
        <p>Melissa</p>
        <p>Spradlin</p>
      </FirstandLast>
      <CategoryandData category="Email" data="me@me.com" />
      <CategoryandData category="Phone" data="(805) 657-0708" />
      <CategoryandData category="Role" data="Executive Director" />
    </AboutBox>
  );
};

export default AdminInfo;
