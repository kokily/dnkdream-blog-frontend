import type { ChangeEvent, MouseEvent } from 'react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  confirmPasswordAPI,
  removeCommentAPI,
  updateCommentAPI,
} from '../../api/comments';

function useEditComment(comment: CommentType) {
  const queryClient = useQueryClient();
  const confirmPasswordMutate = useMutation(confirmPasswordAPI);
  const updateCommentMutate = useMutation(updateCommentAPI);
  const removeCommentMutate = useMutation(removeCommentAPI);
  const [password, setPassword] = useState('');
  const [body, setBody] = useState(comment.comment_body);
  const [menu, toggleMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const onToggleMenu = () => {
    toggleMenu(!menu);
  };

  const onConfirmPassword = async (password: string) => {
    try {
      const confirmPassword = await confirmPasswordMutate.mutateAsync({
        id: comment.id,
        password,
      });

      if (!confirmPassword) {
        toast.error('비밀번호가 틀렸습니다');
        return;
      }

      setEdit(true);
    } catch (err: any) {
      toast.error(err);
    }
  };

  const onPasswordClick = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
  };

  const onConfirm = () => {
    onConfirmPassword(password);
    setModal(false);
  };

  const onUpdateComment = async (e: MouseEvent) => {
    e.preventDefault();

    if (body === '') {
      toast.error('내용을 채워주세요');
      return;
    }

    try {
      const updateComment = await updateCommentMutate.mutateAsync({
        id: comment.id,
        comment_body: body,
      });

      if (!updateComment) {
        toast.error('댓글 수정 에러!');
        return;
      }

      toast.success('댓글 수정');
      await queryClient.invalidateQueries('comments');
      setPassword('');
      setBody(comment.comment_body);
      toggleMenu(false);
      setModal(false);
      setEdit(false);
    } catch (err: any) {
      toast.error(err);
    }
  };

  const onRemoveComment = async (id: string) => {
    if (window.confirm('정말 삭제하세요?')) {
      try {
        const removeComment = await removeCommentMutate.mutateAsync({
          id,
          password,
        });

        if (!removeComment) {
          toast.error('댓글 삭제 실패');
          return;
        }

        toast.success('댓글 삭제');
        await queryClient.invalidateQueries('comments');
        setPassword('');
        setBody(comment.comment_body);
        toggleMenu(false);
        setModal(false);
        setEdit(false);
      } catch (err: any) {
        toast.error(err);
      }
    } else {
      return;
    }
  };

  return {
    password,
    onChangePassword,
    body,
    onChangeBody,
    menu,
    onToggleMenu,
    modal,
    onPasswordClick,
    onCancel,
    onConfirm,
    edit,
    onUpdateComment,
    onRemoveComment,
  };
}

export default useEditComment;
