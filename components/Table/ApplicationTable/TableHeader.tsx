import {
  HeaderContainer,
  SelectContainer,
} from '@/styles/components/Table/VolunteerLogTable.styles';
import { Button, Popconfirm, Select } from 'antd';
import { VolunteerLogStatus } from 'bookem-shared/src/types/database';
import React, { useContext, useEffect, useState } from 'react';
import { ApplicationTableContext } from './ApplicationTable';
import { error } from 'console';

const TableHeader = ({
  handleSelectStatus,
  mutate,
  status,
}: {
  handleSelectStatus: (value: string) => void;
  mutate: () => void;
  status: string;
}) => {
  const { rowSelection, errorMessage, successMessage } = useContext(
    ApplicationTableContext
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

    fetch('/api/volunteer-logs/approved', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rowSelection.selectedRowKeys),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to approve hours');
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'error') {
          errorMessage(data.message);
        } else {
          successMessage(data.message);
        }
      })
      .then(() => mutate())
      .catch(err => {
        errorMessage('Sorry an error occurred');
        console.error(err);
      });
  };

  const handleReject = () => {
    if (rowSelection.selectedRowKeys.length === 0) {
      errorMessage('No rows selected');
      return;
    }
    fetch('/api/volunteer-logs/rejected', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rowSelection.selectedRowKeys),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to reject hours');
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'error') {
          errorMessage(data.message);
        } else {
          successMessage(data.message);
        }
      })
      .then(() => mutate())
      .catch(err => {
        errorMessage('Sorry an error occurred');
        console.error(err);
      });
  };

  return (
    <>
      <HeaderContainer>
        <SelectContainer>
          <span style={{ whiteSpace: 'nowrap' }}>Choose status: </span>
          <Select
            defaultValue={status}
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
          onConfirm={handleReject}
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
