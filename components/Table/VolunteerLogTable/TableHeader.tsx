import { HeaderContainer } from '@/styles/components/Table/VolunteerLogTable.styles';
import { Button, Select } from 'antd';
import React from 'react';

const TableHeader = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <HeaderContainer>
        <Select
          defaultValue="lucy"
          style={{ width: 120, marginRight: '30px' }}
          onChange={handleChange}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
        <Button style={{ marginRight: '30px' }}>Approve</Button>
        <Button danger>Reject</Button>
      </HeaderContainer>
    </>
  );
};

export default TableHeader;
