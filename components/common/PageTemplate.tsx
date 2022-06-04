import React from 'react';
import styled from 'styled-components';
import { media } from '../../styles';
import Header from './Header';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

interface Props {
  children: React.ReactNode;
}

function PageTemplate({ children }: Props) {
  return (
    <>
      <Header />

      <Container>
        <LeftContainer>
          <LeftSide />
        </LeftContainer>

        <Main>{children}</Main>

        <RightContainer>
          <RightSide />
        </RightContainer>
      </Container>
    </>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  height: 100%;
`;

const LeftContainer = styled.div`
  flex: 1;
  height: 100vh;

  ${media.small} {
    display: none;
  }

  // Temp Color
  background: #c69696;
`;

const Main = styled.main`
  flex: 3;
  height: 100%;
`;

const RightContainer = styled.div`
  flex: 1;
  height: 100vh;

  ${media.medium} {
    display: none;
  }
`;

export default PageTemplate;
