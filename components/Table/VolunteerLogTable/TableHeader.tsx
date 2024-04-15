import {
  HeaderContainer,
  SelectContainer,
} from '@/styles/components/Table/VolunteerLogTable.styles';
import { Button, Popconfirm, Select } from 'antd';
import { VolunteerLogStatus } from 'bookem-shared/src/types/database';
import React, { useContext, useEffect, useState } from 'react';
import { VolunteerLogTableContext } from './VolunteerLogTable';

const TableHeader = ({
  handleSelectStatus,
}: {
  handleSelectStatus: (value: string) => void;
}) => {
  const { rowSelection, errorMessage, successMessage } = useContext(
    VolunteerLogTableContext
  );

  const [statusOptions, setStatusOptions] = useState<any[]>([]);

  useEffect(() => {
    setStatusOptions(
      Object.values(VolunteerLogStatus).map(value => ({ value, label: value }))
    );
  }, []);

  const handleApprove = () => {
    if (rowSelection.selectedRowKeys.length === 0) {
      errorMessage('No rows selected');
      return;
    }
  };

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

        <Popconfirm
          title="Approve the hours"
          description="Are you sure to approve the selected hours"
          onConfirm={handleApprove}
          okText="Yes"
          cancelText="No">
          {rowSelection.selectedRowKeys.length === 0 ? (
            <Button disabled style={{ marginRight: '30px' }}>
              Approve
            </Button>
          ) : (
            <Button style={{ marginRight: '30px' }}>Approve</Button>
          )}
        </Popconfirm>

        <Popconfirm
          title="Reject the hours"
          description="Are you sure to reject the selected hours"
          onConfirm={handleApprove}
          okText="Yes"
          cancelText="No">
          {rowSelection.selectedRowKeys.length === 0 ? (
            <Button disabled danger>
              Reject
            </Button>
          ) : (
            <Button danger>Reject</Button>
          )}
        </Popconfirm>
      </HeaderContainer>
    </>
  );
};

export default TableHeader;
