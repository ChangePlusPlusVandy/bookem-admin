import styled from 'styled-components';
import Image from 'next/image';

/**
 * Container for upcoming activities
 */
export const EventsContainer = styled.div`
  background-color: #d9d9d9;
  width: 24vw;
  height: 100vh;
  overflow-y: scroll;
  padding: 10px;
  display: flex;
  flex-direction: column;
  font-family: 'Inter';

  ul {
    padding: 0;
  }

  @media (max-width: 767px) {
    background-color: white;
    width: 100vw;
    padding: 30px;
    z-index: 1;
  }
`;

/**
 * Header for upcoming activities
 */
export const Header = styled.p`
  font-size: 25px;
  margin-top: 50px;
  text-align: center;
`;

/**
 * Container for the header of mobile past activities
 */
export const HeaderBox = styled.div`
  display: flex;
  height: 48px;

  @media (max-width: 767px) {
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
`;

/**
 * Text in header of mobile past activities
 */
export const HeaderText = styled.span`
  margin-left: 38px;
  font-size: 25px;
`;

/**
 * Decorative line in header of mobile past activities
 */
export const Line = styled(Image)`
  width: 100%;
`;

/**
 * Container for list of past activities
 */
export const Events = styled.ul`
  margin: 0 auto;
`;
