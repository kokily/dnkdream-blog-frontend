import type { ChangeEvent } from 'react';
import React from 'react';
import styled from 'styled-components';
import TagsList from './TagsList';

interface Props {
  input: string;
  onAddTag: (e: ChangeEvent<HTMLFormElement>) => void;
  onChangeText: (e: ChangeEvent<HTMLInputElement>) => void;
  localTags: string[];
  removeTag: (tag: string) => void;
}

function AddTagBox({
  input,
  localTags,
  onChangeText,
  onAddTag,
  removeTag,
}: Props) {
  return (
    <Container>
      <p>태그 ☞</p>

      <TagForm onSubmit={onAddTag}>
        <Input
          placeholder="엔터로 추가"
          value={input}
          onChange={onChangeText}
        />
        <Button type="submit">추가</Button>
      </TagForm>

      <TagsList tags={localTags} onRemove={removeTag} />
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1.125rem;
  font-weight: bold;
  word-break: keep-all;
  p {
    margin-right: 1.3rem;
  }
`;

const TagForm = styled.form`
  background: none;
`;

const Input = styled.input`
  width: 120px;
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  background: none;
  &::placeholder {
    color: #777;
  }
`;

const Button = styled.button`
  color: #3db7cc;
  border: 1px solid #3db7cc;
  border-radius: 8px;
  background: none;
  padding: 0.3rem 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    background: #58aebd;
    color: white;
    border: 1px solid #88c0ca;
  }
  &:active {
    transform: translateY(2px);
  }
`;

export default AddTagBox;
