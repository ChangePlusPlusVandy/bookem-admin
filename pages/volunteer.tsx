import React from 'react';

const volunteer = () => {
  return <div>volunteer</div>;
};

export default volunteer;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
