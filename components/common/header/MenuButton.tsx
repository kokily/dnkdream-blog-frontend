import type { MouseEvent } from 'react';
import React from 'react';
import styled from 'styled-components';

interface Props {
  onClick?: (e: MouseEvent) => void;
}

function MenuButton({ onClick }: Props) {
  return <Container onClick={onClick}>메뉴</Container>;
}

// Styles
const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
  font-weight: bold;
`;

export default MenuButton;
