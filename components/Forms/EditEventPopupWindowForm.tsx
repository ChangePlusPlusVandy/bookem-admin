import {
  EditEventForm,
  EditEventContainer,
} from '@/styles/components/editEventPopupWindowForm.styles';
import React, { useEffect, useState } from 'react';
import PopupWindow from '@/components/PopupWindow';
import {
  QueriedVolunteerEventDTO,
  QueriedVolunteerProgramData,
  VolunteerEventData,
} from 'bookem-shared/src/types/database';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { QueriedTagData } from 'bookem-shared/src/types/database';

import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Typography,
  Space,
  Flex,
} from 'antd';

interface ModifiedVolunteerEventData
  extends Omit<VolunteerEventData, 'volunteers'> {}

const EditEventPopupWindowForm = ({
  setShowPopup,
  event,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  event: QueriedVolunteerEventDTO;
}) => {
  const router = useRouter();
  const { pid } = router.query;
  const { RangePicker } = DatePicker;
  const [allTags, setAllTags] = useState<QueriedTagData[]>([]);
  const [allPrograms, setAllPrograms] = useState<QueriedVolunteerProgramData[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [submittable, setSubmittable] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    // get all tags
    fetch('/api/tags')
      .then(response => response.json())
      .then(data => setAllTags(data));

    // get all programs
    fetch('/api/program')
      .then(response => response.json())
      .then(data => setAllPrograms(data));
  }, []);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const onSubmit = (data: any) => {
    setLoading(true);
    // find tag ids from tag names
    const tagIds = allTags
      .filter(tag => data.tags.includes(tag.tagName))
      .map(tag => tag._id);

    // find program id from program name
    const programId = allPrograms.find(
      program => program.name === data.program
    )?._id;

    const modifiedData: ModifiedVolunteerEventData = {
      name: data.name,
      tags: tagIds,
      maxSpot: data.maxSpot,
      requireApplication: false, // TODO: change when implementing application
      program: programId,
      location: {
        street: data.location.street,
        city: data.location.city,
        state: data.location.state,
        zip: data.location.zip,
      },
      description: data.description,
      phone: data.phone,
      email: data.email,
      startDate: data.dateRange[0].format(),
      endDate: data.dateRange[1].format(),
    };
    // console.log(modifiedData);
    fetch(`/api/event/${pid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modifiedData),
    }).then(() => {
      setLoading(false);
      setShowPopup(false);
    });
  };

  return (
    <PopupWindow hidePopup={() => setShowPopup(false)}>
      <EditEventContainer>
        <EditEventForm>
          <Typography.Title level={3} style={{ textAlign: 'center' }}>
            Edit Event
          </Typography.Title>
          <Typography.Title level={5} style={{ textAlign: 'center' }}>
            Overview
          </Typography.Title>
          <Form
            form={form}
            initialValues={{
              name: event.name,
              program: event.program?.name,
              tags: event.tags.map(tag => tag.tagName),
              maxSpot: event.maxSpot,
              location: {
                street: event.location.street,
                city: event.location.city,
                state: event.location.state,
                zip: event.location.zip,
              },
              description: event.description,
              phone: event.phone,
              email: event.email,
              dateRange: [dayjs(event.startDate), dayjs(event.endDate)],
            }}
            layout="horizontal"
            onFinish={onSubmit}
            labelCol={{ flex: '120px' }}
            labelAlign="left"
            labelWrap
            colon={false}>
            <Form.Item
              label="Event Name"
              name="name"
              required
              rules={[{ required: true }]}>
              <Input placeholder="Event Name" />
            </Form.Item>

            <Form.Item name="program" label="Program Name">
              <Select
                allowClear
                placeholder="Please select a program (Optional)"
                options={allPrograms.map(program => ({
                  label: program.name,
                  value: program.name,
                }))}
              />
            </Form.Item>

            <Form.Item name="tags" label="Event Tags">
              <Select
                mode="multiple"
                allowClear
                placeholder="Please select tags (Optional)"
                options={allTags.map(tag => ({
                  label: tag.tagName,
                  value: tag.tagName,
                }))}
              />
            </Form.Item>

            <Typography.Title level={5} style={{ textAlign: 'center' }}>
              Logistics
            </Typography.Title>

            <Form.Item
              name="dateRange"
              label="Date Range"
              required
              rules={[{ required: true }]}>
              <RangePicker showTime placeholder={['Start Date', 'End Date']} />
            </Form.Item>

            <Form.Item
              name="maxSpot"
              label="Max Spots"
              required
              rules={[{ required: true }]}>
              <InputNumber placeholder="#" />
            </Form.Item>

            <Typography.Title level={5} style={{ textAlign: 'center' }}>
              Address
            </Typography.Title>
            <Form.Item
              label="Street"
              name={['location', 'street']}
              required
              rules={[{ required: true }]}>
              <Input placeholder="2301 Vanderbilt Place" />
            </Form.Item>
            <Form.Item
              label="City"
              name={['location', 'city']}
              required
              rules={[{ required: true }]}>
              <Input placeholder="Nashville" />
            </Form.Item>
            <Form.Item
              label="State"
              name={['location', 'state']}
              required
              rules={[{ required: true }]}>
              <Input placeholder="TN" />
            </Form.Item>
            <Form.Item
              label="Zip"
              name={['location', 'zip']}
              required
              rules={[{ required: true }]}>
              <Input placeholder="37235" />
            </Form.Item>

            <Typography.Title level={5} style={{ textAlign: 'center' }}>
              Event Description
            </Typography.Title>
            <Form.Item name="description" required rules={[{ required: true }]}>
              <Input.TextArea placeholder="About..." />
            </Form.Item>
            <Typography.Title level={5}>Contact</Typography.Title>
            <Form.Item
              name="phone"
              label="Phone"
              required
              rules={[{ required: true }]}>
              <Input placeholder="xxx-xxx-xxxx" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Invalid email',
                },
              ]}
              required>
              <Input placeholder="johndoe@bookem.org" />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-around">
                <Button
                  type="default"
                  htmlType="button"
                  style={{ width: '45%' }}
                  onClick={() => setShowPopup(false)}>
                  Close
                </Button>
                <Space size={10} />
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={!submittable}
                  style={{ width: '45%' }}>
                  Save Changes
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </EditEventForm>
      </EditEventContainer>
    </PopupWindow>
  );
};

export default EditEventPopupWindowForm;
