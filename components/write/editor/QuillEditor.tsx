import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DragDrop from './DragDrop';
import { modules } from './config';
import { media } from '../../../styles';
import { imageUpload } from '../../../libs/api/upload';
import { toast } from 'react-toastify';

interface Props {
  isEdit: boolean;
  QuillChange: (text: string) => void;
  body: string;
}

function QuillEditor({ isEdit, QuillChange, body }: Props) {
  const Quill = typeof window === 'object' ? require('quill') : () => false;
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  const onClickImage = () => {
    const upload = document.createElement('input');

    upload.setAttribute('type', 'file');
    upload.setAttribute('accept', 'image/*');
    upload.click();

    upload.onchange = async function () {
      if (!upload.files) return;

      const file = upload.files[0];
      const formData = new FormData();

      formData.append('file', file);

      const response = await imageUpload(formData);

      if (!response) {
        toast.error('업로드 에러 발생!');
        return;
      }

      // @ts-ignore
      const range = quillInstance.current.getSelection(true);

      // @ts-ignore
      quillInstance.current.insertEmbed(
        range.index,
        'image',
        `https://image.dnkdream.com/${response.key}`
      );
      // @ts-ignore
      quillInstance.current.setSelection(range.index + 1);
    };
  };

  const onDragDropUpload = useCallback(async (file: File) => {
    try {
      const formData = new FormData();

      formData.append('file', file);

      const response = await imageUpload(formData);

      if (!response) {
        toast.error('업로드 에러 발생!');
        return;
      }

      // @ts-ignore
      const range = quillInstance.current.getSelection(true);

      // @ts-ignore
      quillInstance.current.insertEmbed(
        range.index,
        'image',
        `https://image.dnkdream.com/${response.key}`
      );
      // @ts-ignore
      quillInstance.current.setSelection(range.index + 1);
    } catch (err: any) {
      toast.error(err);
    }
  }, []);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'snow',
      placeholder: '게시글 내용을 작성하세요',
      modules,
    });

    const quill = quillInstance.current;

    // @ts-ignore
    quill.on('text-change', () => {
      // @ts-ignore
      QuillChange(quill.root.innerHTML);
    });

    // @ts-ignore
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', onClickImage);
  }, []);

  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;

    if (body) {
      mounted.current = true;
      // @ts-ignore
      quillInstance.current.root.innerHTML = body;
    }
  }, [body]);

  return (
    <>
      <Container>
        <div ref={quillElement} style={{ border: 'none' }} />
      </Container>
      <DragDrop onUpload={onDragDropUpload} />
    </>
  );
}

// Styles
const Container = styled.div`
  top: 0px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 650px;
  font-size: 1.125rem;
  margin-bottom: 5rem;

  .ql-toolbar {
    border: none;
    border-bottom: 1px solid #777;
  }
  .ql-container {
    flex: 1 1 0%;
    min-height: 0px;
  }
  img {
    width: 100%;
    height: 100%;
    max-width: 650px !important;
  }
  .ql-video {
    display: block;
    width: 100vw;
    height: 100vh;
    max-width: 650px;
    max-height: 480px;

    ${media.medium} {
      width: 100%;
      height: 100%;
    }
  }
`;

export default QuillEditor;
