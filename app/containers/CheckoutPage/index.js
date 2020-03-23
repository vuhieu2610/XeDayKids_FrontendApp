/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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

import { useInjectReducer } from 'utils/injectReducer';
import { Helmet } from 'react-helmet';
import { useInjectSaga } from 'utils/injectSaga';
import { Table, Card, Button, Row, Col, Tooltip } from 'antd';
import {
  EnvironmentFilled,
  DeleteOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import saga from './saga';
import { CustomEmpty, CartContainer } from './selections';
import reducer from './reducer';
import { setBreadcrumbs, toggleLocationModal } from '../App/actions';
import {
  makeSelectUserLocation,
  makeSelectCartItems,
  makeSelectCartNumber,
  makeSelectTotalPrice,
} from '../App/selectors';
import messages from './messages';
import { toMoney } from '../../utils/string';
import { updateCacheItem } from './actions';

function CheckoutPage({
  changeBreadcrumbs,
  location,
  cartItems,
  cartCount,
  cartTotalPrice,
  handlerSelectLocation,
  fetchItems,
}) {
  useInjectSaga({ key: 'checkoutPage', saga });
  useInjectReducer({ key: 'checkoutPage', reducer });

  useEffect(() => {
    changeBreadcrumbs({
      displayable: true,
      items: [
        {
          name: 'Giỏ mua hàng',
          href: '#',
        },
      ],
    });

    if (cartCount > 0) {
      fetchItems(cartItems.map(item => item.ProductId));
    }
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Giỏ mua hàng</title>
      </Helmet>

      {_.eq(cartCount, 0) && (
        <CustomEmpty
          image="https://bibomart.com.vn/media/wysiwyg/bibomart_theme/giohangrong.png"
          description={<FormattedMessage {...messages.empty} />}
        />
      )}

      {cartCount > 0 && (
        <CartContainer>
          <Row>
            <Col xs={24} sm={24} xl={24}>
              <div className="page-title-wrapper">
                <h1 className="page-title">
                  <span className="base" data-ui-id="page-title-wrapper">
                    <FormattedMessage {...messages.title} />
                  </span>
                </h1>
              </div>
              <Row gutter={[10, 10]}>
                <Col xs={24} sm={24} xl={16} className="left-side">
                  <Table
                    bordered
                    pagination={false}
                    dataSource={cartItems.map((item, index) => ({
                      ...item,
                      key: index,
                    }))}
                  >
                    <Table.Column
                      title="Sản phẩm"
                      key="ProductName"
                      dataIndex="ProductName"
                    />
                    <Table.Column
                      title="Giá"
                      key="ProductPrice"
                      align="center"
                      render={row =>
                        toMoney(row.PromotionPrice || row.ProductPrice)
                      }
                    />
                    <Table.Column
                      title="Số lượng"
                      key="Quantity"
                      dataIndex="Quantity"
                      align="center"
                      render={(text, record) => (
                        <div>
                          <Button icon={<PlusOutlined />} shape="circle" />
                          <span
                            style={{
                              height: 36,
                              width: 45,
                              textAlign: 'center',
                              lineHeight: 1.29,
                              display: 'inline-block',
                            }}
                          >
                            {text}
                          </span>
                          <Button icon={<MinusOutlined />} shape="circle" />
                        </div>
                      )}
                    />
                    <Table.Column
                      title="Thành tiền"
                      key="subtotal"
                      align="center"
                      render={row =>
                        toMoney(
                          (row.PromotionPrice || row.ProductPrice) *
                            row.Quantity,
                        )
                      }
                    />
                    <Table.Column
                      title=""
                      key="actions"
                      align="center"
                      render={row => (
                        <Tooltip placement="bottom" title="Xoá khỏi giỏ hàng">
                          <Button
                            type="danger"
                            shape="circle"
                            icon={<DeleteOutlined />}
                          />
                        </Tooltip>
                      )}
                    />
                  </Table>
                </Col>
                <Col xs={24} sm={24} xl={8} className="right-side">
                  <Card title="Giao hàng tới">
                    <Button
                      type="link"
                      style={{
                        cursor: 'pointer',
                        color: '#333',
                        fontWeight: 'normal',
                        padding: 0,
                      }}
                      onClick={handlerSelectLocation}
                      icon={<EnvironmentFilled />}
                    >
                      <span>
                        {location || (
                          <FormattedMessage {...messages.locationAsking} />
                        )}
                      </span>
                    </Button>
                  </Card>

                  <Card
                    headStyle={{ padding: '0 16px' }}
                    title={
                      <span>
                        <FormattedMessage {...messages.totals} />
                        <span style={{ color: '#828282' }}>
                          ( {cartCount} <FormattedMessage {...messages.item} />{' '}
                          )
                        </span>
                      </span>
                    }
                  >
                    <table className="data table totals">
                      <tbody>
                        <tr>
                          <th>
                            <FormattedMessage {...messages.price} />
                          </th>
                          <td>
                            <span className="price">
                              {toMoney(cartTotalPrice)}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                  <Button className="checkout" type="danger">
                    <FormattedMessage {...messages.checkoutButton} />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </CartContainer>
      )}
    </Fragment>
  );
}

CheckoutPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  changeBreadcrumbs: PropTypes.func.isRequired,
  location: PropTypes.string,
  cartItems: PropTypes.array,
  cartCount: PropTypes.number,
  cartTotalPrice: PropTypes.number,
  handlerSelectLocation: PropTypes.func,
  fetchItems: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeBreadcrumbs: obj => dispatch(setBreadcrumbs(obj)),
    handlerSelectLocation: () => dispatch(toggleLocationModal(true)),
    fetchItems: items => dispatch(updateCacheItem(items)),
  };
}

function mapStateToProps() {
  return createStructuredSelector({
    location: makeSelectUserLocation(),
    cartItems: makeSelectCartItems(),
    cartCount: makeSelectCartNumber(),
    cartTotalPrice: makeSelectTotalPrice(),
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
