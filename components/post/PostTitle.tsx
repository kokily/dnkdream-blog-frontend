import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import formatDate from '../../libs/utils/formatDate';
import { media, shadow } from '../../styles';

interface Props {
  post: PostType;
  onTagPost: (tag: string) => void;
}

function PostTitle({ post, onTagPost }: Props) {
  return (
    <Container>
      <Title>{post.title}</Title>
      <p>{formatDate(post.created_at.toString())} 작성</p>

      <TagBox>
        {post.tags.map((tag, i) => (
          <div key={i} className="tag" onClick={() => onTagPost(tag)}>
            #{tag}
          </div>
        ))}
      </TagBox>

      <ThumbnailBox>
        <Image src={post.thumbnail} alt="썸네일" width={650} height={450} />
      </ThumbnailBox>
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 2.1rem;

  p {
    font-weight: bold;
    color: #8c8585;
  }

  ${media.medium} {
    padding-right: 0.5rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #5c7cfa;
  ${media.medium} {
    font-size: 2.5rem;
  }
`;

const TagBox = styled.div`
  .tag {
    display: inline-block;
    font-size: 1.1rem;
    font-weight: 600;
    color: #1098ad;
    margin-right: 0.5rem;
    cursor: pointer;
    transition: 0.2s all;
    &:hover {
      color: #3bc9db;
    }
    ${media.medium} {
      font-size: 1rem;
    }
  }
`;

const ThumbnailBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1.215rem;
  img {
    width: 100%;
    max-width: 650px;
    height: auto;
    filter: sepia(40%);
    border: 1px solid white;
    border-radius: 4px;
    padding: 5px;
    ${shadow(2)};

    ${media.medium} {
      width: 100% !important;
    }
  }
`;

export default PostTitle;
