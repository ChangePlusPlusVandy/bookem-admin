import React from 'react';
import { signOut } from 'next-auth/react';
import styled from 'styled-components';

const MainContainer = styled.div`
  width: 100%;
  display: flex;
`;

const settings = () => {
  return (
    <MainContainer>
      <div>You have signed in</div>
      <button onClick={() => signOut()}>Sign out</button>
    </MainContainer>
  );
};

export default settings;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
