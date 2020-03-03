/* eslint-disable react/no-unused-prop-types */
/**
 *
 * CheckoutPage
 *
 */

import React, { memo, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import { Helmet } from 'react-helmet';
import { useInjectSaga } from 'utils/injectSaga';
import { Table, Card, Button } from 'antd';
import { EnvironmentFilled } from '@ant-design/icons';
import { createStructuredSelector } from 'reselect';
import saga from './saga';
import { CustomEmpty, CartContainer } from './selections';
import { setBreadcrumbs } from '../App/actions';
import { makeSelectUserLocation } from '../App/selectors';
import messages from './messages';

function CheckoutPage({ changeBreadcrumbs, location }) {
  useInjectSaga({ key: 'checkoutPage', saga });

  useEffect(() => {
    changeBreadcrumbs({
      displayable: true,
      items: [
        {
          href: '/',
          name: 'Trang chủ',
        },
        {
          name: 'Giỏ mua hàng',
        },
      ],
    });
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Giỏ mua hàng</title>
        <meta name="description" content="Description of DetailPage" />
      </Helmet>

      {false && (
        <CustomEmpty
          image="https://bibomart.com.vn/media/wysiwyg/bibomart_theme/giohangrong.png"
          description="Chưa có sản phẩm nào trong giỏ hàng."
        />
      )}

      <CartContainer>
        <div className="left-side">
          <div className="page-title-wrapper">
            <h1 className="page-title">
              <span className="base" data-ui-id="page-title-wrapper">
                <FormattedMessage {...messages.title} />
              </span>
            </h1>
          </div>
          <Table bordered pagination={false}>
            <Table.Column title="Sản phẩm" key="Name" />
            <Table.Column title="Giá" key="Price" align="center" />
            <Table.Column title="Số lượng" key="qty" align="center" />
            <Table.Column title="Thành tiền" key="subtotal" align="center" />
          </Table>
        </div>
        <div className="right-side">
          <Card title="Giao hàng tới">
            <EnvironmentFilled />
            <span>{location}</span>
          </Card>

          <Card title="Tổng số lượng sản phẩm">
            <table className="data table totals">
              <tbody>
                <tr>
                  <th>
                    <FormattedMessage {...messages.totals} />
                  </th>
                  <td>123.000 ₫</td>
                </tr>

                <tr>
                  <th>
                    <FormattedMessage {...messages.price} />
                  </th>
                  <td>
                    <span className="price">123.000 ₫</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
          <Button className="checkout" type="danger">
            <FormattedMessage {...messages.checkoutButton} />
          </Button>
        </div>
      </CartContainer>
    </Fragment>
  );
}

CheckoutPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  changeBreadcrumbs: PropTypes.func.isRequired,
  location: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeBreadcrumbs: obj => dispatch(setBreadcrumbs(obj)),
  };
}

function mapStateToProps() {
  return createStructuredSelector({
    location: makeSelectUserLocation(),
  });
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CheckoutPage);
