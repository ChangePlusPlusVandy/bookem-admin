import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/**
 * A custom react hook used to detect the current route.
 * @returns the current route string
 */
export const useActiveRoute = () => {
  const [activeRoute, setActiveRoute] = useState('');
  const router = useRouter();

  /**
   * Change the activeRoute state when switching between routes
   * and return the activeRoute
   */
  useEffect(() => {
    setActiveRoute(router.pathname);
  }, [router.pathname]);

  return activeRoute;
};
