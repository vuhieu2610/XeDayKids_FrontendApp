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
import propTypes from 'prop-types';
// import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import route, { breadcrumbRoutes } from '../../route';
import GlobalStyle from '../../global-styles';
import {
  StyledContent,
  StyledFooter,
  BreadcrumbBox,
  PageWrapper,
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
  makeSelectCategories,
  makeSelectCart,
  makeSelectCartNumber,
  makeSelectLocationModalState,
} from './selectors';
import { SCREEN_RESIZE } from './constants';
import { getScreenSize } from '../../utils/responsive';

import saga from './saga';
import { getCategories, toggleLocationModal } from './actions';
import LocationModal from '../../components/LocationModal';

function App({
  location,
  setScreenSize,
  screenSize,
  logo,
  categories,
  getCates,
  searchPlaceHolder,
  cart,
  cartNumber,
  handlerSelectLocation,
  locationModalState,
}) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    const changeScreenSize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener('resize', changeScreenSize);
    getCates();
    // console.log(categories);
    return () => {
      window.removeEventListener('resize', changeScreenSize);
    };
  }, []);

  const isMobile = getScreenSize('xl') >= screenSize;

  function itemRender(_route, params, routes, paths) {
    const last = routes.indexOf(_route) === routes.length - 1;
    return last ? (
      <span>{_route.breadcrumbName}</span>
    ) : (
      <Link to={paths.join('/')}>{_route.breadcrumbName}</Link>
    );
  }

  return (
    <React.Fragment>
      <Layout>
        <Header
          location={location}
          searchPlaceholder={searchPlaceHolder}
          logo={logo}
          mobile={isMobile ? 1 : 0}
          cart={cart}
          cartNumber={cartNumber}
          handlerSelectLocation={handlerSelectLocation}
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
                  <p>
                    Điện thoại: (024) 73091168 - Email: cskh@bibomart.com.vn
                  </p>
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
          <Drawer logo={logo} categories={categories.data} />
        )}
        <GlobalStyle />
      </Layout>
      <LocationModal
        isOpen={locationModalState}
        onCloseModal={handlerSelectLocation}
      />
    </React.Fragment>
  );
}

App.propTypes = {
  handlerSelectLocation: propTypes.func,
  cart: propTypes.array,
  cartNumber: propTypes.number,
  location: propTypes.string,
  screenSize: propTypes.number,
  setScreenSize: propTypes.func,
  getCates: propTypes.func,
  searchPlaceHolder: propTypes.string,
  logo: propTypes.string,
  locationModalState: propTypes.bool,
  categories: propTypes.shape({
    isLoading: propTypes.bool,
    data: propTypes.array,
    hasError: propTypes.bool,
  }),
};

const mapStateToProps = createStructuredSelector({
  cart: makeSelectCart(),
  cartNumber: makeSelectCartNumber(),
  breadcrumbs: makeSelectBreadcrumb(),
  location: makeSelectUserLocation(),
  screenSize: makeSelectScreenSize(),
  routeLocation: makeSelectLocation(),
  searchPlaceHolder: makeSelectSearchPlaceholder(),
  logo: makeSelectLogo(),
  categories: makeSelectCategories(),
  locationModalState: makeSelectLocationModalState(),
});

const mapDispatchToProps = dispatch => ({
  setScreenSize: size => dispatch({ type: SCREEN_RESIZE, payload: size }),
  getCates: () => dispatch(getCategories()),
  handlerSelectLocation: state => dispatch(toggleLocationModal(state)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
