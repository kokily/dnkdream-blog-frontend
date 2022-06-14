import React from 'react';
import styled from 'styled-components';
import { media } from '../../styles';
import Header from './Header';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

interface Props {
  children: React.ReactNode;
  left?: boolean;
  right?: true | React.ReactNode;
  prev?: PostType;
  next?: PostType;
}

function PageTemplate({ children, left, right, prev, next }: Props) {
  return (
    <div style={{ height: '100%' }}>
      <Header />

      <Container>
        <Contents>
          {left !== false && (
            <LeftContainer>
              <LeftSide />
            </LeftContainer>
          )}

          <Main>{children}</Main>

          {right === true ? (
            <RightContainer>
              <RightSide prev={prev} next={next} />
            </RightContainer>
          ) : (
            <RightContainer>{right}</RightContainer>
          )}
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

  ${media.small} {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
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
  width: 500px;
  height: 100%;

  ${media.large} {
    margin-right: 10px;
  }

  ${media.small} {
    max-width: 100%;
  }
`;

const RightContainer = styled.aside`
  flex: 1;
  height: calc(100vh - 56px);
  position: relative;

  ${media.xlarge} {
    display: none;
  }
`;

export default PageTemplate;
