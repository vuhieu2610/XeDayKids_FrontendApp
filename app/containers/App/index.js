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
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import route, { getRouteUrl } from '../../route';
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
  makeSelectSite,
  makeSelectProvinces,
  makeSelectUserLocationObject,
} from './selectors';
import { SCREEN_RESIZE } from './constants';
import { getScreenSize } from '../../utils/responsive';

import saga from './saga';
import {
  getCategories,
  toggleLocationModal,
  makeRequestGetHomeData,
  getProvinceData,
  setUserLocation as setUserLocationAction,
} from './actions';
import LocationModal from '../../components/LocationModal';

function App({
  location,
  setScreenSize,
  screenSize,
  logo,
  categories,
  getCates,
  getSiteConfigs,
  searchPlaceHolder,
  cart,
  cartNumber,
  handlerSelectLocation,
  locationModalState,
  breadcrumbs,
  site,
  dispatch,
  provinces,
  fetchProviceData,
  setUserLocation,
  userLocation,
}) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    const changeScreenSize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener('resize', changeScreenSize);
    getCates();
    getSiteConfigs();
    // console.log(categories);
    return () => {
      window.removeEventListener('resize', changeScreenSize);
    };
  }, []);

  const isMobile = getScreenSize('xl') >= screenSize;

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
          dispatch={dispatch}
        />
        <StyledContent mobile={isMobile ? 1 : 0}>
          {breadcrumbs.displayable && (
            <BreadcrumbBox>
              <PageWrapper>
                <Breadcrumb separator=">">
                  <Breadcrumb.Item>
                    <Link to={getRouteUrl('HomePage')}>Trang chủ</Link>
                  </Breadcrumb.Item>
                  {breadcrumbs.items.map(item => (
                    <Breadcrumb.Item key={_.uniqueId()}>
                      <Link to={item.href}>{item.name}</Link>
                    </Breadcrumb.Item>
                  ))}
                </Breadcrumb>
              </PageWrapper>
            </BreadcrumbBox>
          )}
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
        <StyledFooter>
          <PageWrapper>
            <Row>
              <Col sm={12} xs={24}>
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
              <Col sm={12} xs={0} />
            </Row>
          </PageWrapper>
        </StyledFooter>
        {isMobile && <Drawer logo={logo} categories={categories.data} />}
        <GlobalStyle />
      </Layout>
      <LocationModal
        isOpen={locationModalState}
        onCloseModal={handlerSelectLocation}
        provinces={provinces}
        fetchProviceData={fetchProviceData}
        setUserLocation={setUserLocation}
        userLocation={userLocation}
        setModalVisible={() => handlerSelectLocation(false)}
      />
    </React.Fragment>
  );
}

App.propTypes = {
  dispatch: propTypes.func,
  breadcrumbs: propTypes.object,
  site: propTypes.object,
  handlerSelectLocation: propTypes.func,
  cart: propTypes.object,
  cartNumber: propTypes.number,
  location: propTypes.string,
  screenSize: propTypes.number,
  setScreenSize: propTypes.func,
  getSiteConfigs: propTypes.func,
  getCates: propTypes.func,
  searchPlaceHolder: propTypes.string,
  logo: propTypes.string,
  locationModalState: propTypes.bool,
  categories: propTypes.shape({
    isLoading: propTypes.bool,
    data: propTypes.array,
    hasError: propTypes.bool,
  }),
  provinces: propTypes.array,
  fetchProviceData: propTypes.func,
  setUserLocation: propTypes.func,
  userLocation: propTypes.object,
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
  site: makeSelectSite(),
  provinces: makeSelectProvinces(),
  userLocation: makeSelectUserLocationObject(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setScreenSize: size => dispatch({ type: SCREEN_RESIZE, payload: size }),
  getCates: () => dispatch(getCategories()),
  handlerSelectLocation: state => dispatch(toggleLocationModal(state)),
  getSiteConfigs: () => dispatch(makeRequestGetHomeData()),
  fetchProviceData: () => dispatch(getProvinceData()),
  setUserLocation: location => dispatch(setUserLocationAction(location)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
