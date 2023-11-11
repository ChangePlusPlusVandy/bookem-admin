import React, { useState } from 'react';
import Image from 'next/image';
import TotalVolunteers from '@/components/Home/TotalVolunteers';
import TotalEvents from '@/components/Home/TotalEvents';
import TotalHours from '@/components/Home/TotalHours';

//import UpcomingEvents from '@/components/Home/UpcomingEvents';
//import PastActivity from '@/components/Home/PastActivity';
import type { MenuProps } from 'antd';
import { Dropdown, Button, Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';


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

/*
const handleMenuClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};

const items: MenuProps['items'] = [
  {
    label: '1st menu item',
    key: '1',
    // icon: <UserOutlined />,
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};
*/

/**
 * format main dashboard on home page
 * @param userData object that contains pertinent user information
 * userData: {
 *   name: string;
 *   hoursVolunteered: number;
 *   booksShared: number;
 *   dollarsDonated: number;
 * }
 */
const MainDashboard = ({ userData }: any) => {
  // state for showing mobile past activities
  return (
    <>
      {(
        <DashboardLayout>
          <Container>
            {/* Desktop Greeting and InfoIcon */}
            <Greeting>
              Hello, how's your day?
            </Greeting>


            <InfoIcon>
              <Image
                src="/home/info.png"
                alt="Info icon"
                width="44"
                height="44"
              />
            </InfoIcon>

            <div>
              {/* Desktop Accomplishments Header */}
              <Header>
                Here are some quick stats for
      
                {/*
                <Dropdown menu={menuProps}>
                  <Button>
                    <Space>
                      Button
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>*/}
              </Header>

              <StatsFlex>
                
                <FlexChild>
                  <TotalVolunteers />
                  <StatsDescription>total volunteers</StatsDescription>
                </FlexChild>
                
                <FlexChild>
                  <TotalHours />
                  <StatsDescription>total volunteer hours</StatsDescription>
                </FlexChild>

                <FlexChild>
                  <TotalEvents />
                  <StatsDescription>total events</StatsDescription>
                </FlexChild>
                
              </StatsFlex>
            </div>

            <div>
              <Header>Bookmarked events</Header>
              {/* TODO: add a filter icon on the right */}

              {/*<UpcomingEvents />*/}
            </div>


            {/* Desktop PastActivity is not located at bottom of main dashboard */}
          </Container>

          {/* Desktop PastActivity is shown on the right side of main dashboard*/}
          {/*<PastActivity />*/}
        </DashboardLayout>
      )}
    </>
  );
};

export default MainDashboard;