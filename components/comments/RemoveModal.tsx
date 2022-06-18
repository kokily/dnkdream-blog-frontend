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
      title="대댓글 삭제"
      content="정말 삭제하시겠어요?"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

export default RemoveModal;
