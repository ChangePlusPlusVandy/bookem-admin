import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import Home from '@/pages/index';
jest.mock('next-auth/react');

describe('Home', () => {
  it('renders correctly', () => {
    // Mock useSession to return a logged in user
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { username: 'admin' },
    };
    (useSession as jest.Mock).mockReturnValueOnce([
      mockSession,
      'authenticated',
    ]);

    // renders the component
    const { container } = render(<Home />);

    // expect the component to contain the text "This is the Bookem Admin page"
    // expect the screen now to have a login message
    expect(screen.getByText('Admin Log In')).toBeInTheDocument();

    // expect the screen to have a form tag
    expect(container.querySelector('form')).toBeInTheDocument();

    // expect the screen to have 3 input elements (email, password, submit)
    expect(container.querySelectorAll('input').length).toBe(3);

    // expect password input to be of type password
    expect(
      container.querySelector('input[type="password"]')
    ).toBeInTheDocument();

    // expect the screen to have a submit button
    expect(container.querySelector('input[type="submit"]')).toBeInTheDocument();
  });
});
