import React from 'react';
import styled from 'styled-components';

interface Props {
  reply: ReplyType;
}

function ReplyItem({ reply }: Props) {
  return <Container>{reply.reply_body}</Container>;
}

// Styles
const Container = styled.div``;

export default ReplyItem;
