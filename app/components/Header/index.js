import React from 'react';
import { Row, Col, Badge } from 'antd';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {
  ShoppingCartOutlined,
  UserOutlined,
  EnvironmentFilled,
  PhoneFilled,
  ShoppingOutlined,
} from '@ant-design/icons';
import {
  StyledHeader,
  Search,
  UserLink,
  LocaltionHeader,
  HotLine,
  Notification,
} from './selections';

export default function Header(props) {
  return (
    <StyledHeader {...props}>
      <div className="panel">
        <div>
          <Row>
            <Col span={12}>
              <LocaltionHeader>
                <EnvironmentFilled />
                <span>Khu vực của bạn: </span>
                <span className="location-main">{props.location}</span>
              </LocaltionHeader>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <HotLine>
                <li className="hotline">
                  <PhoneFilled />
                  <span>
                    Hotline:
                    <a href="tel: 123456567">
                      <strong>123456567</strong>
                    </a>
                  </span>
                </li>
              </HotLine>
            </Col>
          </Row>
        </div>
      </div>
      <div className="content">
        <Row>
          <Col span={5}>
            <Link to="/">
              <img
                className="logo"
                src="https://bibomart.com.vn/media/logo/stores/1/logo-bbm.jpg"
                alt="logo"
              />
            </Link>
          </Col>
          <Col span={11}>
            <Search placeholder="Ba mẹ tìm gì cho bé hôm nay?" />
          </Col>
          <Col span={8} className="rightSide">
            {false && (
              <UserLink>
                <li className="userIco">
                  <UserOutlined />
                </li>
                <li className="greet welcome">
                  <span>Tài khoản</span>
                </li>
                <li className="authorization-link">
                  <Link to="/">Đăng nhập</Link>
                </li>
                <li className="">
                  <Link to="/">Đăng ký</Link>
                </li>
              </UserLink>
            )}

            <Notification>
              <Link to="/">
                <ShoppingOutlined />
                <span>Kiểm tra đơn hàng </span>
              </Link>
            </Notification>

            <Badge count={3}>
              <Link to="/checkout/cart" className="shoppingCart">
                <ShoppingCartOutlined />
              </Link>
            </Badge>
          </Col>
        </Row>
      </div>
    </StyledHeader>
  );
}

Header.propTypes = {
  location: propTypes.string,
};
