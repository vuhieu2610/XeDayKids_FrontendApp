/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Col } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import route, { breadcrumbRoutes } from '../../route';
import propTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import GlobalStyle from '../../global-styles';
import {
  StyledContent,
  StyledFooter,
  BreadcrumbBox,
  PageWrapper
} from './selections';
import Header from '../../components/Header';
import Drawer from '../../components/Drawer';
import {
  makeSelectBreadcrumb,
  makeSelectUserLocation,
  makeSelectScreenSize,
  makeSelectLocation,
  makeSelectLogo,
  makeSelectSearchPlaceholder,
  makeSelectCategories
} from './selectors';
import { SCREEN_RESIZE } from './constants';
import { getScreenSize } from '../../utils/responsive';

import saga from './saga';
import { getCategories } from './actions';

function App({
  location,
  setScreenSize,
  screenSize,
  logo,
  categories,
  getCates,
  searchPlaceHolder
}) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    const changeScreenSize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener('resize', changeScreenSize);
    // getCates();
    return () => {
      window.removeEventListener('resize', changeScreenSize);
    };
  }, []);

  console.log(categories);

  const isMobile = getScreenSize('xl') >= screenSize;

  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    );
  }

  return (
    <Layout>
      <Header
        location={location}
        searchPlaceholder={searchPlaceHolder}
        logo={logo}
        mobile={isMobile ? 1 : 0}
      />
      <StyledContent mobile={isMobile ? 1 : 0}>
        <BreadcrumbBox>
          <PageWrapper>
            <Breadcrumb
              itemRender={itemRender}
              separator=">"
              routes={breadcrumbRoutes}
            />
          </PageWrapper>
        </BreadcrumbBox>
        <PageWrapper>
          <Switch>
            {route.map(page => (
              <Route
                key={page.name}
                exact={page.extract}
                path={page.path}
                component={page.component}
              />
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </PageWrapper>
      </StyledContent>
      {!isMobile ? (
        <StyledFooter>
          <PageWrapper>
            <Row>
              <Col span={12}>
                <p>Đơn vị chủ quản: Công ty cổ phần Bibomart TM</p>
                <p>
                  Địa chỉ: 120 Trần Duy Hưng, Phường Trung Hòa, Quận Cầu Giấy,
                  Hà Nội, Việt Nam
                </p>
                <p>Điện thoại: (024) 73091168 - Email: cskh@bibomart.com.vn</p>
                <p>
                  Mã số thuế / Mã số doanh nghiệp: 0108024302, Ngày cấp:
                  16/10/2017, Sở KHĐTHN
                </p>
              </Col>
              <Col span={12} />
            </Row>
          </PageWrapper>
        </StyledFooter>
      ) : (
        <Drawer logo={logo} categories={categories} />
      )}
      <GlobalStyle />
    </Layout>
  );
}

App.propTypes = {
  breadcrumbs: propTypes.object,
  location: propTypes.string,
  routeLocation: propTypes.object,
  setScreenSize: propTypes.func,
  getCates: propTypes.func,
  searchPlaceHolder: propTypes.string,
  categories: propTypes.shape({
    isLoading: propTypes.bool,
    data: propTypes.array,
    hasError: propTypes.bool
  })
};

const mapStateToProps = createStructuredSelector({
  breadcrumbs: makeSelectBreadcrumb(),
  location: makeSelectUserLocation(),
  screenSize: makeSelectScreenSize(),
  routeLocation: makeSelectLocation(),
  searchPlaceHolder: makeSelectSearchPlaceholder(),
  logo: makeSelectLogo(),
  categories: makeSelectCategories()
});

const mapDispatchToProps = dispatch => ({
  setScreenSize: size => dispatch({ type: SCREEN_RESIZE, payload: size }),
  getCates: () => dispatch(getCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
