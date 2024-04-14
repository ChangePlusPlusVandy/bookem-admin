import styled from 'styled-components';

export const EventsScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;  // Allows horizontal scrolling
  overflow-y: hidden;  // Prevents vertical scrolling
  padding: 10px;
  white-space: nowrap;
  max-width: 100%;  // Ensures the container does not exceed the viewport width
  width: 100%;  // Optionally set a fixed width

  &::-webkit-scrollbar {
    display: none;
  }

  .event-card {
    display: inline-block;
    margin-right: 20px;
    background-color: #ffffff;
    border-radius: 10px;
  }
`;

export const FeaturedEventsContainer = styled.div`
  background-color: #d9d9d9;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/**
 * Header for featured events
 */
export const Header = styled.p`
  font-size: 25px;
  margin-top: 0; // Assuming no top margin if it's at the start of the container
  text-align: left; // Align to the left based on the screenshot
  padding-left: 10px; // Padding to match the container
`;

/**
 * Container for list of featured events
 */
export const Events = styled.ul`
  list-style: none; // Remove bullet points
  padding: 0; // Remove padding
  margin-top: 20px; // Space below the header
`;

// Additional styles for the event cards can be added here. For example:
export const EventCardContainer = styled.li`
  background-color: #ffffff;
  padding: 15px;
  margin-bottom: 10px; // Space between cards
  border-radius: 8px; // Rounded corners for the cards
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Optional shadow for cards

  &:last-child {
    margin-bottom: 0; // No margin for the last card
  }
`;

// If you have a line or separator in your design, add it here
export const SeparatorLine = styled.div`
  height: 1px;
  background-color: #d9d9d9; // Use a color that suits your design
  margin: 20px 0;
`;