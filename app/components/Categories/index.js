/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import getSlug from 'speakingurl';
import _ from 'lodash';
import { getRouteUrl } from '../../route';

const defaultIconPath =
  'https://bibomart.com.vn/media/mega_menu/item/6-xeday.png';

const getCateUrl = item =>
  getRouteUrl('ListPage', {
    slug: getSlug(item.Name),
    id: item.CategoryId,
  });

// export const _VerticleMenuItem = ({ dataList }) => (
//   <Menu selectable={false} mode="vertical-left">
//     {dataList.map(item => (
//       <MenuItem
//         key={item.CategoryId}
//         title={
//           <Link to={getCateUrl(item)}>
//             <span
//               style={{
//                 backgroundImage: `url(${item.Image || defaultIconPath})`,
//               }}
//               className="icon"
//             />
//             <span>{item.Name}</span>
//           </Link>
//         }
//       >
//         <VerticleMenuItem dataList={item.children} />
//       </MenuItem>
//     ))}
//   </Menu>
// );

export const VerticleMenuItem = ({ dataList, isSubMenu = false }) => {
  const renderItem = item => {
    if (!_.isEmpty(item.children)) {
      return (
        <SubMenuItem
          key={_.uniqueId()}
          submenu={isSubMenu ? 1 : 0}
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
          <VerticleMenuItem dataList={item.children} isSubMenu />
        </SubMenuItem>
      );
    }

    return (
      <MenuItem key={_.uniqueId()} submenu={isSubMenu ? 1 : 0}>
        <Link to={getCateUrl(item)}>
          {!isSubMenu && (
            <span
              style={{
                backgroundImage: `url(${item.Image || defaultIconPath})`,
              }}
              className="icon"
            />
          )}
          <span>{item.Name}</span>
        </Link>
      </MenuItem>
    );
  };

  const renderChildren = () => dataList.map(item => renderItem(item));

  return <Menu>{renderChildren()}</Menu>;
};

VerticleMenuItem.propTypes = {
  isSubMenu: PropTypes.bool,
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      CategoryId: PropTypes.number,
      Code: PropTypes.string,
      ShortName: PropTypes.string,
      Name: PropTypes.string,
      Priority: PropTypes.number,
      parentId: PropTypes.number,
      Image: PropTypes.string,
      Details: PropTypes.string,
      Url: PropTypes.string,
      IsDeleted: PropTypes.bool,
      IsHomePage: PropTypes.bool,
      state: PropTypes.string,
    }),
  ),
};

const SubMenuItem = styled(Menu.SubMenu)`
  padding: 0 !important;
  & * {
    color: #333;
  }
  & .ant-menu-submenu-title {
    padding: 0 !important;
  }
  & a {
    font-size: 14px;
    line-height: 23px;
    padding: ${props => (props.submenu ? '0 16px' : '10px 10px 9px 50px')};
    position: relative;
    transition: ease 0.4s;
    & span.icon {
      display: block;
      width: 25px;
      height: 25px;
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

  &.ant-menu-submenu-vertical
    > .ant-menu-submenu-title:hover
    .ant-menu-submenu-arrow::after,
  &.ant-menu-submenu-vertical-left
    > .ant-menu-submenu-title:hover
    .ant-menu-submenu-arrow::after,
  &.ant-menu-submenu-vertical-right
    > .ant-menu-submenu-title:hover
    .ant-menu-submenu-arrow::after,
  .ant-menu-submenu-inline
    > .ant-menu-submenu-title:hover
    .ant-menu-submenu-arrow::after,
  &.ant-menu-submenu-vertical
    > .ant-menu-submenu-title:hover
    .ant-menu-submenu-arrow::before,
  &
    .ant-menu-submenu-vertical-left
    > .ant-menu-submenu-title:hover
    .ant-menu-submenu-arrow::before,
  &.ant-menu-submenu-vertical-right
    > .ant-menu-submenu-title:hover
    .ant-menu-submenu-arrow::before,
  .ant-menu-submenu-inline
    > .ant-menu-submenu-title:hover
    .ant-menu-submenu-arrow::before {
    color: #333 !important;
    background: #333 !important;
  }

  &.ant-menu-submenu-vertical
    > .ant-menu-submenu-title
    .ant-menu-submenu-arrow::after,
  &.ant-menu-submenu-vertical-left
    > .ant-menu-submenu-title
    .ant-menu-submenu-arrow::after,
  &.ant-menu-submenu-vertical-right
    > .ant-menu-submenu-title
    .ant-menu-submenu-arrow::after,
  .ant-menu-submenu-inline
    > .ant-menu-submenu-title
    .ant-menu-submenu-arrow::after,
  &.ant-menu-submenu-vertical
    > .ant-menu-submenu-title
    .ant-menu-submenu-arrow::before,
  &
    .ant-menu-submenu-vertical-left
    > .ant-menu-submenu-title
    .ant-menu-submenu-arrow::before,
  &.ant-menu-submenu-vertical-right
    > .ant-menu-submenu-title
    .ant-menu-submenu-arrow::before,
  .ant-menu-submenu-inline
    > .ant-menu-submenu-title
    .ant-menu-submenu-arrow::before {
    transition: none;
  }
`;

const MenuItem = styled(Menu.Item)`
  padding: 0 !important;
  & * {
    color: #333;
  }
  & .ant-menu-submenu-title {
    padding: 0 !important;
  }
  & a {
    font-size: 14px;
    line-height: 23px;
    padding: ${props => (props.submenu ? '0 16px' : '10px 10px 9px 45px')};
    position: relative;
    transition: ease 0.4s;
    height: 100%;
    display: flex;
    align-items: center;
    & span.icon {
      display: block;
      width: 25px;
      height: 25px;
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
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
`;
