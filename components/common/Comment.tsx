import React, { useRef } from 'react';
import styled from 'styled-components';
import useUtterances from '../../libs/hooks/common/useUtterances';

function Comment() {
  const containerRef = useRef<HTMLDivElement>(null);

  useUtterances({
    url: 'https://utteranc.es/client.js',
    theme: 'github-light',
    issueTerm: 'url',
    repo: 'kokily/dnkdream',
    ref: containerRef,
  });

  return (
    <Container>
      <div ref={containerRef} />
    </Container>
  );
}

// Styles
const Container = styled.div`
  margin-top: 12rem;
  margin-bottom: 15rem;
`;

export default Comment;
