import type { ChangeEvent, MouseEvent } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import styled, { css } from 'styled-components';
import { logoutAPI } from '../../../libs/api/auth';
import { useUserState } from '../../../libs/context/UserContext';
import { shadow } from '../../../styles';
import MenuItem from './MenuItem';
import { toast } from 'react-toastify';
import useWrite from '../../write/hooks/useWrite';

interface Props {
  onClose: (e: MouseEvent) => void;
  visible: boolean;
  toggleMenu: () => void;
}

function MenuList({ onClose, visible, toggleMenu }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [user, setUser] = useUserState();
  const { mutate: logout } = useMutation(logoutAPI, {
    onSuccess: () => {
      setUser(null);
      queryClient.invalidateQueries('user');
      toggleMenu();
      toast.success('로그아웃!');
      router.push('/');
    },
  });
  const url = router.pathname.substring(1, 6);
  const { onWrite, onUploadImage } = useWrite();

  return (
    <Container visible={visible} onClick={onClose}>
      <Wrapper>
        {visible && (
          <>
            <MenuItem href="/">전체 포스트</MenuItem>

            <Split />

            <MenuItem href="/about">소개글</MenuItem>

            {user && user.admin && url !== 'write' && (
              <MenuItem href="/write">글 작성</MenuItem>
            )}
            {user ? (
              <MenuItem onClick={() => logout()}>로그아웃</MenuItem>
            ) : (
              <MenuItem href="/admin">관리자 로그인</MenuItem>
            )}

            {user && user.admin && url === 'write' && (
              <>
                <Split />

                <MenuItem onClick={() => onUploadImage(true)}>
                  썸네일 업로드
                </MenuItem>
                <MenuItem onClick={() => onUploadImage(false)}>
                  이미지 업로드
                </MenuItem>
                <MenuItem onClick={onWrite}>저장하기</MenuItem>
              </>
            )}
          </>
        )}
      </Wrapper>
    </Container>
  );
}

// Styles
const Container = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 100%;
  margin-top: 0.22rem;
  right: 0;
  z-index: 999999;
  ${shadow(5)};
  transition: 0.14s transform;
  background: #313131;
  border-radius: 15px;
  border: 1px solid #5a5a5a;
  overflow: hidden;
  ${(props) =>
    props.visible
      ? css`
          opacity: 1;
          transform: scale(1);
        `
      : css`
          opacity: 0;
          transform: scale(0.5);
        `}
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 5;
  width: 12rem;
`;

const Split = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  height: 2px;
  background: linear-gradient(to right, #5a5a5a, #333333);
`;

export default MenuList;
