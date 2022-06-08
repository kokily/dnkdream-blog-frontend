import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import PostCard from './common/PostCard';

interface Props {
  posts: PostType[];
  onReadPost: (id: string) => void;
  onTagPost: (tag: string) => void;
  category: string | undefined;
}

function CategoryPosts({ posts, onReadPost, onTagPost, category }: Props) {
  return (
    <Container>
      <CategoryBox>
        <Link href="/">
          <CategoryLink>카테고리 &gt; {category}</CategoryLink>
        </Link>
        <span>❌</span>
      </CategoryBox>

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

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  span {
    display: none;
    margin-left: 0.4rem;
    font-size: 8px;
  }

  &:hover {
    span {
      display: inline-block;
    }
  }
`;

const CategoryLink = styled.a`
  padding-top: 0.2rem;
  cursor: pointer;
  color: #1c7ed6;
  &:hover {
    color: #1971c2;
    font-weight: bold;
  }
`;

export default CategoryPosts;
