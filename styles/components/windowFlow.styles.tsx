import styled from 'styled-components';

export const WindowFlowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 30px 0;
`;

/**
 * Container for the header of all the page numbers and titles
 */
export const PageNumHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 100%;
  justify-content: center;
  overflow: hidden;
`;

/**
 * Container for each circular page number
 */
export const PageNum = styled.div`
  border-radius: 50%;
  border: solid 1px black;
  height: 50px;
  width: 50px;
  padding: 15px 20px;
`;

/**
 * Container for the page title
 */
export const PageTitle = styled.div`
  padding-top: 15px;
  margin: 0 1vw 5vh 1vw;
`;

/**
 * Container for the line in between each page number/title
 */
export const ImageWrapper = styled.div`
  padding-top: 10px;
  margin-right: 1vw;
`;

/**
 * Container for bottom region containing the navigation arrrows and submit buttons
 */
export const BottomContainer = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
`;

/**
 * Container for button to go back a page
 */
export const ButtonLeft = styled.div`
  margin-right: auto;
`;

/**
 * Container for button to go forward a page
 */
export const ButtonRight = styled.div`
  margin-left: auto;
`;

/**
 * Buttons for going back or forward a page
 */
export const ArrowButton = styled.button`
  background: transparent;
  border: transparent;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid black;
  padding: 0 2px;
`;

/**
 * Container for "Submit" button in middle of page
 */
export const ButtonCenter = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;

/**
 * Button for the "Submit" button
 */
export const SubmitButton = styled.button`
  font-size: 23px;
  border: 1px solid black;
  background-color: white;
  border-radius: 10px;
  padding: 10px 30px;
  cursor: pointer;
`;
