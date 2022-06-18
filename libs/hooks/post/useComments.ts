import type { ChangeEvent, MouseEvent } from 'react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  addCommentAPI,
  listCommentsAPI,
  removeCommentAPI,
  updateCommentAPI,
} from '../../api/comments';

function useComments(postId: string) {
  const queryClient = useQueryClient();
  const { data: comments } = useQuery(
    'comments',
    () => listCommentsAPI(postId),
    {
      enabled: true,
    }
  );
  const addCommentMutate = useMutation(addCommentAPI);
  const removeCommentMutate = useMutation(removeCommentAPI);
  const updateCommentMutate = useMutation(updateCommentAPI);
  const [inputs, setInputs] = useState({
    comment_username: '',
    comment_password: '',
    comment_body: '',
  });
  const { comment_username, comment_password, comment_body } = inputs;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onAddComment = async (e: MouseEvent) => {
    e.preventDefault();

    if ([comment_username, comment_password, comment_body].includes('')) {
      toast.error('빈 칸을 채워주세요');
      return;
    }

    try {
      const addComment = await addCommentMutate.mutateAsync({
        postId,
        comment_username,
        comment_password,
        comment_body,
      });

      if (!addComment) {
        toast.error('댓글 작성 실패');
        return;
      }

      toast.success('댓글 작성');
      setInputs({
        comment_username: '',
        comment_password: '',
        comment_body: '',
      });
      await queryClient.invalidateQueries('comments');
    } catch (err: any) {
      toast.error(err);
    }
  };

  const onRemoveComment = async (id: string, password: string) => {
    try {
      const removeComment = await removeCommentMutate.mutateAsync({
        id,
        password,
      });

      if (!removeComment) {
        toast.error('');
      }

      toast.success('댓글이 삭제되었습니다');
      await queryClient.invalidateQueries('comments');
    } catch (err: any) {
      toast.error(err);
    }
  };

  return {
    comments,
    comment_username,
    comment_password,
    comment_body,
    onChange,
    onAddComment,
    onRemoveComment,
  };
}

export default useComments;
