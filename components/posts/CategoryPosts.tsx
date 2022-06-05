import React from 'react';
import styled from 'styled-components';
import PostCard from './common/PostCard';

interface Props {}

function CategoryPosts({}: Props) {
  return (
    <Container>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </Container>
  );
}

// Styles
const Container = styled.div``;

export default CategoryPosts;
