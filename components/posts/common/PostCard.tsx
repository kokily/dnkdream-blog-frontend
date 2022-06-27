import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import formatDate from '../../../libs/utils/formatDate';
import { media } from '../../../styles';

interface Props {
  post: PostType;
  onReadPost: (id: string) => void;
  onTagPost: (tag: string) => void;
}

function PostCard({ post, onReadPost, onTagPost }: Props) {
  return (
    <Container>
      <Thumbnail onClick={() => onReadPost(post.id)}>
        <Image src={post.thumbnail} alt="Thumbnail" width={650} height={360} />
      </Thumbnail>

      <h2 onClick={() => onReadPost(post.id)}>
        {post.title}{' '}
        {post.comments.length > 0 && <small>[ {post.comments.length} ]</small>}
      </h2>

      <TagBox>
        {post.tags.map((tag) => (
          <Tag key={tag} onClick={() => onTagPost(tag)}>
            #{tag}
          </Tag>
        ))}
      </TagBox>

      <DateBox>{formatDate(post.created_at.toString())} 작성</DateBox>
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

    small {
      font-size: 0.95rem;
      color: #2040a9;
    }
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 360px;
  margin: 0;
  border: none;

  img {
    filter: brightness(95%);
  }

  ${media.small} {
    height: auto;
  }
`;

const TagBox = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 5px;

  ${media.small} {
    margin-top: 0;
  }
`;

const Tag = styled.div`
  border: 1px solid #35d3b1;
  border-radius: 15px;
  padding: 5px 10px;
  margin-bottom: 5px;
  background: #35d3b1;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
  transition: 0.2s all;
  &:hover {
    color: #35d3b1;
    background-color: #fff;
  }

  margin-right: 5px;

  ${media.small} {
    margin-left: 0;
  }
`;

const DateBox = styled.div`
  margin-top: 14px;
`;

export default PostCard;
