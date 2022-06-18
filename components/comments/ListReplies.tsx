import React from 'react';
import styled from 'styled-components';
import ReplyItem from './ReplyItem';

interface Props {
  replies: ReplyType[];
}

function ListReplies({ replies }: Props) {
  return (
    <Container>
      {replies.map((reply) => (
        <ReplyItem key={reply.id} reply={reply} />
      ))}
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.2rem;
  padding-left: 4.1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

export default ListReplies;
