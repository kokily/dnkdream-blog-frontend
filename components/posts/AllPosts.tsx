import React from 'react';
import styled from 'styled-components';
import PostCard from './common/PostCard';

interface Props {
  posts: PostType[];
  onReadPost: (id: string) => void;
  onTagPost: (tag: string) => void;
}

function AllPosts({ posts, onReadPost, onTagPost }: Props) {
  return (
    <Container>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onReadPost={onReadPost}
          onTagPost={onTagPost}
        />
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
