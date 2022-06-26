import React from 'react';
import styled from 'styled-components';

function Sitemap() {
  return (
    <Container>
      <Card>Index Page</Card>
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled.div``;

export default Sitemap;
