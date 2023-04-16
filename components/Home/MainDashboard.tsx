import React from 'react';
import UpcomingEvents from '@/components/Home/UpcomingEvents';
import Image from 'next/image';
import {
  Container,
  DashboardLayout,
  Greeting,
  GreetingContainer,
  InfoIcon,
  StatsContainer,
  StatsDescription,
  StatsFlex,
  FlexChild,
  StatsHeader,
  StatsNumber,
  UpcomingEventsContainer,
} from '@/styles/dashboard.styles';
import PastActivity from '@/components/Home/PastActivity';

const MainDashboard = ({ userData }: any) => {
  return (
    <DashboardLayout>
      <Container>
        <GreetingContainer>
          <Greeting>Hello {userData.name}, how&apos;s your day?</Greeting>
        </GreetingContainer>

        <InfoIcon>
          <Image src="/info.png" alt="Info icon" width="44" height="44" />
        </InfoIcon>

        <StatsContainer>
          <StatsHeader>Here are some quick stats for:</StatsHeader>
          <StatsFlex>
            <FlexChild>
              <StatsNumber>{userData.hoursVolunteered}</StatsNumber>
              <StatsDescription>total volunteers</StatsDescription>
            </FlexChild>

            <FlexChild>
              <StatsNumber>{userData.booksShared}</StatsNumber>
              <StatsDescription>total volunteer hours</StatsDescription>
            </FlexChild>

            <FlexChild>
              <StatsNumber>{userData.dollarsDonated}</StatsNumber>
              <StatsDescription>total events</StatsDescription>
            </FlexChild>
          </StatsFlex>
        </StatsContainer>

        <StatsContainer>
          <StatsHeader>Bookmarked events</StatsHeader>
        </StatsContainer>

        <UpcomingEventsContainer>
          <UpcomingEvents />
        </UpcomingEventsContainer>
      </Container>

      <PastActivity />
    </DashboardLayout>
  );
};

export default MainDashboard;
