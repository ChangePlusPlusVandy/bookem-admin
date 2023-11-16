import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import UpcomingEvents from '@/components/Home/UpcomingEvents';
import type { MenuProps } from 'antd';
import { Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import {
  Container,
  DashboardLayout,
  Greeting,
  InfoIcon,
  StatsDescription,
  StatsFlex,
  FlexChild,
  Header,
  StatsNumber,
} from '@/styles/dashboard.styles';

interface Stats {
  userCount: number;
  volunteerHours: number;
  eventCount: number;
}

// Main dashboard component
const MainDashboard: React.FC = () => {
  // State for storing statistics
  const [stats, setStats] = useState<Stats>({
    userCount: 0,
    volunteerHours: 0,
    eventCount: 0,
  });

  // State for storing the user's name
  const [userName, setUserName] = useState<string>('there');

  // Function to handle menu clicks (Ant Design specific)
  const handleMenuClick: MenuProps['onClick'] = e => {
    console.log('click', e);
  };

  // Menu items for dropdown (Ant Design specific)
  const menuProps: MenuProps = {
    items: [
      {
        label: '1st menu item',
        key: '1',
        // icon: <UserOutlined />, // Uncomment or modify if icon is needed
      },
    ],
    onClick: handleMenuClick,
  };

  useEffect(() => {
    // Fetch the user's name from the server
    const fetchUserName = async () => {
      try {
        const res = await fetch('/api/admin/name');
        if (!res.ok) {
          throw new Error('Failed to fetch user name');
        }
        const data = await res.json();
        setUserName(data.name);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    // Fetch the dashboard statistics from the server
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/adminStats');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchUserName();
    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <Container>
        <Greeting>Hello {userName}, how's your day?</Greeting>

        <InfoIcon>
          <Image src="/home/info.png" alt="Info icon" width="44" height="44" />
        </InfoIcon>

        <Header>
          Here are some quick stats for
          <span style={{ marginRight: '10px' }}></span>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                Button
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Header>

        <StatsFlex>
          <FlexChild>
            <StatsNumber>{stats.userCount}</StatsNumber>
            <StatsDescription>total volunteers</StatsDescription>
          </FlexChild>

          <FlexChild>
            <StatsNumber>{stats.volunteerHours}</StatsNumber>
            <StatsDescription>total volunteer hours</StatsDescription>
          </FlexChild>

          <FlexChild>
            <StatsNumber>{stats.eventCount}</StatsNumber>
            <StatsDescription>total events</StatsDescription>
          </FlexChild>
        </StatsFlex>

        {/* Additional dashboard components go here */}
      </Container>

      <UpcomingEvents />
    </DashboardLayout>
  );
};

export default MainDashboard;
