import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { media } from '../../styles';
import useListTags from '../../libs/hooks/tags/useListTags';

function RightSide() {
  const router = useRouter();
  const { tags } = useListTags();

  const onTagPost = (tag: string) => {
    router.push(`/tag/${tag}`);
  };

  return (
    <Container>
      <Title>태그 목록</Title>

      <TagBox>
        {tags?.map((tag) => (
          <span key={tag} className="tag" onClick={() => onTagPost(tag)}>
            #{tag}
          </span>
        ))}
      </TagBox>
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
`;

const Title = styled.h2`
  color: #303030;
`;

const TagBox = styled.div`
  display: inline;

  .tag {
    display: inline-block;
    border: 1px solid #408ac3;
    border-radius: 15px;
    padding: 5px 10px;
    margin-bottom: 5px;
    background: #408ac3;
    font-weight: bold;
    cursor: pointer;
    color: #fff;
    transition: 0.2s all;
    margin-right: 4px;
    &:hover {
      color: #408ac3;
      background-color: #fff;
    }

    ${media.small} {
      margin-left: 0;
    }
  }
`;

export default RightSide;
