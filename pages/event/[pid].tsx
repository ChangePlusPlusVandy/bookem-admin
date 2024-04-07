import Event from '@/components/Event/Event';
import { useRouter } from 'next/router';

/**
 * Event Detail Page
 * @returns
 */
const EventDetail = () => {
  const router = useRouter();
  const { pid } = router.query;

  if (typeof pid !== 'string') {
    return <div>Invalid pid</div>;
  }

  return <Event pid={pid} />;
};

export default EventDetail;

// perform automatic redirection to login page if user not logged in.
export { getServerSideProps } from '@/lib/getServerSideProps';
