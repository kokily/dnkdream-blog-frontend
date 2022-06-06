import React from 'react';
import styled from 'styled-components';
import Input from '../auth/Input';
import InputGroup from '../auth/InputGroup';
import AddTagBox from './editor/AddTagBox';
import EditorFooter from './editor/EditorFooter';
import EditorTitle from './editor/EditorTitle';
import QuillEditor from './editor/QuillEditor';
import ThumbnailBox from './editor/ThumbnailBox';
import useTags from './hooks/useTag';
import useWrite from './hooks/useWrite';

interface Props {
  isEdit: boolean;
}

function Write({ isEdit }: Props) {
  const {
    category,
    title,
    body,
    thumbnail,
    tags,
    onChangeCategory,
    onChangeTitle,
    onChangeBody,
    onChangeTags,
    onUploadImage,
    onBack,
    onWrite,
  } = useWrite();
  const { input, localTags, onChangeText, onAddTag, removeTag } = useTags({
    tags,
    onChangeTags,
  });

  return (
    <Container>
      <EditorBox>
        <EditorContents>
          <EditorTitle
            placeholder="제목을 입력하세요"
            onChange={onChangeTitle}
            value={title}
          />

          <CategoryBox>
            <InputGroup
              type="text"
              name="category"
              value={category}
              onChange={onChangeCategory}
              label="카테고리 입력"
            />
          </CategoryBox>

          <TagBox>
            <AddTagBox
              input={input}
              localTags={localTags}
              onChangeText={onChangeText}
              onAddTag={onAddTag}
              removeTag={removeTag}
            />
          </TagBox>

          <ThumbnailBox thumbnail={thumbnail} onUploadImage={onUploadImage} />

          <QuillEditor isEdit={isEdit} QuillChange={onChangeBody} body={body} />
        </EditorContents>

        <EditorFooter
          onBack={onBack}
          onSubmit={onWrite}
          onUploadImage={onUploadImage}
        />
      </EditorBox>
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

const EditorContents = styled.div`
  padding-top: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const CategoryBox = styled.div`
  width: 120px;
  height: 60px;
  display: flex;
  margin-left: 1rem;
`;

const TagBox = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 2.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

export default Write;
