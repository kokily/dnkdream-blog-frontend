import React from 'react';
import styled, { css } from 'styled-components';

// Styles
const Container = styled.button<{
  submit?: boolean;
  back?: boolean;
  remove?: boolean;
  upload?: boolean;
  comment?: boolean;
}>`
  font-size: 1rem;
  font-weight: bold;
  width: 90px;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s all;
  &:active {
    transform: translateY(1px);
  }
  ${(props) =>
    props.submit &&
    css`
      border: 1px solid #06a4ff;
      background: #06a4ff;
      color: white;
      &:hover {
        background: white;
        color: #06a4ff;
      }
    `}
  ${(props) =>
    props.back &&
    css`
      border: 1px solid #777;
      background: #777;
      color: white;
      &:hover {
        background: white;
        color: #777;
      }
    `}
    ${(props) =>
    props.remove &&
    css`
      border: 1px solid #c81e1e;
      background: #c81e1e;
      color: white;
      &:hover {
        background: white;
        color: #c81e1e;
      }
    `}
    ${(props) =>
    props.upload &&
    css`
      border: 1px solid #1fc588;
      background: #1fc588;
      color: white;
      &:hover {
        background: white;
        color: #1fc588;
      }
    `}
    ${(props) =>
    props.comment &&
    css`
      border: 1px solid #db5225;
      background: #db5225;
      color: white;
      &:hover {
        background: white;
        color: #db5225;
      }
    `}
`;

interface Props {
  submit?: boolean;
  back?: boolean;
  remove?: boolean;
  upload?: boolean;
  comment?: boolean;
  onClick?: any;
  children: React.ReactNode;
}

function Button({ children, submit, back, remove, upload, ...rest }: Props) {
  const htmlProps = rest as any;

  return (
    <Container
      submit={submit}
      back={back}
      remove={remove}
      upload={upload}
      {...htmlProps}
      onClick={(e) => {
        if (htmlProps.onClick) {
          htmlProps.onClick(e);
        }
        (e.target as HTMLButtonElement).blur();
      }}
    >
      {children}
    </Container>
  );
}

export default Button;
