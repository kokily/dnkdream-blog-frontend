import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { media } from '../../styles';
import PostTitle from './PostTitle';
import Markdown from '../common/Markdown';
import RemoveModal from './RemoveModal';
import Button from '../common/Button';

interface Props {
  user: UserType | null;
  post: PostType;
  onBack: () => void;
  onEdit: () => void;
  modal: boolean;
  onRemoveClick: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

function ReadPost({
  user,
  post,
  onBack,
  onEdit,
  modal,
  onRemoveClick,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <>
      <Container>
        <Link href={`/category/${post.category}`} passHref>
          <CategoryLink>카테고리 &gt; {post.category}</CategoryLink>
        </Link>

        <PostTitle post={post} />
      </Container>

      <PostContent>
        <Markdown markdown={post.body} />
      </PostContent>

      <PostButtons>
        <Button back onClick={onBack}>
          뒤로가기
        </Button>
        {user && user.admin && (
          <>
            <Button upload onClick={onEdit}>
              수정하기
            </Button>
            <Button remove onClick={onRemoveClick}>
              삭제하기
            </Button>
          </>
        )}
      </PostButtons>

      <RemoveModal visible={modal} onCancel={onCancel} onConfirm={onConfirm} />
    </>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 950px;
  border-bottom: 0.2rem outset #38d9a9;
  margin-top: 1.5rem;
  margin-bottom: 10rem;
  ${media.medium} {
    margin-bottom: 1.5rem;
  }
`;

const CategoryLink = styled.a`
  cursor: pointer;
  color: #1c7ed6;
  &:hover {
    color: #1971c2;
    font-weight: bold;
  }
`;

const PostContent = styled.div`
  font-size: 1.2rem;
  margin-bottom: 17rem;
  ${media.medium} {
    margin-bottom: 0;
  }
`;

const PostButtons = styled.div`
  margin-top: 4rem;
  margin-bottom: 4.5rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  ${media.medium} {
    margin-top: 0;
    margin-bottom: 2rem;
  }

  button + button {
    margin-left: 0.4rem;
  }
`;

export default ReadPost;
