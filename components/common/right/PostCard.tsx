import React from 'react';
import styled from 'styled-components';

interface Props {
  title?: string;
  body?: string;
  thumbnail?: string;
  tags?: string[];
}

function PostCard({ title, body, thumbnail, tags }: Props) {
  return <Container>PostCard</Container>;
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default PostCard;
