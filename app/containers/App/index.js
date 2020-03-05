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
import { Layout, Breadcrumb } from 'antd';

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
  makeSelectLogo
} from './selectors';
import { SCREEN_RESIZE } from './constants';
import { getScreenSize } from '../../utils/responsive';

import saga from './saga';
import { getCategories } from './actions';

function App({ location, setScreenSize, screenSize, logo, getCates }) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    const changeScreenSize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener('resize', changeScreenSize);
    getCates();
    return () => {
      window.removeEventListener('resize', changeScreenSize);
    };
  }, []);

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
      <Header location={location} logo={logo} mobile={isMobile ? 1 : 0} />
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
        <StyledFooter style={{ textAlign: 'center' }}>
          Design by HieuVM
        </StyledFooter>
      ) : (
        <Drawer logo={logo} />
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
  getCates: propTypes.func
};

const mapStateToProps = createStructuredSelector({
  breadcrumbs: makeSelectBreadcrumb(),
  location: makeSelectUserLocation(),
  screenSize: makeSelectScreenSize(),
  routeLocation: makeSelectLocation(),
  logo: makeSelectLogo()
});

const mapDispatchToProps = dispatch => ({
  setScreenSize: size => dispatch({ type: SCREEN_RESIZE, payload: size }),
  getCates: () => dispatch(getCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
