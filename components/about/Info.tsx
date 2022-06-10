import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { media } from '../../styles';

function Info() {
  return (
    <Container>
      <Name>
        <h2>Hyunsung Kim</h2>
        <h4>@kokily</h4>
      </Name>

      <Content>
        I&apos;m not a Developer, but my hobby is development, mostly front-end
      </Content>

      <Links>
        <Link href="https://github.com/kokily" passHref={true}>
          <button className="github">Github</button>
        </Link>
        <Link href="https://facebook.com/hkkokily5" passHref={true}>
          <button className="facebook">FaceBook</button>
        </Link>
      </Links>
    </Container>
  );
}

// Styles
const Container = styled.div`
  margin-left: 1.5rem;

  ${media.medium} {
    margin-left: 0;
    margin-top: 1.5rem;
  }
`;

const Name = styled.div`
  margin-bottom: 1rem;

  h2 {
    font-size: 1.3rem;
  }
  h4 {
    font-size: 0.8rem;
    color: #333;
  }
`;

const Content = styled.p`
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Links = styled.div`
  display: flex;

  ${media.medium} {
    justify-content: center;
  }

  button {
    padding: 10px 0 10px 30px;
    width: 150px;
    margin-bottom: 15px;
    display: block;
    border: 1px solid #c2c7d0;
    border-radius: 5px;
    position: relative;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;

    ${media.medium} {
      min-width: 100px;
    }

    &.github {
      background-color: #333;

      &::before {
        content: '\f09b';
        font-family: fontAwesome;
      }
    }

    &.facebook {
      background-color: #3b5998;

      &::before {
        content: '\f09a';
      }
    }

    &::before {
      font-family: fontAwesome;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 22px;
      border-right: 1px solid #c2c7d0;
      padding: 0 5px;
      width: 40px;
      height: 100%;
      line-height: 40px;
    }

    &:hover {
      opacity: 0.7;
    }
  }
`;

export default Info;
