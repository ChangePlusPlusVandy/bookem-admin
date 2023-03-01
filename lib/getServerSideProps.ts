import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

// This function when exported from a page will handle redirecting to
// the login page if the user is not logged in.
export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  // const session = await getSession(context);

  // If the user is not logged in, redirect to the login page.
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // If the user is logged in, simply return the session.
  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
}
