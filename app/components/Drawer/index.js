import React, { useState } from 'react';
import { Drawer as AntDrawer, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { getSlug } from '../../utils/string';
import { FloatingAcionButton } from './selections';
const { SubMenu } = Menu;

export default function Drawer({ logo, categories }) {
  const [drawableVisible, setDrawableVisible] = useState(false);
  return (
    <AntDrawer
      title={
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
      }
      placement="left"
      bodyStyle={{
        padding: 6,
      }}
      handler={
        <FloatingAcionButton
          onClick={() => setDrawableVisible(!drawableVisible)}
        >
          <MenuOutlined />
        </FloatingAcionButton>
      }
      visible={drawableVisible}
      onClose={() => setDrawableVisible(false)}
    >
      <Menu mode="inline" style={{ width: '100%', borderRight: 'none' }}>
        <Menu.Item key="/">
          <Link to="/">Trang chủ</Link>
        </Menu.Item>
        <SubMenu key="/categories" title="Danh mục">
          {categories &&
            categories.map(category => (
              <Menu.Item key={_.uniqueId(category.Name)}>
                <Link
                  to={`/category/${getSlug(category.Name)}.${
                    category.CategoryId
                  }`}
                >
                  {category.Name}
                </Link>
              </Menu.Item>
            ))}
        </SubMenu>
        <Menu.Item key="/checkout/cart">
          <Link to="/checkout/cart">Giỏ hàng</Link>
        </Menu.Item>
      </Menu>
    </AntDrawer>
  );
}

Drawer.propTypes = {
  logo: PropTypes.string,
};
