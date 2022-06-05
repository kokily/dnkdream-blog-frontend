import React from 'react';
import styled from 'styled-components';
import PostCard from './common/PostCard';
import useAllPosts from './hooks/useAllPosts';

interface Props {}

function AllPosts({}: Props) {
  const { posts, loading, onReadPost } = useAllPosts();

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <PostCard onReadPost={onReadPost} />
      <PostCard onReadPost={onReadPost} />
      <PostCard onReadPost={onReadPost} />
      <PostCard onReadPost={onReadPost} />
      <PostCard onReadPost={onReadPost} />
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 1rem;
`;

export default AllPosts;