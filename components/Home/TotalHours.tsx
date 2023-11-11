import React, { useEffect, useState } from 'react';
import { fetchData } from '@/utils/utils';
import {
  StatsNumber,
} from '@/styles/dashboard.styles';

const MyComponent = () => {
  const [totalHours, setTotalHours] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await fetchData('/api/admin/totalHours'); // Use the correct route
        setTotalHours(response.totalHours);
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
      {totalHours}
    </StatsNumber>
  );
};

export default MyComponent;