import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from '@/pages/index';
jest.mock('next-auth/react');

describe('Home', () => {
  it('renders correctly', () => {
    // renders the component
    const { container } = render(<HomePage />);

    // TODO: expect screen to correctly render home page
    expect(true).toBe(true);

    // TODO: expect screen to have sidebar
  });
});
