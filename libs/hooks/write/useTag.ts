import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  tags: string[];
  onChangeTags: (nextTags: string[]) => void;
}

function useTags({ tags, onChangeTags }: Props) {
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState<string[]>([]);

  const addTag = useCallback(
    (tag: string) => {
      if (!tag) return;
      if (localTags.includes(tag)) return;

      const nextTags = [...localTags, tag];

      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags]
  );

  const removeTag = useCallback(
    (tag: string) => {
      const nextTags = localTags.filter((text) => text !== tag);

      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags]
  );

  const onChangeText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const onAddTag = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      addTag(input.trim());
      setInput('');
    },
    [input, addTag]
  );

  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  return {
    input,
    localTags,
    onChangeText,
    onAddTag,
    removeTag,
  };
}

export default useTags;
