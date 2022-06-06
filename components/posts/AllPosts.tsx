import React from 'react';
import styled from 'styled-components';
import PostCard from './common/PostCard';

interface Props {
  posts: PostType[];
  onReadPost: (id: string) => void;
}

function AllPosts({ posts, onReadPost }: Props) {
  return (
    <Container>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onReadPost={onReadPost} />
      ))}
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
