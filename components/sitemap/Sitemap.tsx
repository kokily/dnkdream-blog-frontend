import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const menuMap = [
  {
    id: 0,
    url: '/',
    title: 'Index Page',
    label: '모든 포스트',
  },
  {
    id: 1,
    url: '/about',
    title: 'About Page',
    label: '관리자 소개 페이지',
  },
  {
    id: 2,
    url: '/category',
    title: 'Category Posts Page',
    label: '카테고리별 포스트 목록',
  },
  {
    id: 3,
    url: '/tag',
    title: 'Tag Posts Page',
    label: '태그별 포스트 목록',
  },
];

function Sitemap() {
  return (
    <Container>
      {menuMap.map((menu) => (
        <Link href={menu.url} key={menu.id}>
          <Card>
            {menu.title}
            <label>[ {menu.label} ]</label>
          </Card>
        </Link>
      ))}
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.2rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 80px;
  margin-bottom: 1rem;
  border-radius: 10px;
  background-color: #2a92a6;
  color: white;
  cursor: pointer;
  transition: 0.4s background-color;

  &:hover {
    background-color: #53b5c8;
  }

  label {
    margin-top: 0.4rem;
  }
`;

export default Sitemap;
