import '@/styles/globals.css';
import { Container, MainContent } from '@/styles/layout.styles';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useActiveRoute } from '@/lib/useActiveRoute';
import { BOOKEM_THEME } from '@/utils/constants';
import { ThemeProvider } from 'styled-components';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={BOOKEM_THEME}>
        {session && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
        {!session && <Component {...pageProps} />}
      </ThemeProvider>
    </SessionProvider>
  );
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Sidebar />
      <MainContent>{children}</MainContent>
    </Container>
  );
};
