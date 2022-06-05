import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { media, shadow } from '../../styles';
import useHeader from './hooks/useHeader';
import MenuButton from './header/MenuButton';
import MenuList from './header/MenuList';

function Header() {
  const { ref, menu, toggleMenu, onOutsideClick } = useHeader();

  return (
    <Container>
      <Contents>
        <Link href="/">
          <Logo>D&amp;K Blog</Logo>
        </Link>

        <Spacer />

        <div ref={ref}>
          <MenuButton onClick={toggleMenu} />
          <MenuList
            onClose={onOutsideClick}
            visible={menu}
            toggleMenu={toggleMenu}
          />
        </div>
      </Contents>
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background: #353535;
  position: fixed;
  ${shadow(1)}
  z-index: 9999;
`;

const Contents = styled.div`
  display: flex;
  align-items: center;
  width: 1200px;
  height: 56px;
  padding-left: 1rem;
  padding-right: 1rem;
  position: relative;

  ${media.medium} {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Logo = styled.a`
  font-size: 1.4rem;
  font-family: 'Rajdhani';
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  color: #ffffff;
  transition: 0.2s all;

  &:hover {
    color: #bbe7d5;
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

export default Header;
