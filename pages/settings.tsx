import React from 'react';
import { signOut } from 'next-auth/react';
import styled from 'styled-components';
import { PageLayout, PageTitle } from '@/styles/table.styles';
import AdminTable from '@/components/Table/AdminTable/AdminTable';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const MainContainer = styled.div`
  width: 100%;
  display: flex;
`;

const settings = () => {
  return (
    <PageLayout>
      <PageTitle>Admin Management and Settings</PageTitle>
      <AdminTable />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Button
          icon={<LogoutOutlined rev={undefined} />}
          onClick={() => signOut()}
          style={{
            width: 200,
            marginLeft: 90,
            backgroundColor: 'darkgray',
            color: 'whitesmoke',
          }}>
          Log Out
        </Button>
      </div>
    </PageLayout>
  );
};

export default settings;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
