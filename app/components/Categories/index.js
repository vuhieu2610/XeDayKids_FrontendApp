import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';

export const VerticleMenuItem = ({ dataList }) => {
  return dataList.map(item => (
    <Menu selectable={false} mode="vertical-left">
      <MenuItem key={item.CategoryId}>
        {/* {
          item.Image && <img src={item.Image} />
        } */}
        <span>{item.Name}</span>
      </MenuItem>
    </Menu>
  ));
};

const MenuItem = styled(Menu.Item)`
  display: flex;
  & img{
    width: 24px;
    object-fit: contain;
  }
`