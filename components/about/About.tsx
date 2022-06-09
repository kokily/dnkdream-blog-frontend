import React from 'react';
import styled from 'styled-components';
import { media, shadow } from '../../styles';
import Info from './Info';

function About() {
  return (
    <Container>
      <Card>
        <Image src="/assets/images/profile.jpg" alt="developer" />

        <Info />
      </Card>
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 56px);
`;

const Card = styled.div`
  display: flex;
  padding: 2.5rem 2rem;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  max-width: 500px;
  max-height: 300px;
  min-width: 300px;
  margin: 1rem;
  position: relative;
  transform-style: preserve-3d;
  overflow: hidden;
  ${shadow(1)}

  &::before, ::after {
    content: '';
    position: absolute;
    z-index: -1;
  }

  &::before {
    width: 100%;
    height: 100%;
    border: 1px solid #d1e5e3;
    border-radius: 10px;
    top: -0.7rem;
    left: -0.7rem;
  }

  &::after,
  img {
    border-radius: 50%;
  }

  ${media.medium} {
    display: block;
    text-align: center;
    margin-top: 4rem;
    max-height: 380px;
  }
`;

const Image = styled.img`
  max-width: 100%;
  display: block;
  width: 8rem;
  height: 100%;
  min-width: 80px;
  box-shadow: 0 0 0 5px #fff;
`;

export default About;
