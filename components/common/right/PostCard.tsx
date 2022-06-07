import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles';
import formatDate from '../../../libs/utils/formatDate';

interface Props {
  post: PostType;
  onReadPost: (id: string) => void;
  onTagPost: (tag: string) => void;
}

function PostCard({ post, onReadPost, onTagPost }: Props) {
  return (
    <Container>
      <Contents>
        <div>
          <Title onClick={() => onReadPost(post.id)}>
            {post.title.length > 9
              ? `${post.title?.slice(0, 9)}...`
              : post.title}
          </Title>

          <Thumbnail
            src={post.thumbnail}
            alt="Thumbnail"
            onClick={() => onReadPost(post.id)}
          />

          <DateString>{formatDate(post.created_at.toString())} 작성</DateString>

          <TagBox>
            <b onClick={() => onTagPost(post.tags[0])}>#{post.tags[0]}</b>
            <b onClick={() => onTagPost(post.tags[1])}>#{post.tags[1]}</b>
          </TagBox>
        </div>
      </Contents>
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  justify-content: center;
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

const Thumbnail = styled.img`
  width: 100%;
  height: 120px;
`;

const DateString = styled.div`
  display: block;
  margin-top: 0.3rem;
  margin-left: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: #969ea5;
`;

const TagBox = styled.p`
  margin-top: 0.5rem;
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
