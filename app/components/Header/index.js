import React from 'react';
import { Row, Col, Badge, Affix } from 'antd';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
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
  MobileSearch,
} from './selections';
import { PageWrapper } from '../../containers/App/selections';
import { getRouteUrl } from '../../route';

export default function Header({
  mobile,
  location,
  logo,
  searchPlaceholder,
  cartNumber,
  handlerSelectLocation,
  dispatch,
}) {
  const handleSearch = (content, event) => {
    dispatch(
      push(
        getRouteUrl('SearchPage', {
          searchContent: decodeURIComponent(content),
        }),
      ),
    );
  };

  return (
    <StyledHeader mobile={mobile}>
      <div className="panel">
        <PageWrapper>
          <Row>
            <Col lg={14} xs={24}>
              <LocaltionHeader onClick={handlerSelectLocation}>
                <EnvironmentFilled />
                <div className="location-main">
                  {location || 'Bạn muốn giao hàng tới đâu?'}
                </div>
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
                    <Link to={getRouteUrl('HomePage')}>
                      <img className="logo" src={logo} alt="logo" />
                    </Link>
                  </div>
                </Col>
                <Col span={11}>
                  <div className="flexbox">
                    <Search
                      placeholder="Ba mẹ tìm gì cho bé hôm nay?"
                      onSearch={handleSearch}
                    />
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

                    <Badge count={cartNumber}>
                      <Link
                        to={getRouteUrl('CheckoutPage')}
                        className="shoppingCart"
                      >
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
                  <MobileSearch
                    placeholder={
                      searchPlaceholder || 'Ba mẹ tìm gì cho bé hôm nay?'
                    }
                    onSearch={handleSearch}
                  />
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
  searchPlaceholder: propTypes.string,
  mobile: propTypes.number,
  logo: propTypes.string,
  cartNumber: propTypes.number,
  handlerSelectLocation: propTypes.func.isRequired,
  dispatch: propTypes.func,
};
