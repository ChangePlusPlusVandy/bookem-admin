import {
  SearchContainter,
  TableButton,
  TableIcon,
} from '@/styles/table.styles';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Select, Divider, Space } from 'antd';
import { handleExport } from '@/utils/utils';
import useSWR from 'swr';
import { fetcher } from '@/utils/utils';
import {
  QueriedTagData,
  QueriedVolunteerProgramData,
} from 'bookem-shared/src/types/database';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, message } from 'antd';
import { EventTableContext } from './EventTable';

const TableHeader = ({
  setShowPopup,
  showPopup,
  setShowPopupTag,
  showPopupTag,
  setShowAddPopup,
  showAddPopup,
}: {
  setShowPopup: (a: boolean) => void;
  showPopup: boolean;
  setShowPopupTag: (a: boolean) => void;
  showPopupTag: boolean;
  setShowAddPopup?: (a: boolean) => void;
  showAddPopup?: boolean;
}) => {
  const { data: tags } = useSWR<QueriedTagData[]>('/api/tags/', fetcher);
  const { data: programs } = useSWR<QueriedVolunteerProgramData[]>(
    '/api/program/',
    fetcher
  );

  const { rowSelection, messageApi, setSelectedRowKeys } =
    useContext(EventTableContext);

  const [selectedProgram, setSelectedProgram] =
    useState<QueriedVolunteerProgramData>();
  const [selectedTags, setSelectedTags] = useState<QueriedTagData[]>([]);

  // ANTD Modal
  const { confirm } = Modal;
  const showAddTagConfirm = () => {
    confirm({
      title: 'Do you want to add the selected events to the following tag(s): ',
      content: selectedTags.join(', '),
      onOk() {
        messageApi.success('Tag added');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const showAddProgramConfirm = value => {
    confirm({
      title: `Do you want to add the selected events to program ${value}?`,
      // icon: <ExclamationCircleFilled />,
      content: '',
      onOk() {
        fetch('/api/program/add-events', {
          method: 'PUT',
          body: JSON.stringify(rowSelection.selectedRowKeys),
        })
          .then(res => {
            if (!res.ok) {
              throw new Error('Failed to add event to program');
            }
            return res.json();
          })
          .then(data => {
            if (data.status === 'error') {
              messageApi.open({
                type: 'error',
                content: data.message,
              });
            } else {
              messageApi.open({
                type: 'success',
                content: data.message,
              });
            }
          })
          .then(() => setSelectedRowKeys([]))
          .catch(err => {
            messageApi.open({
              type: 'error',
              content: err.message,
            });
          });
      },
    });
  };

  return (
    <>
      <div>
        <SearchContainter>
          <TableIcon>
            <Image
              onClick={() => setShowPopup(!showPopup)}
              src="/table/addbutton.png"
              alt=""
              width={32}
              height={32}
              style={{ marginRight: 20 }}
            />
          </TableIcon>
          <TableIcon>
            <Image
              onClick={() => {
                setShowPopup(false);
                setShowPopupTag(!showPopupTag);
              }}
              src="/table/tagsbutton.png"
              alt=""
              width={32}
              height={32}
            />
          </TableIcon>

          <Select
            mode="tags"
            disabled={rowSelection.selectedRowKeys.length === 0}
            style={{
              width: '13%',
              height: '100%',
              marginLeft: '15px',
            }}
            placeholder="Add Tags"
            onChange={value => setSelectedTags(value)}
            dropdownRender={menu => (
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Space style={{ padding: '0 8px 4px' }}>
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={showAddTagConfirm}>
                    Add
                  </Button>
                </Space>
              </>
            )}
            options={tags?.map(tag => ({
              label: tag.tagName,
              value: tag.tagName,
            }))}
          />
          <Select
            style={{
              width: '13%',
              height: '100%',
              marginLeft: '15px',
            }}
            disabled={rowSelection.selectedRowKeys.length === 0}
            placeholder="Add to Program"
            onChange={value => showAddProgramConfirm(value)}
            options={programs?.map(program => ({
              label: program.name,
              value: program.name,
            }))}
          />
          <TableButton onClick={() => handleExport('events')}>
            Export
          </TableButton>
        </SearchContainter>
      </div>
    </>
  );
};

export default TableHeader;
