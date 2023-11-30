import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from '@/pages/index';

// Mock the useSession hook
jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: 'Test Admin' },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});
jest.mock('next/router', () => {
  const originalModule = jest.requireActual('next/router');
  const mockRouter = {
    push: (str: string) => {},
  };
  return {
    __esModule: true,
    ...originalModule,
    useRouter: jest.fn(() => {
      return mockRouter;
    }),
  };
});
describe('Home', () => {
  it('renders correctly', () => {
    // renders the component
    const { container } = render(<HomePage />);

    // TODO: expect screen to correctly render home page
    expect(true).toBe(true);

    // TODO: expect screen to have sidebar
  });
});
