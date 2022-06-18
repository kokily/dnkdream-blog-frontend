import type { ChangeEvent } from 'react';
import React from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  password: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function PasswordModal({
  visible,
  onCancel,
  onConfirm,
  password,
  onChange,
}: Props) {
  return (
    <Modal
      visible={visible}
      title="비밀번호"
      content={
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="비밀번호"
        />
      }
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

// Styles
const Input = styled.input`
  width: 100%;
  height: 36px;
  border: 1px solid #c4c0c0;
  border-radius: 6px;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
`;

export default PasswordModal;
