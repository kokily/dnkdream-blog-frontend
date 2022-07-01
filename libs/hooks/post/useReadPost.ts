import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { readPostAPI, removePostAPI } from '../../api/posts';
import shareUrl from '../../utils/shareUrl';

function useReadPost() {
  const router = useRouter();
  const { id }: { id?: string } = router.query;
  const { data } = useQuery('readPost', () => readPostAPI(id!), {
    enabled: true,
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

  const onSharePost = () => {
    shareUrl(`https://dnkdream.com/post/${router.query.id}`);
    toast.success('링크가 복사되었습니다');
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
    onSharePost,
    modal,
    onRemoveClick,
    onCancel,
    onConfirm,
  };
}

export default useReadPost;
