import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Select, Input } from 'antd';
import _ from 'lodash';
import styled from 'styled-components';
import { makeRequestDistrict } from './actions';

export default function LocationModal({
  isOpen,
  setModalVisible,
  onCloseModal,
  provinces,
  fetchProviceData,
  setUserLocation,
  userLocation,
}) {
  const [district, setDistrict] = useState([]);
  const [address, setAddress] = useState(userLocation.address);

  const [selectedProvince, setSelectedProvince] = useState(
    userLocation.province,
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    userLocation.district,
  );

  const [loadingDistrict, setLoadingDistrict] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    if (!provinces || _.isEmpty(provinces)) {
      fetchProviceData();
    }
  }, [isOpen]);

  const getDistrict = async provinceCode => {
    try {
      setLoadingDistrict(true);
      const res = await makeRequestDistrict(provinceCode);

      if (res.HasDataList) {
        setDistrict(res.DataList);
      }
    } catch (err) {
      //
    } finally {
      setLoadingDistrict(false);
    }
  };

  useEffect(() => {
    if (_.isEmpty(district) && !_.isNull(selectedProvince)) {
      getDistrict(selectedProvince.ProvinceCode);
    }
  }, [selectedProvince]);

  return (
    <Modal
      visible={isOpen}
      title="Địa chỉ giao hàng"
      onCancel={onCloseModal}
      footer={
        <CustomButton
          type="danger"
          disabled={
            _.isNull(selectedProvince) ||
            _.isNull(selectedDistrict) ||
            _.isEmpty(address)
          }
          onClick={() => {
            setUserLocation({
              province: selectedProvince,
              district: selectedDistrict,
              address,
            });
            setModalVisible();
          }}
        >
          Giao đến địa chỉ này
        </CustomButton>
      }
    >
      <CustomRow>
        <CustomCol span={9}>
          <CustomLabel htmlFor="name">Tên người nhận</CustomLabel>
        </CustomCol>
        <Col span={15}>
          <CustomInput id="name" placeholder="Vui lòng nhập tên người nhận" />
        </Col>
      </CustomRow>
      <CustomRow>
        <CustomCol span={9}>
          <CustomLabel htmlFor="phone">Số điện thoại</CustomLabel>
        </CustomCol>
        <Col span={15}>
          <CustomInput id="phone" placeholder="Vui lòng nhập số điện thoại" />
        </Col>
      </CustomRow>
      <CustomRow>
        <CustomCol span={9}>
          <CustomLabel htmlFor="email">Email</CustomLabel>
        </CustomCol>
        <Col span={15}>
          <CustomInput id="email" placeholder="Vui lòng nhập địa chỉ email" />
        </Col>
      </CustomRow>
      <CustomRow>
        <CustomCol span={9}>
          <CustomLabel htmlFor="province">Tỉnh/Thành Phố</CustomLabel>
        </CustomCol>
        <Col span={15}>
          <CustomSelect
            id="province"
            placeholder="Vui lòng chọn tỉnh/thành phố"
            onChange={value => {
              setSelectedProvince(
                provinces.find(province => _.eq(province.ProvinceCode, value)),
              );
            }}
            value={selectedProvince && selectedProvince.ProvinceCode}
          >
            {provinces.map(province => (
              <Select.Option value={province.ProvinceCode} key={province.ID}>
                {province.ProvinceName}
              </Select.Option>
            ))}
          </CustomSelect>
        </Col>
      </CustomRow>

      <CustomRow>
        <CustomCol span={9}>
          <CustomLabel htmlFor="dicstrict">Quận/Huyện</CustomLabel>
        </CustomCol>
        <Col span={15}>
          <CustomSelect
            id="dicstrict"
            placeholder="Vui lòng chọn quận/huyện"
            disabled={_.isNull(selectedProvince)}
            loading={loadingDistrict}
            value={selectedDistrict.DistrictCode}
            onChange={value => {
              setSelectedDistrict(
                district.find(d => _.eq(d.DistrictCode, value)),
              );
            }}
          >
            {district.map(d => (
              <Select.Option value={d.DistrictCode} key={d.ID}>
                {d.DistrictName}
              </Select.Option>
            ))}
          </CustomSelect>
        </Col>
      </CustomRow>

      <CustomRow>
        <CustomCol span={9}>
          <CustomLabel htmlFor="street">Địa chỉ nhà</CustomLabel>
        </CustomCol>
        <Col span={15}>
          <CustomInput
            id="street"
            placeholder="Vui lòng nhập địa chỉ nhà"
            value={address}
            onInput={e => {
              setAddress(e.target.value);
            }}
          />
        </Col>
      </CustomRow>

      <CustomRow>
        <CustomCol span={9}>
          <CustomLabel htmlFor="note">Để lại lưu ý</CustomLabel>
        </CustomCol>
        <Col span={15}>
          <Input.TextArea
            style={{ width: '100%', height: 150 }}
            id="note"
            placeholder="..."
          />
        </Col>
      </CustomRow>
    </Modal>
  );
}

LocationModal.propTypes = {
  isOpen: PropTypes.bool,
  onCloseModal: PropTypes.func.isRequired,
  provinces: PropTypes.array,
  fetchProviceData: PropTypes.func,
  setUserLocation: PropTypes.func,
  setModalVisible: PropTypes.func,
  userLocation: PropTypes.object,
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
