import React from 'react';
import styled from 'styled-components';

interface Props {}

function PostCard({}: Props) {
  return (
    <Container>
      <Thumbnail src="/assets/images/thumbnail1.png" alt="Thumbnail" />
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 3rem;
`;

const Thumbnail = styled.img`
  width: 100%;
`;

export default PostCard;
