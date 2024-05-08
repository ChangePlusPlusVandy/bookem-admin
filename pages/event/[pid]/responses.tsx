import Link from 'next/link';
import Image from 'next/image';
import ApplicationTable from '@/components/Table/ApplicationTable/ApplicationTable';
import { PageTitle, PageLayout } from '@/styles/table.styles';
import { QueriedVolunteerEventDTO } from 'bookem-shared/src/types/database';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '@/utils/utils';

export default function VolunteerApplicationResponses() {
  const router = useRouter();
  const { pid } = router.query;
  const {
    data: event,
    error,
    isLoading,
  } = useSWR<QueriedVolunteerEventDTO>('/api/event/' + pid, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading event</div>;

  return (
    <>
      <PageLayout>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            href="#"
            onClick={() => window.history.back()}
            style={{
              margin: '0 20px 0 0',
            }}>
            <Image src="/event/arrow-left.svg" alt="" width={48} height={48} />
          </Link>
          <PageTitle>Applications to {event?.name}</PageTitle>
        </div>
        <ApplicationTable />
      </PageLayout>
    </>
  );
}

export { getServerSideProps } from '@/lib/getServerSideProps';
