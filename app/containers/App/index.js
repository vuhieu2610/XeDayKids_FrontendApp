/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import DetailPage from 'containers/DetailPage/Loadable';
import CheckoutPage from 'containers/CheckoutPage';

import propTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import GlobalStyle from '../../global-styles';
import { StyledContent, StyledFooter, BreadcrumbBox } from './selections';
import Header from '../../components/Header';
import { makeSelectBreadcrumb, makeSelectUserLocation } from './selectors';

function App({ breadcrumbs, location }) {
  return (
    <Layout>
      <Header location={location} />
      <StyledContent>
        {breadcrumbs.displayable && (
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
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/checkout/cart" component={CheckoutPage} />
            <Route path="/:slug" component={DetailPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </StyledContent>
      <StyledFooter style={{ textAlign: 'center' }}>
        Design by HieuVM
      </StyledFooter>
      <GlobalStyle />
    </Layout>
  );
}

App.propTypes = {
  breadcrumbs: propTypes.object,
  location: propTypes.string,
};

const mapStateToProps = createStructuredSelector({
  breadcrumbs: makeSelectBreadcrumb(),
  location: makeSelectUserLocation(),
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
