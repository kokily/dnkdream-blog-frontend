import React from 'react';
import styled, { css } from 'styled-components';
import useReplies from '../../libs/hooks/post/useReplies';
import formatDate from '../../libs/utils/formatDate';
import { media } from '../../styles';
import Button from '../common/Button';
import RemoveModal from './RemoveModal';

interface Props {
  reply: ReplyType;
}

function ReplyItem({ reply }: Props) {
  const {
    user,
    body,
    onChange,
    onUpdateReply,
    modal,
    onRemoveClick,
    onCancel,
    onConfirm,
    edit,
    onToggleEdit,
  } = useReplies(reply.commentId!, reply);

  return (
    <Container>
      <ReplyHeader>
        <Avatar>
          <img src="/assets/images/profile.jpg" alt="profile" />
        </Avatar>
        <InfoBox>
          <div className="name">관리자</div>
          <div className="date">
            {formatDate(reply.created_at.toString())} 작성
          </div>
        </InfoBox>

        {user && (
          <div className="right">
            {edit ? (
              <>
                <Button back onClick={onToggleEdit}>
                  취소하기
                </Button>
                <Button upload onClick={onUpdateReply}>
                  저장하기
                </Button>
              </>
            ) : reply.deleted ? null : (
              <>
                <Button remove onClick={onRemoveClick}>
                  삭제하기
                </Button>
                <Button submit onClick={onToggleEdit}>
                  수정하기
                </Button>
              </>
            )}
          </div>
        )}
      </ReplyHeader>

      <ReplyBody deleted={reply.deleted}>
        {reply.deleted ? (
          '댓댓글이 삭제되었습니다.'
        ) : edit ? (
          <UpdateBody name="body" value={body} onChange={onChange} />
        ) : (
          reply.reply_body
        )}
      </ReplyBody>

      <RemoveModal visible={modal} onCancel={onCancel} onConfirm={onConfirm} />
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
`;

const ReplyHeader = styled.div`
  display: flex;
  position: relative;
  height: 50px;

  ${media.small} {
    height: 100%;
    align-items: center;
  }

  .right {
    display: flex;
    position: absolute;
    right: 0;
    top: -15px;
    height: 100%;
    align-items: center;
    cursor: pointer;

    ${media.small} {
      flex-direction: column;

      button {
        margin-bottom: 5px;
      }
    }

    button + button {
      margin-left: 5px;

      ${media.small} {
        margin: 0;
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
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-transform: uppercase;
  font-size: 1.215rem;
  font-weight: bold;
  background: #2ab8bd;
  color: white;

  img {
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
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

const ReplyBody = styled.pre<{ deleted?: boolean }>`
  margin-left: 1.4rem;
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

export default ReplyItem;
