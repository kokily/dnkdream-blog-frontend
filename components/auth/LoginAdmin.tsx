import React from 'react';
import styled from 'styled-components';
import useLogin from '../../libs/hooks/auth/useLogin';
import InputGroup from './InputGroup';

function LoginAdmin() {
  const { username, password, onChange, onLogin, onKeyPress } = useLogin();

  return (
    <Container>
      <InputGroup
        type="text"
        name="username"
        value={username}
        onChange={onChange}
        label="사용자 이름"
      />
      <InputGroup
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        onKeyPress={onKeyPress}
        label="비밀번호"
      />

      <Button onClick={onLogin}>
        <Label className="layer">어서오세요!</Label>
        로그인
      </Button>
    </Container>
  );
}

// Styles
const Container = styled.div`
  background: white;
  padding: 2rem;
  height: auto;
`;

const Button = styled.button`
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
  margin-top: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  background: transparent;
  color: #22b8cf;
  border: 1px solid #22b8cf;
  border-radius: 4px;
  outline: none;
  transition: all 0.5s ease;
  &:hover .layer {
    top: 0;
  }
`;

const Label = styled.div`
  color: white;
  position: absolute;
  left: 0;
  top: -70px;
  width: 100%;
  padding: 10px 0;
  background: #22b8cf;
  transition: all 0.4s ease;
`;

export default LoginAdmin;
