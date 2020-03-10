import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

export default function LocationModal({ isOpen, onCloseModal }) {
  return (
    <Modal visible={isOpen} onCancel={onCloseModal}>
      hello
    </Modal>
  );
}

LocationModal.propTypes = {
  isOpen: PropTypes.bool,
  onCloseModal: PropTypes.func.isRequired,
};
