import React from 'react';

const program = () => {
  return <div>program</div>;
};

export default program;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
