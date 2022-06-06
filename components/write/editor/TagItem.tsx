import React from 'react';
import styled from 'styled-components';

// Styles
const Container = styled.div`
  border: 1px solid #35d3b1;
  border-radius: 15px;
  padding: 6px 10px 5px 10px;
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

interface Props {
  tag: string;
  onRemove: (tag: string) => void;
}

const TagItem = React.memo<Props>(({ tag, onRemove }) => (
  <Container onClick={() => onRemove(tag)}>#{tag}</Container>
));

export default TagItem;
