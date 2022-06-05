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
    <div style={{ height: '100%' }}>
      <Header />

      <Container>
        <Contents>
          <LeftContainer>
            <LeftSide />
          </LeftContainer>

          <Main>{children}</Main>

          <RightContainer>
            <RightSide />
          </RightContainer>
        </Contents>
      </Container>
    </div>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Contents = styled.div`
  display: flex;
  width: 1200px;
  margin-top: 56px;
`;

const LeftContainer = styled.aside`
  flex: 1;
  height: calc(100vh - 56px);
  position: relative;

  ${media.small} {
    display: none;
  }
`;

const Main = styled.main`
  flex: 3;
  height: 100%;

  ${media.medium} {
    margin-right: 10px;
  }

  ${media.small} {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const RightContainer = styled.aside`
  flex: 1;
  height: calc(100vh - 56px);
  position: relative;

  ${media.medium} {
    display: none;
  }
`;

export default PageTemplate;
