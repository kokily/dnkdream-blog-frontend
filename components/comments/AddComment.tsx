import React from 'react';
import styled from 'styled-components';
import useComments from '../../libs/hooks/post/useComments';
import { media } from '../../styles';
import Button from '../common/Button';

interface Props {
  postId: string;
}

function AddComment({ postId }: Props) {
  const {
    comment_username,
    comment_password,
    comment_body,
    onChange,
    onAddComment,
  } = useComments(postId);

  return (
    <Container>
      <UserInfo>
        <InputGroup>
          <input
            type="text"
            name="comment_username"
            value={comment_username}
            onChange={onChange}
            placeholder="이름"
          />
        </InputGroup>
        <InputGroup style={{ marginLeft: '0.4rem' }}>
          <input
            type="password"
            name="comment_password"
            value={comment_password}
            onChange={onChange}
            placeholder="비밀번호"
          />
        </InputGroup>
      </UserInfo>
      <Content
        name="comment_body"
        value={comment_body}
        onChange={onChange}
        placeholder="댓글을 작성하세요"
      />
      <ButtonBox>
        <Button submit onClick={onAddComment}>
          댓글 작성
        </Button>
      </ButtonBox>
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  display: flex;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  max-width: 100%;
  height: 36px;
  align-items: center;
  margin-right: 1rem;

  ${media.medium} {
    margin: 0;
  }

  input {
    width: 100%;
    height: 100%;
    border: 1px solid #c9c4c4;
    border-radius: 4px;
    padding: 0.3rem;
  }
`;

const Content = styled.textarea`
  margin: 0;
  width: 100%;
  height: auto;
  resize: none;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 1px solid #c9c4c4;
  border-radius: 4px;
  min-height: 6.4rem;
  font-size: 1rem;
  line-height: 1.5;
`;

const ButtonBox = styled.div`
  display: flex;
  margin-top: 0.4rem;
  justify-content: flex-end;
`;

export default AddComment;
