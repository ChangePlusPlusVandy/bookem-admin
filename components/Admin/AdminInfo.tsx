import {
  AboutBox,
  BoldText,
  FirstandLast,
  Title,
} from '@/styles/components/Admin/adminInfo.styles';
import React, { useState } from 'react';
import CheckCircle from './CheckCircle';

const CategoryandData = (props: { category: string; data: string }) => {
  return (
    <div>
      <BoldText>{props.category}</BoldText>
      <p>{props.data}</p>
    </div>
  );
};

const AdminInfo = () => {
  const [firstName, setFirstName] = useState('Melissa');
  const [lastName, setLastName] = useState('Spradlin');
  const [email, setEmail] = useState('melissa@bookem.org');
  const [phone, setPhone] = useState('1234567899');
  const [role, setRole] = useState('Executive Director');

  // TODO get current admin data from database

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <AboutBox>
      <Title>Your Account</Title>
      <FirstandLast>
        <BoldText>First Name</BoldText>
        <BoldText>Last Name</BoldText>
      </FirstandLast>
      <FirstandLast>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={ev => setFirstName(ev.target.value)}
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={ev => setLastName(ev.target.value)}
        />
      </FirstandLast>
      <div>
        <BoldText>Email</BoldText>
        <input
          type="text"
          name="email"
          value={email}
          onChange={ev => setEmail(ev.target.value)}
        />
      </div>
      <div>
        <BoldText>Phone</BoldText>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={ev => setPhone(ev.target.value)}
        />
      </div>
      <div>
        <BoldText>Role</BoldText>
        <input
          type="text"
          name="role"
          value={role}
          onChange={ev => setRole(ev.target.value)}
        />
      </div>

      <div onClick={handleClick}>
        <CheckCircle></CheckCircle>
      </div>
    </AboutBox>
  );
};

export default AdminInfo;
