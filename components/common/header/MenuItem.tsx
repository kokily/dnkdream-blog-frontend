import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: any) => void;
}

function MenuItem({ children, href, onClick }: Props) {
  const jsx = <Item onClick={onClick}>{children}</Item>;

  return href ? (
    <Link href={href}>
      <Container style={{ display: 'block' }}>{jsx}</Container>
    </Link>
  ) : (
    jsx
  );
}

// Styles
const Container = styled.div`
  display: block;
  color: inherit;
  text-decoration: none;
  background: #313131;
  overflow: hidden;
`;

const Item = styled.div`
  padding: 0.75rem 1rem;
  line-height: 1.5;
  color: #cdcdcd;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    color: white;
    background: #464646;
  }
`;

export default MenuItem;
