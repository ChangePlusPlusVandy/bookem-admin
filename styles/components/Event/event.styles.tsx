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
  margin: 5px 0 0 50px;
  font-size: 25px;
  font-weight: bolder;
`;

export const SpotsFilled = styled.div`
  display: flex;
  margin: 30px 0 30px 50px;
  font-size: 25px;
`;

export const Button = styled.div`
  display: flex;
  margin: 30px 0 0 50px;
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

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
`;

/**
 * Button for editing events
 */
export const EditButton = styled.div`
  margin-left: 40px;
  background: #6d6d6d;
  display: flex;
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

/**
 * Button for viewing sign-ups
 */
export const SeeSignUpButton = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  background: #dad8d8;
  display: flex;
  width: 150px;
  height: 60px;
  font-size: 20px;
  justify-content: center;
  border-radius: 10px;
  color: #030303;
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
