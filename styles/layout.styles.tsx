import { SideBar } from '@/components/SideBar';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const Subcontainer = styled.div`
  width: calc(100vw - 120px);
  overflow-y: scroll;
`;

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <SideBar />
      <Subcontainer>{children}</Subcontainer>
    </Container>
  );
};
