import React from 'react';
import styled from 'styled-components';
import Button from './Button';

interface Props {
  visible: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function Modal({ visible, title, content, onConfirm, onCancel }: Props) {
  if (!visible) return null;

  return (
    <Container>
      <Contents>
        <h2>{title}</h2>
        <p>{content}</p>

        <ButtonGroup>
          <Button remove onClick={onCancel}>
            취소
          </Button>
          <Button submit onClick={onConfirm}>
            삭제
          </Button>
        </ButtonGroup>
      </Contents>
    </Container>
  );
}

// Styles
const Container = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Contents = styled.div`
  width: 320px;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  animation: 0.3s ease-out 0s 1 slideUpFromBottom;
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 3rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;

  button + button {
    margin-left: 0.4rem;
  }
`;

export default Modal;
