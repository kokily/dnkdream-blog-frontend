import React from 'react';
import styled from 'styled-components';
import PostCard from './right/PostCard';

function RightSide() {
  return (
    <Container>
      <Title>다른 글</Title>

      <PostTitle>이전 글</PostTitle>
      <PostCard />

      <PostTitle>다음 글</PostTitle>
      <PostCard />
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: #303030;
`;

const PostTitle = styled.h3`
  margin-top: 2rem;
`;

export default RightSide;
