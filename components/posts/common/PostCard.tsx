import React from 'react';
import styled from 'styled-components';

interface Props {}

function PostCard({}: Props) {
  return (
    <Container>
      <Thumbnail src="/assets/images/thumbnail1.png" alt="Thumbnail" />

      <h2>포스트 제목</h2>

      <Body>포스트 내용 들어가는 곳</Body>

      <TagBox>
        <Tag>#태그</Tag>
        <Tag>#포스트</Tag>
        <Tag>#연습 중</Tag>
      </TagBox>

      <DateBox>2022년 6월 5일 작성</DateBox>
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
