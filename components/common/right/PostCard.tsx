import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { media } from '../../../styles';

interface Props {
  title?: string;
  body?: string;
  thumbnail?: string;
  tags?: string[];
}

/*
  Title ->
    {post.title.length > 26 ? `${post.title.slice(0, 26)}...` : post.title}
*/

function PostCard({ title, body, thumbnail, tags }: Props) {
  return (
    <Container>
      <Contents>
        <div>
          <Link href="/" passHref={true}>
            <Title>포스트 제목</Title>
          </Link>

          <p>포스트 내용 들어갈 자리</p>

          <DateString>2022. 6. 5. 작성</DateString>

          <TagBox>
            <b>#태그</b>
            <b>#포스트</b>
            <b>#연습 중</b>
          </TagBox>
        </div>
      </Contents>
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #9defdf;
  border-radius: 6px;
  padding: 5px;
  padding-left: 10px;
  margin-bottom: 1rem;
  transition: 0.15s background-color;
  &:hover {
    background: #e7fcf6;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  color: #0ca678;
  margin: 0;
  margin-top: 0.6rem;
  padding: 0;
  line-height: 2rem;
  cursor: pointer;
  transition: 0.12s color;

  &:hover {
    color: #21e1a7;
  }

  ${media.large} {
    font-size: 24px;
  }
`;

const DateString = styled.span`
  display: block;
  margin-top: 1.2rem;
  margin-left: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: #969ea5;
`;

const TagBox = styled.p`
  margin-top: 1.5rem;
  transition: 0.14s all;

  b {
    font-size: 1rem;
    margin-right: 0.6rem;
    color: #1971c2;
    cursor: pointer;
    &:hover {
      color: #339af0;
    }
  }
`;

export default PostCard;
