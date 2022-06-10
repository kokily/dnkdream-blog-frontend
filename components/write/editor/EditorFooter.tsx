import type { MouseEvent } from 'react';
import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';

interface Props {
  onBack: () => void;
  onSubmit: (e: MouseEvent) => void;
  onUploadImage: (isThumbnail: boolean) => void;
  isEdit?: boolean;
}

function EditorFooter({ onBack, onSubmit, onUploadImage, isEdit }: Props) {
  return (
    <Container>
      <Button back onClick={onBack}>
        뒤로가기
      </Button>
      <Button submit onClick={onSubmit}>
        {isEdit ? '저장하기' : '등록하기'}
      </Button>
      <Button upload onClick={() => onUploadImage(false)}>
        업로드
      </Button>
    </Container>
  );
}

// Styles
const Container = styled.div`
  position: fixed;
  bottom: 0px;
  padding-left: 5rem;
  padding-right: 5rem;
  width: 100%;
  height: 4rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  button + button {
    margin-left: 1rem;
  }
`;

export default EditorFooter;
