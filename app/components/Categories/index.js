/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import getSlug from 'speakingurl';
import { getRouteUrl } from '../../route';

const defaultIconPath =
  'https://bibomart.com.vn/media/mega_menu/item/6-xeday.png';

const getCateUrl = item =>
  getRouteUrl('ListPage', {
    slug: getSlug(item.Name),
    id: item.CategoryId,
  });

export const VerticleMenuItem = ({ dataList }) => (
  <Menu selectable={false} mode="vertical-left">
    {dataList.map(item => (
      <MenuItem
        key={item.CategoryId}
        title={
          <Link to={getCateUrl(item)}>
            <span
              style={{
                backgroundImage: `url(${item.Image || defaultIconPath})`,
              }}
              className="icon"
            />
            <span>{item.Name}</span>
          </Link>
        }
      >
        <VerticleMenuItem dataList={item.children} />
      </MenuItem>
    ))}
  </Menu>
);

VerticleMenuItem.propTypes = {
  dataList: PropTypes.array,
};

const MenuItem = styled(Menu.SubMenu)`
  padding: 0 !important;
  & * {
    color: #333;
  }
  & .ant-menu-submenu-title{
    padding: 0 !important;
  }
  & a {
    font-size: 14px;
    line-height: 23px;
    padding: 10px 10px 9px 50px;
    position: relative;
    transition: ease 0.4s;
    & span.icon {
      display: block;
      width: 30px;
      height: 30px;
      object-fit: cover;
      object-position: left top;
      top: 0;
      bottom: 0;
      left: 10px;
      margin: auto;
      background-size: cover;
      background-position: left top;
      position: absolute;
      & + span {
        font-weight: 300 !important;
        text-decoration: none;
        text-transform: none;
        font-size: 14px;
      }
    }
  }
`;
