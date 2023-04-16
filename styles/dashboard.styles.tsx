import styled from 'styled-components';

export const DashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 24vw;
`;

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: white;
  padding: 20px 40px;
  overflow-y: scroll;
  position: relative;
`;

export const GreetingContainer = styled.div`
  color: lightblue;
  height: fit-content;
  background-color: white;
`;

export const Greeting = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;
  color: black;
`;

export const UpcomingEventsContainer = styled.div``;

export const InfoIcon = styled.div`
  position: absolute;
  top: 82px;
  right: 50px;

  &:hover {
    cursor: pointer;
  }
`;

export const StatsContainer = styled.div`
  height: fit-content;
  margin-top: 15px;
`;

export const StatsHeader = styled.p`
  margin-bottom: 29px;
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 30px;
  color: #000000;
`;

export const StatsFlex = styled.div`
  height: fit-content;
  display: flex;
  justify-content: space-evenly;
`;

export const FlexChild = styled.div`
  flex: 0 1 auto;
  margin: 10px;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
`;

export const StatsNumber = styled.p`
  margin: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;
  color: #000000;
`;

export const StatsDescription = styled.p`
  margin: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #000000;
`;
