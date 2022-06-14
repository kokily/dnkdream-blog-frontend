import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { readPostAPI, removePostAPI } from '../../api/posts';

function useReadPost() {
  const router = useRouter();
  const { id }: { id?: string } = router.query;
  const { data } = useQuery('readPost', () => readPostAPI(id!), {
    enabled: true,
    staleTime: 1000,
  });
  const { mutate: removePost } = useMutation(removePostAPI);
  const [modal, setModal] = useState(false);

  const onBack = () => {
    router.back();
  };

  const onEdit = () => {
    router.push(`/write/edit/${id}`);
  };

  const onRemovePost = useCallback(() => {
    if (id) {
      removePost(id);
      toast.warning('포스트 삭제!!');
      router.back();
    } else {
      return;
    }
  }, [removePost]);

  const onTagPost = (tag: string) => {
    router.push(`/tag/${tag}`);
  };

  const onRemoveClick = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
  };

  const onConfirm = () => {
    onRemovePost();
    setModal(false);
  };

  return {
    post: data?.post,
    next: data?.next,
    prev: data?.prev,
    onBack,
    onEdit,
    onTagPost,
    modal,
    onRemoveClick,
    onCancel,
    onConfirm,
  };
}

export default useReadPost;
