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
import { Layout, Breadcrumb, Menu, Affix } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import DetailPage from 'containers/DetailPage/Loadable';
import CheckoutPage from 'containers/CheckoutPage';

import propTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import GlobalStyle from '../../global-styles';
import {
  StyledContent,
  StyledFooter,
  BreadcrumbBox,
  CustomBottomNav,
  PageWrapper
} from './selections';
import Header from '../../components/Header';
import {
  makeSelectBreadcrumb,
  makeSelectUserLocation,
  makeSelectScreenSize,
  makeSelectLocation
} from './selectors';
import { SCREEN_RESIZE } from './constants';
import { getScreenSize } from '../../utils/responsive';

export const pageUrls = [
  {
    name: 'Trang chủ',
    component: HomePage,
    isNavigation: true,
    url: '/'
  },
  {
    name: 'Giỏ hàng',
    component: CheckoutPage,
    isNavigation: true,
    url: '/checkout/cart'
  },
  {
    name: 'Trang chi tiết',
    isNavigation: false,
    component: DetailPage,
    url: '/:slug'
  }
];

function App({
  breadcrumbs,
  location,
  setScreenSize,
  screenSize,
  routeLocation
}) {
  useEffect(() => {
    const changeScreenSize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener('resize', changeScreenSize);

    return () => {
      window.removeEventListener('resize', changeScreenSize);
    };
  }, []);

  const isMobile = getScreenSize('xl') >= screenSize;
  return (
    <Layout>
      <Header location={location} mobile={isMobile} />
      <StyledContent mobile={isMobile}>
        {/* {breadcrumbs.displayable && (
          <BreadcrumbBox>
            <div>
              <Breadcrumb separator=">">
                {breadcrumbs.items.map(item => (
                  <Breadcrumb.Item key={_.uniqueId()} href={item.href}>
                    {item.name}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>
          </BreadcrumbBox>
        )}
        <div>
          
        </div> */}
        <PageWrapper>
          <Switch>
            {pageUrls.map(page => (
              <Route
                key={page.name}
                exact
                path={page.url}
                component={page.component}
              />
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </PageWrapper>
      </StyledContent>
      {!isMobile && (
        <StyledFooter style={{ textAlign: 'center' }}>
          Design by HieuVM
        </StyledFooter>
      )}
      {isMobile && (
        <Affix offsetBottom={0}>
          <CustomBottomNav
            mode="horizontal"
            selectedKeys={[routeLocation.pathname]}
          >
            {pageUrls
              .filter(item => item.isNavigation)
              .map(page => (
                <Menu.Item key={page.url}>
                  <Link to={page.url}>{page.name}</Link>
                </Menu.Item>
              ))}
          </CustomBottomNav>
        </Affix>
      )}
      <GlobalStyle />
    </Layout>
  );
}

App.propTypes = {
  breadcrumbs: propTypes.object,
  location: propTypes.string,
  routeLocation: propTypes.object,
  setScreenSize: propTypes.func
};

const mapStateToProps = createStructuredSelector({
  breadcrumbs: makeSelectBreadcrumb(),
  location: makeSelectUserLocation(),
  screenSize: makeSelectScreenSize(),
  routeLocation: makeSelectLocation()
});

const mapDispatchToProps = dispatch => ({
  setScreenSize: size => dispatch({ type: SCREEN_RESIZE, payload: size })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
