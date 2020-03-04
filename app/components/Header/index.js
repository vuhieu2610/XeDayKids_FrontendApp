import React from 'react';
import { Row, Col, Badge, Affix } from 'antd';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {
  ShoppingCartOutlined,
  UserOutlined,
  EnvironmentFilled,
  PhoneFilled,
  ShoppingOutlined
} from '@ant-design/icons';
import {
  StyledHeader,
  Search,
  UserLink,
  LocaltionHeader,
  HotLine,
  Notification,
  MobileSearch
} from './selections';
import { PageWrapper } from '../../containers/App/selections';

export default function Header(props) {
  return (
    <StyledHeader {...props}>
      <div className="panel">
        <PageWrapper>
          <Row>
            <Col lg={14} xs={24}>
              <LocaltionHeader>
                <EnvironmentFilled />
                <span>Khu vực của bạn: </span>
                <span className="location-main">{props.location}</span>
              </LocaltionHeader>
            </Col>
            <Col lg={10} xs={0} style={{ textAlign: 'right' }}>
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
        </PageWrapper>
      </div>
      <div className="content">
        <PageWrapper>
          <Row>
            <Col xl={24} xs={0}>
              <Row>
                <Col span={5}>
                  <div className="flexbox">
                    <Link to="/">
                      <img
                        className="logo"
                        src="https://bibomart.com.vn/media/logo/stores/1/logo-bbm.jpg"
                        alt="logo"
                      />
                    </Link>
                  </div>
                </Col>
                <Col span={11}>
                  <div className="flexbox">
                    <Search placeholder="Ba mẹ tìm gì cho bé hôm nay?" />
                  </div>
                </Col>
                <Col span={8} className="rightSide">
                  <div className="flexbox">
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
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xl={0} xs={24}>
              <div className="flexbox">
                <Affix style={{ width: '100%' }} offsetTop={10}>
                  <MobileSearch placeholder="Ba mẹ tìm gì cho bé hôm nay?" />
                </Affix>
              </div>
            </Col>
          </Row>
        </PageWrapper>
      </div>
    </StyledHeader>
  );
}

Header.propTypes = {
  location: propTypes.string,
  mobile: propTypes.bool
};
