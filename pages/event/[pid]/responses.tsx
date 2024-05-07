import Link from 'next/link';
import Image from 'next/image';

export default function responses() {
  return (
    <>
      <Link
        href="#"
        onClick={() => window.history.back()}
        style={{
          margin: '0 0 0 20px',
        }}>
        <Image src="/event/arrow-left.svg" alt="" width={48} height={48} />
      </Link>
      responses
    </>
  );
}

export { getServerSideProps } from '@/lib/getServerSideProps';
