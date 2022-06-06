import React from 'react';
import styled from 'styled-components';
import AddTagBox from './editor/AddTagBox';
import EditorTitle from './editor/EditorTitle';
import ThumbnailBox from './editor/ThumbnailBox';
import useTags from './hooks/useTag';
import useWrite from './hooks/useWrite';
import WriteBody from './WriteBody';

function Write() {
  const {
    category,
    title,
    body,
    thumbnail,
    tags,
    onChange,
    onChangeTags,
    setBody,
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
            onChange={onChange}
            value={title}
          />

          <TagBox>
            <AddTagBox
              input={input}
              localTags={localTags}
              onChangeText={onChangeText}
              onAddTag={onAddTag}
              removeTag={removeTag}
            />
          </TagBox>

          {thumbnail && <>썸네일 뿅!</>}
        </EditorContents>
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

const TagBox = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 2.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

export default Write;
