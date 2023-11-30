import styled from 'styled-components';

/**
 * Contain everything
 */
export const EventBox = styled.div`
  width: 100%;
  padding: 50px;
`;

/**
 * Contains the book icon and the event name info
 */
export const MiddleBox = styled.div`
  display: flex;
  margin-top: 45px;
  margin-left: 30px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px; 
`;

export const EventName = styled.div`
  display: flex;
  margin-top: 5px;
  margin-left: 50px;
  font-size: 25px;  
  font-weight: bolder; 
`;

export const SpotsFilled = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 50px;
  font-size: 25px;  
`;

export const Button = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 50px;
  font-size: 25px;  
`;

/**
 * Contain About and Contact info
 */
export const BottomBox = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 51px;
`;

/**
 * Button for editing events
 */
export const EditButton = styled.div`
  margin-left: 50px;
  margin-top: 30px;
  background: #6d6d6d;
  display: flex;
  /* padding: 10px 10px; */
  width: 150px;
  height: 60px;
  font-size: 20px;
  justify-content: center; 
  border-radius: 10px;
  color: #ffffff;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

export const CopyButton = styled.div`
  position: absolute;
  left: 500px;
  margin-top: 15px;
  display: flex;
  border-radius: 10px;
  color: #ffffff;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;
