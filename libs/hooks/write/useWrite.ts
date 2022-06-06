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
import useHeader from '../common/useHeader';
import { imageUpload } from '../../../libs/api/upload';

function useWrite(edit?: boolean) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toggleMenu } = useHeader();
  const { id }: { id?: string } = router.query;
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  useQuery('post', () => readPostAPI(id!), {
    onSuccess: (data) => {
      setCategory(data.category);
      setTitle(data.title);
      setBody(data.body);
      setThumbnail(data.thumbnail);
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

  const onChangeCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const onChangeBody = (text: string) => {
    setBody(text);
  };

  const onChangeTags = (nextTags: string[]) => {
    setTags(nextTags);
  };

  const onBack = () => {
    router.back();
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

      const response = await imageUpload(formData);

      if (!response) {
        toast.error('업로드 에러 발생!');
        return;
      }

      if (isThumbnail) {
        setThumbnail(`https://image.dnkdream.com/${response.key}`);
      } else {
        let oldBody = body;
        let newBody = `${oldBody}\n\n![](https://image.dnkdream.com/${response.key})`;
        setBody(newBody);
      }
    };

    toggleMenu();
    upload.click();
  };

  return {
    category,
    title,
    thumbnail,
    body,
    tags,
    onChangeCategory,
    onChangeTitle,
    onChangeBody,
    onChangeTags,
    onBack,
    onWrite,
    onUploadImage,
  };
}

export default useWrite;
