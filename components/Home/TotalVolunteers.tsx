import React, { useEffect, useState } from 'react';
import { fetchData } from '@/utils/utils';
import {
  StatsNumber,
} from '@/styles/dashboard.styles';

const MyComponent = () => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await fetchData('/api/admin/adminStats?type=userCount'); // Use the correct route
        setCount(response.count);
      } catch (err) {
        setError(err.message);
      }
    };

    getCount();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <StatsNumber>
      {count}
    </StatsNumber>
  );
};

export default MyComponent;