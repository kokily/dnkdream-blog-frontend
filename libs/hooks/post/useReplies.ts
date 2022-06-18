import type { ChangeEvent, MouseEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { addReplyAPI, removeReplyAPI, updateReplyAPI } from '../../api/replies';
import { useUserState } from '../../context/UserContext';

function useReplies(commentId: string, reply?: ReplyType) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id }: { id?: string } = router.query;
  const [user] = useUserState();
  const addReplyMutate = useMutation(addReplyAPI);
  const removeReplyMutate = useMutation(removeReplyAPI);
  const updateReplyMutate = useMutation(updateReplyAPI);
  const [body, setBody] = useState(reply ? reply.reply_body : '');
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const onAddReply = async (e: MouseEvent) => {
    e.preventDefault();

    if (body === '') {
      toast.error('대댓글 내용을 작성해 주세요.');
      return;
    }

    try {
      const addReply = await addReplyMutate.mutateAsync({
        reply_body: body,
        commentId,
        postId: id!,
      });

      if (!addReply) {
        toast.error('대댓글 작성 실패');
        return;
      }

      toast.success('대댓글 저장');
      await queryClient.invalidateQueries('comments');
      setBody('');
    } catch (err: any) {
      toast.error(err);
    }
  };

  const onRemoveReply = async () => {
    try {
      const removeReply = await removeReplyMutate.mutateAsync(reply!.id);

      if (!removeReply) {
        toast.error('대댓글 삭제 실패');
        return;
      }

      toast.success('대댓글 삭제');
      await queryClient.invalidateQueries('comments');
    } catch (err: any) {
      toast.error(err);
    }
  };

  const onUpdateReply = async () => {
    if (body === '') {
      toast.error('대댓글을 입력하세요');
      return;
    }

    if (reply) {
      try {
        const updateReply = await updateReplyMutate.mutateAsync({
          id: reply.id,
          reply_body: body,
        });

        if (!updateReply) {
          toast.error('대댓글 수정 실패');
          return;
        }

        toast.success('대댓글 수정');
        await queryClient.invalidateQueries('comments');
        setBody('');
      } catch (err: any) {
        toast.error(err);
      }
    } else {
      return;
    }
  };

  const onRemoveClick = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
  };

  const onConfirm = () => {
    onRemoveReply();
    setModal(false);
  };

  const onToggleEdit = () => {
    setEdit(!edit);
  };

  return {
    user,
    body,
    onChange,
    onAddReply,
    onUpdateReply,
    modal,
    onRemoveClick,
    onCancel,
    onConfirm,
    edit,
    onToggleEdit,
  };
}

export default useReplies;
