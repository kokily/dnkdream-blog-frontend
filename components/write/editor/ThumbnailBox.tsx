import React from 'react';
import styled from 'styled-components';

interface Props {
  thumbnail: string;
}

function ThumbnailBox({ thumbnail }: Props) {
  return <Container>Thumbnail</Container>;
}

// Styles
const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  margin-bottom: 2.2rem;
`;

export default ThumbnailBox;
