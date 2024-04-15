import {
  AboutEvent,
  FormLogistics,
  ShortFormInput,
  LongFormInput,
  LargeFormInput,
  FormInput,
  FormLabel,
  CreateEventForm,
  FormHeader,
  CreateAdminContainer,
} from '@/styles/components/event.styles';
import {
  SubmitButton,
  ButtonCenter,
} from '@/styles/components/windowFlow.styles';
import React, { useState } from 'react';
import PopupWindow from '@/components/PopupWindow';
import { useForm } from 'react-hook-form';
import { Form, type FormProps, Input, Button, message } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;

const CreateEventPopupWindow = ({
  setShowPopup,
  messageApi,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  messageApi: any;
}) => {
  const [form] = Form.useForm();

  const onFinish = async values => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        const resObj = await res.json();
        messageApi.open({
          type: 'success',
          content: resObj.message,
        });
      } else {
        const resObj = await res.json();
        messageApi.open({
          type: 'error',
          content: resObj.message,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      messageApi.open({
        type: 'error',
        content: 'Sorry an internal error exists, please try again later',
      });
    }

    setShowPopup(false);
  };

  const { register, handleSubmit } = useForm({});

  const onSubmit = (data: any) => {
    const results = JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      password: data.password,
    });
    console.log('Here are the results: ', results);
    createAdmin(results);
  };

  const createAdmin = async (data: any) => {
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: {
        // Specify the content type in the headers
        'Content-Type': 'application/json',
      },
      // Stringify the JSON body
      body: data,
    });

    if (res.ok) {
      const resObj = await res.json();
      messageApi.open({
        type: 'success',
        content: resObj.message,
      });
    } else {
      const resObj = await res.json();
      messageApi.open({
        type: 'error',
        content: resObj.message,
      });
    }

    setShowPopup(false);
  };

  return (
    <>
      <PopupWindow hidePopup={() => setShowPopup(false)}>
        <CreateAdminContainer>
          <Title>Add new account</Title>
          <Form style={{ width: '50%' }} form={form} onFinish={onFinish}>
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: 'Please input your first name!' },
              ]}>
              <Input placeholder="First Name" />
            </Form.Item>

            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: 'Please input your last name!' },
              ]}>
              <Input placeholder="Last Name" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please input a valid email!',
                },
              ]}>
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                { required: true, message: 'Please input your phone number!' },
                {
                  pattern: /^[0-9]{10}$/,
                  message: 'Please input a valid phone number!',
                },
              ]}>
              <Input placeholder="Phone number" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters long!',
                },
              ]}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The new password that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}>
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item>
              {/* <Button type="primary" htmlType="submit">
                Add
              </Button> */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SubmitButton type="submit">Add</SubmitButton>
              </div>
            </Form.Item>
          </Form>
        </CreateAdminContainer>
      </PopupWindow>
    </>
  );
};

export default CreateEventPopupWindow;
