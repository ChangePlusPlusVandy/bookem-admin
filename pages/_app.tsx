import '@/styles/globals.css';
import { Container, MainContent } from '@/styles/layout.styles';
import { SideBar } from '@/components/SideBar';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      {session && (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
      {!session && <Component {...pageProps} />}
    </SessionProvider>
  );
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <SideBar />
      <MainContent>{children}</MainContent>
    </Container>
  );
};
