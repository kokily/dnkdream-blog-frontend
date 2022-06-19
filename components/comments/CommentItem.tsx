import React from 'react';
import styled, { css } from 'styled-components';
import { FaCaretDown, FaCaretSquareDown } from 'react-icons/fa';
import formatDate from '../../libs/utils/formatDate';
import ListReplies from './ListReplies';
import Button from '../common/Button';
import useEditComment from '../../libs/hooks/post/useEditComment';
import PasswordModal from './PasswordModal';
import AddReply from './AddReply';

interface Props {
  comment: CommentType;
  user: UserType | null;
}

function CommentItem({ comment, user }: Props) {
  const {
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
  } = useEditComment(comment);

  return (
    <Container>
      <Contents>
        <CommentHeader>
          <Avatar>{comment.comment_username.slice(0, 2)}</Avatar>
          <InfoBox>
            <div className="name">{comment.comment_username}</div>
            <div className="date">
              {formatDate(comment.created_at.toString())} 작성
            </div>
          </InfoBox>

          <div className="right">
            {comment.deleted ? null : edit ? (
              <span>
                <Button remove onClick={() => onRemoveComment(comment.id)}>
                  삭제하기
                </Button>
                <Button upload onClick={onUpdateComment}>
                  수정하기
                </Button>
              </span>
            ) : (
              <>
                {menu ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                    }}
                  >
                    <FaCaretSquareDown size={24} onClick={onToggleMenu} />
                    <Button comment onClick={onPasswordClick}>
                      비밀번호
                    </Button>
                  </div>
                ) : (
                  <FaCaretDown size={24} onClick={onToggleMenu} />
                )}
              </>
            )}
          </div>
        </CommentHeader>

        <CommentBody deleted={comment.deleted}>
          {comment.deleted ? (
            '댓글이 삭제되었습니다.'
          ) : edit ? (
            <UpdateBody name="body" value={body} onChange={onChangeBody} />
          ) : (
            comment.comment_body
          )}
        </CommentBody>

        {comment.replies.length > 0 && (
          <ListReplies replies={comment.replies} />
        )}
      </Contents>

      {user && <AddReply commentId={comment.id} />}

      <PasswordModal
        visible={modal}
        onCancel={onCancel}
        onConfirm={onConfirm}
        password={password}
        onChange={onChangePassword}
      />
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.4rem;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
  display: flex;
  position: relative;
  height: 50px;

  .right {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    margin-right: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      button + button {
        margin-left: 0.5rem;
      }
    }
  }
`;

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.2rem;
  padding: 0;
  padding-top: 0.3rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-transform: uppercase;
  font-size: 1.215rem;
  font-weight: bold;
  background: #2ab8bd;
  color: white;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 0;

  .name {
    font-weight: bold;
    margin-bottom: 0.2rem;
  }

  .date {
    color: #9e9e9e;
  }
`;

const CommentBody = styled.pre<{ deleted?: boolean }>`
  margin-left: 4rem;
  padding: 0.5rem;
  word-break: keep-all;
  font-size: 1rem;
  line-height: 1.6;
  border-radius: 8px;
  white-space: normal;

  ${(props) =>
    props.deleted &&
    css`
      background: #e7e2e2;
      color: #b8a6a6;
    `}
`;

const UpdateBody = styled.textarea`
  margin: 0;
  width: 100%;
  height: auto;
  resize: none;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 1px solid #c9c4c4;
  border-radius: 4px;
  min-height: 6.4rem;
  font-size: 1rem;
  line-height: 1.5;
`;

export default CommentItem;
