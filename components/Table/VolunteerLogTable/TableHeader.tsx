import {
  HeaderContainer,
  SelectContainer,
} from '@/styles/components/Table/VolunteerLogTable.styles';
import { Button, Select } from 'antd';
import { VolunteerLogStatus } from 'bookem-shared/src/types/database';
import React, { useEffect, useState } from 'react';

const TableHeader = ({
  handleSelectStatus,
}: {
  handleSelectStatus: (value: string) => void;
}) => {
  const [statusOptions, setStatusOptions] = useState<any[]>([]);
  useEffect(() => {
    setStatusOptions(
      Object.values(VolunteerLogStatus).map(value => ({ value, label: value }))
    );
  }, []);

  return (
    <>
      <HeaderContainer>
        <SelectContainer>
          <span style={{ whiteSpace: 'nowrap' }}>Choose status: </span>
          <Select
            defaultValue="pending"
            style={{ width: 120 }}
            onChange={handleSelectStatus}
            options={statusOptions}
          />
        </SelectContainer>
        <Button style={{ marginRight: '30px' }}>Approve</Button>
        <Button danger>Reject</Button>
      </HeaderContainer>
    </>
  );
};

export default TableHeader;
