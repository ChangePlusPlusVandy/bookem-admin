import React from 'react';
import { signOut } from 'next-auth/react';
import styled from 'styled-components';
import { PageLayout, PageTitle } from '@/styles/table.styles';
import { Admin } from 'mongodb';
import AdminTable from '@/components/table/AdminTable';

const MainContainer = styled.div`
  width: 100%;
  display: flex;
`;

const settings = () => {
  return (
    <PageLayout>
      <PageTitle>Admin Management and Settings</PageTitle>
      <AdminTable />
    </PageLayout>
    /* <div>You have signed in</div>
      <button onClick={() => signOut()}>Sign out</button> */
  );
};

export default settings;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
