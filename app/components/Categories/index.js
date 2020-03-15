/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import getSlug from 'speakingurl';
import _ from 'lodash';
import { getRouteUrl } from '../../route';
import { baseURL } from '../../utils/request';

const defaultIconPath =
  'https://bibomart.com.vn/media/mega_menu/item/6-xeday.png';

const getCateUrl = item =>
  getRouteUrl('ListPage', {
    slug: getSlug(item.Name),
    id: item.CategoryId,
  });

export const VerticleMenuItem = ({ dataList, isSubMenu = false, ...res }) => {
  useEffect(() => {
    if (isSubMenu) return;
    if (dataList && dataList.length > 10) {
      dataList.length = 10;
    }
  }, []);

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
                  backgroundImage: `url(${(item.Image &&
                    `${baseURL}${item.Image}`) ||
                    defaultIconPath})`,
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
                backgroundImage: `url(${(item.Image &&
                  `${baseURL}${item.Image}`) ||
                  defaultIconPath})`,
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

  return <Menu {...res}>{renderChildren()}</Menu>;
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

const SubMenuItem = styled(Menu.SubMenu)``;

const MenuItem = styled(Menu.Item)``;
