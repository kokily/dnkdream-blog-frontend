import type { Dispatch, SetStateAction } from 'react';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import PostCard from './common/PostCard';

interface Props {
  posts: PostType[];
  onReadPost: (id: string) => void;
  onTagPost: (tag: string) => void;
  tag?: string;
  setTarget: Dispatch<SetStateAction<HTMLElement | null | undefined>>;
}

function AllPosts({ posts, onReadPost, onTagPost, tag, setTarget }: Props) {
  return (
    <Container>
      {tag && (
        <TagBox>
          <Link href="/" passHref={true}>
            <Tag>
              #{tag}
              <span>x</span>
            </Tag>
          </Link>
        </TagBox>
      )}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onReadPost={onReadPost}
          onTagPost={onTagPost}
        />
      ))}

      <div ref={setTarget} />
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

const TagBox = styled.div`
  display: flex;
  margin-bottom: 1.4rem;
`;

const Tag = styled.div`
  border: 1px solid #1c68cb;
  border-radius: 15px;
  padding: 5px 10px;
  background: #1c68cb;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
  transition: 0.2s all;
  span {
    display: none;
    margin-left: 0.5rem;
  }
  &:hover {
    color: #1c68cb;
    background-color: #fff;

    span {
      display: inline-block;
    }
  }
`;

export default AllPosts;
