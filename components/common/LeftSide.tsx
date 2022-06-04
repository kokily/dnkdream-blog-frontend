import React from 'react';
import styled from 'styled-components';
import ActiveLink from './ActiveLink';
import useLeftSide from './hooks/useLeftSide';

function LeftSide() {
  const { categories } = useLeftSide();

  return (
    <Container>
      <Title>Category</Title>

      <CategoryItem>Development</CategoryItem>
      <CategoryItem>Travel</CategoryItem>
      <CategoryItem>ETC</CategoryItem>

      {categories &&
        categories.length > 0 &&
        categories.map((category) => (
          <ActiveLink
            key={category}
            href={`/${category}`}
            activeClassName="active"
          >
            <CategoryItem>{category}</CategoryItem>
          </ActiveLink>
        ))}
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: #303030;
  margin-bottom: 2rem;
`;

const CategoryItem = styled.div`
  margin-bottom: 1.5rem;
  font-size: 16px;
  font-weight: bold;
  color: #7f7f7f;
  cursor: pointer;
  transition: 0.4s color;

  &:hover {
    color: #31c598;
  }

  &.active {
    color: #0c0c0c;
  }
`;

export default LeftSide;
