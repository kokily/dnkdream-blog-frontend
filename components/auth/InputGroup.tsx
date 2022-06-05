import type { ChangeEvent, KeyboardEvent } from 'react';
import React from 'react';
import styled from 'styled-components';
import Input from './Input';

interface Props {
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
  label: string;
}

function InputGroup({ type, name, value, onChange, onKeyPress, label }: Props) {
  return (
    <Container>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <Bar className="bar" />
      <Label>{label}</Label>
    </Container>
  );
}

// Styles
const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
`;

const Label = styled.label`
  position: absolute;
  color: #212529;
  top: 12px;
  left: 0;
  transition: 0.2s ease all;
`;

const Bar = styled.span`
  position: relative;
  display: block;
  width: 100%;

  &:before {
    content: '';
    position: absolute;
    background: #0c8599;
    height: 3px;
    left: 50%;
    right: 50%;
    bottom: 0;
    transition: left 0.2s ease-out, right 0.2s ease-out;
  }
`;

export default InputGroup;
