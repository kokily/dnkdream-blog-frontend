import type { MouseEvent } from 'react';
import React from 'react';
import styled, { css } from 'styled-components';
import { shadow } from '../../../styles';
import MenuItem from './MenuItem';

interface Props {
  onClose: (e: MouseEvent) => void;
  visible: boolean;
}

function MenuList({ onClose, visible }: Props) {
  return (
    <Container visible={visible} onClick={onClose}>
      <Wrapper>
        {visible && (
          <>
            <MenuItem href="/">전체 포스트</MenuItem>

            <Split />

            <MenuItem href="/category">카테고리</MenuItem>
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
