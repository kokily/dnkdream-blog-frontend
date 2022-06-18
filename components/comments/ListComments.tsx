import React from 'react';
import styled from 'styled-components';
import AddComment from './AddComment';
import CommentItem from './CommentItem';

interface Props {
  comments: CommentType[];
  postId: string;
  user: UserType | null;
}

function ListComments({ comments, postId, user }: Props) {
  return (
    <Container>
      <CountPane>댓글 {comments.length}개</CountPane>
      <AddComment postId={postId} />
      <ListBox>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} user={user} />
        ))}
      </ListBox>
    </Container>
  );
}

// Styles
const Container = styled.div`
  margin-top: 12rem;
  margin-bottom: 15rem;
  padding: 0.2rem;
`;

const CountPane = styled.div`
  font-size: 1.215rem;
  margin-bottom: 0.5rem;
`;

const ListBox = styled.div`
  margin-top: 3rem;
`;

export default ListComments;
