import styled from 'styled-components';

/**
 * Contain everything
 */
export const EventBox = styled.div`
  width: 100%;
  padding: 50px;
`;

/**
 * Contains the book icon and the program name info
 */
export const MiddleBox = styled.div`
  display: flex;
  margin-top: 45px;
  margin-left: 30px;
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
  position: absolute;
  right: 50px;
  background: #6d6d6d;
  display: flex;
  padding: 5px 10px;
  border-radius: 10px;
  color: #ffffff;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;
