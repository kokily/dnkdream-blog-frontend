import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PostCard from './right/PostCard';

interface Props {
  prev?: PostType;
  next?: PostType;
}

function RightSide({ prev, next }: Props) {
  const router = useRouter();

  const onReadPost = (id: string) => {
    router.push(`/post/${id}`);
  };

  const onTagPost = (tag: string) => {
    router.push(`/tag/${tag}`);
  };

  return (
    <Container>
      <Title>다른 글</Title>

      <PostTitle className="prev">이전 글</PostTitle>
      {prev ? (
        <PostCard post={prev} onReadPost={onReadPost} onTagPost={onTagPost} />
      ) : (
        <span>이전 글이 없습니다.</span>
      )}

      <PostTitle className="next">다음 글</PostTitle>
      {next ? (
        <PostCard post={next} onReadPost={onReadPost} onTagPost={onTagPost} />
      ) : (
        <span>다음 글이 없습니다.</span>
      )}
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 225px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  position: fixed;
  top: 56px;

  span {
    width: 100%;
    text-align: center;
  }
`;

const Title = styled.h2`
  color: #303030;
`;

const PostTitle = styled.h3`
  margin-top: 2rem;

  &.prev {
    color: #c4643d;
  }

  &.next {
    color: #1942ca;
  }
`;

export default RightSide;
