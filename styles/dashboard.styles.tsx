import styled from 'styled-components';

/**
 * Main dashboard layout
 */
export const DashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 24vw;

  @media (max-width: 767px) {
    grid-template-columns: 1fr 0vw;
  }
`;

/**
 * Container for all contents
 */
export const Container = styled.div`
  height: 100vh;
  width: 100%;
  padding: 40px;
  overflow-y: auto;
  position: relative;
  font-style: normal;
  font-weight: 400;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

/**
 * Text that greets user
 */
export const Greeting = styled.p`
  font-size: 40px;
  line-height: 48px;
  padding-right: 55px;

  @media (max-width: 767px) {
    font-size: 25px;
    line-height: 30px;
    padding-right: 70px;
  }
`;

/**
 * Info icon
 */
export const InfoIcon = styled.div`
  position: absolute;
  top: 83px;
  right: 50px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 767px) {
    top: 75px;
    right: 90px;
  }
`;

/**
 * Header for accomplishments and your events
 */
export const Header = styled.p`
  // Prevent switching to new line
  white-space: nowrap;
  font-size: 25px;
  line-height: 30px;

  @media (max-width: 767px) {
    margin-bottom: 29px;
  }
`;

/**
 * Flex box for the three statistics
 */
export const StatsFlex = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

/**
 * Child statistics of stats flex box
 */
export const FlexChild = styled.div`
  flex: 0 1 auto;
  margin: 10px;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
`;

/**
 * Number of a statistic
 */
export const StatsNumber = styled.p`
  margin: 0;
  font-size: 40px;
  line-height: 48px;

  @media (max-width: 767px) {
    font-size: 25px;
    line-height: 30px;
  }
`;

/**
 * Description of a statistic
 */
export const StatsDescription = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 19px;
  text-align: center;

  @media (max-width: 767px) {
    font-size: 15px;
    line-height: 18px;
  }
`;
