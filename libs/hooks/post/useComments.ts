import type { ChangeEvent, MouseEvent } from 'react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { addCommentAPI, listCommentsAPI } from '../../api/comments';

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

  return {
    comments,
    comment_username,
    comment_password,
    comment_body,
    onChange,
    onAddComment,
  };
}

export default useComments;
