import React from 'react';
import Modal from '../common/Modal';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

function RemoveModal({ visible, onCancel, onConfirm }: Props) {
  return (
    <Modal
      visible={visible}
      title="삭제하기"
      content="포스트를 삭제합니다??"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

export default RemoveModal;
