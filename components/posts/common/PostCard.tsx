import React from 'react';
import styled from 'styled-components';
import Markdown from '../../common/Markdown';
import formatDate from '../../../libs/utils/formatDate';

interface Props {
  post: PostType;
  onReadPost: (id: string) => void;
}

function PostCard({ post, onReadPost }: Props) {
  return (
    <Container onClick={() => onReadPost(post.id)}>
      <Thumbnail src={post.thumbnail} alt="Thumbnail" />

      <h2>{post.title}</h2>

      <Body>
        <Markdown markdown={post.body} />
      </Body>

      <TagBox>
        {post.tags.map((tag) => (
          <Tag key={tag}>#{tag}</Tag>
        ))}
      </TagBox>

      <DateBox>{formatDate(post.created_at.toString())}</DateBox>
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 3rem;
  transition: 0.4s color;
  cursor: pointer;

  &:hover {
    h2 {
      color: #423ec8;
    }

    img {
      filter: brightness(100%);
    }
  }

  h2 {
    margin-top: 6px;
    cursor: pointer;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  margin: 0;
  border: none;
  filter: brightness(95%);
`;

const Body = styled.div`
  margin-top: -5px;
`;

const TagBox = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 22px;
`;

const Tag = styled.div`
  border: 1px solid #35d3b1;
  border-radius: 15px;
  padding: 5px 10px;
  background: #35d3b1;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
  transition: 0.2s all;
  &:hover {
    color: #35d3b1;
    background-color: #fff;
  }
  & + & {
    margin-left: 0.7rem;
  }
`;

const DateBox = styled.div`
  margin-top: 14px;
`;

export default PostCard;
