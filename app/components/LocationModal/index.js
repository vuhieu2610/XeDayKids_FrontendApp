import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Select, Input } from 'antd';
import styled from 'styled-components';

export default function LocationModal({ isOpen, onCloseModal }) {
  const [provinces, setProvinces] = useState([]);
  const [district, setDistrict] = useState([]);
  const [address, setAddress] = useState('');

  return (
    <Modal
      visible={isOpen}
      title="Địa chỉ giao hàng"
      onCancel={onCloseModal}
      footer={<CustomButton type="danger">Giao đến địa chỉ này</CustomButton>}
    >
      <CustomRow>
        <CustomCol span={9}>
          <CustomLabel htmlFor="province">Tỉnh/Thành Phố</CustomLabel>
        </CustomCol>
        <Col span={15}>
          <CustomSelect
            id="province"
            placeholder="Vui lòng chọn tỉnh/thành phố"
          >
            
          </CustomSelect>
        </Col>
      </CustomRow>

      <CustomRow>
        <CustomCol span={9}>
          <CustomLabel htmlFor="dicstrict">Quận/Huyện</CustomLabel>
        </CustomCol>
        <Col span={15}>
          <CustomSelect id="dicstrict" placeholder="Vui lòng chọn quận/huyện" />
        </Col>
      </CustomRow>

      <CustomRow>
        <CustomCol span={9}>
          <CustomLabel htmlFor="street">Địa chỉ nhà</CustomLabel>
        </CustomCol>
        <Col span={15}>
          <CustomInput id="street" placeholder="Vui lòng nhập địa chỉ nhà" />
        </Col>
      </CustomRow>
    </Modal>
  );
}

LocationModal.propTypes = {
  isOpen: PropTypes.bool,
  onCloseModal: PropTypes.func.isRequired,
};

const CustomRow = styled(Row)`
  margin-bottom: 6px;
`;

const CustomCol = styled(Col)`
  text-align: right;
`;

const CustomLabel = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 32px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  &::after {
    content: ':';
    position: relative;
    top: -0.5px;
    margin: 0 8px 0 2px;
  }
`;

const CustomButton = styled(Button)`
  margin: 0 auto;
  display: block;
  height: 40px;
`;

const CustomSelect = styled(Select)`
  width: 100%;
`;

const CustomInput = styled(Input)`
  width: 100%;
`;
