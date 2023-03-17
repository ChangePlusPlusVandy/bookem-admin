import React from 'react';

const settings = () => {
  return <div>settings</div>;
};

export default settings;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
