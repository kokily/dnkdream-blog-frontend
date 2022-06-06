import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import React from 'react';
import styled from 'styled-components';

interface Props {
  category: string;
  title: string;
  body: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeBody: Dispatch<SetStateAction<string>>;
  children: React.ReactNode;
}

function WriteBody({
  category,
  title,
  body,
  onChange,
  onChangeBody,
  children,
}: Props) {
  return (
    <Container>
      <EditorBox>WriteBody</EditorBox>
    </Container>
  );
}

// Styles
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  animation: fadeIn 0.5s forwards;
`;

const EditorBox = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default WriteBody;
