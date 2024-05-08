import Link from 'next/link';
import Image from 'next/image';
import ApplicationTable from '@/components/Table/ApplicationTable/ApplicationTable';
import { PageTitle, PageLayout } from '@/styles/table.styles';

export default function responses() {
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
          <PageTitle>Event Management</PageTitle>
        </div>
        <ApplicationTable />
      </PageLayout>
    </>
  );
}

export { getServerSideProps } from '@/lib/getServerSideProps';
