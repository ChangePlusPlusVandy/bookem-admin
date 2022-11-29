import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

describe('Home', () => {
  it('renders correctly', () => {
    // renders the component
    render(<Home />);

    // expect the component to contain the text "This is the Bookem Admin page"
    expect(
      screen.getByText('This is the Bookem Admin page')
    ).toBeInTheDocument();
  });
});
