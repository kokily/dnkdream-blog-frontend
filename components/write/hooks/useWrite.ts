import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addPostAPI,
  readPostAPI,
  updatePostAPI,
} from '../../../libs/api/posts';
import { toast } from 'react-toastify';

function useWrite(edit?: boolean) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id }: { id?: string } = router.query;
  const [inputs, setInputs] = useState({
    category: '',
    title: '',
    thumbnail: '',
  });
  const [body, setBody] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const { category, title, thumbnail } = inputs;
  const { data: post } = useQuery('post', () => readPostAPI(id!), {
    onSuccess: (data) => {
      setInputs({
        ...inputs,
        category: data.category,
        title: data.title,
        thumbnail: data.thumbnail,
      });
      setBody(data.body);
      setTags(data.tags);
    },
    onError: () => console.log(''),
  });
  const { mutate: addPost } = useMutation(addPostAPI, {
    onSuccess: (data) => {
      toast.success('포스트 작성 성공!');
      router.push(`/post/${data.id}`);
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });
  const { mutate: updatePost } = useMutation(updatePostAPI, {
    onSuccess: (data) => {
      toast.success('포스트 수정 완료!');
      queryClient.invalidateQueries('post');
      router.push(`/post/${data.id}`);
    },
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onChangeTags = (nextTags: string[]) => {
    setTags(nextTags);
  };

  const onWrite = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();

      if ([category, title, body, thumbnail, tags].includes('')) {
        toast.error('빈 내용 없이 입력하세요.');
        return;
      }

      let overlapTags =
        tags === [] ? [] : [...new Set(tags.map((tag) => tag.trim()))];

      if (!edit) {
        addPost({ category, title, body, thumbnail, tags: overlapTags });
      } else if (id) {
        updatePost({
          id,
          category,
          title,
          body,
          thumbnail,
          tags: overlapTags,
        });
      }
    },
    [category, title, body, tags, thumbnail, addPost]
  );

  // Image Uploads
  const onUploadImage = (isThumbnail: boolean) => {
    const upload = document.createElement('input');

    upload.type = 'file';
    upload.onchange = async (e) => {
      if (!upload.files) return;

      const file = upload.files[0];
      const formData = new FormData();

      formData.append('file', file);

      const response = await fetch('http://localhost:4000/api/upload', {
        method: 'post',
        body: formData,
      });

      if (!response) {
        toast.error('업로드 에러 발생!');
        return;
      }

      const data = await response.json();

      if (isThumbnail) {
        setInputs({
          ...inputs,
          thumbnail: `https://image.dnkdream.com/${data.key}`,
        });
      } else {
        let oldBody = body;
        let newBody = `${oldBody}\n\n![](${data.url})`;
        setBody(newBody);
      }
    };

    upload.click();
  };

  return {
    category,
    title,
    thumbnail,
    body,
    tags,
    onChange,
    onChangeTags,
    setBody,
    onWrite,
    onUploadImage,
  };
}

export default useWrite;
