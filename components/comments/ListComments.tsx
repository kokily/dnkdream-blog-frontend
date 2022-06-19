import React from 'react';
import styled from 'styled-components';
import useComments from '../../libs/hooks/post/useComments';
import AddComment from './AddComment';
import CommentItem from './CommentItem';

interface Props {
  postId: string;
  user: UserType | null;
}

function ListComments({ postId, user }: Props) {
  const { comments } = useComments(postId);

  return (
    <Container>
      <CountPane>댓글 {comments ? comments.length : 0}개</CountPane>
      <AddComment postId={postId} />
      <ListBox>
        {comments &&
          comments.map((comment) => (
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
