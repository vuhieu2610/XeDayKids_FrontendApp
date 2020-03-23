/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * CheckoutPage
 *
 */

import React, { memo, useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import { useInjectReducer } from 'utils/injectReducer';
import { Helmet } from 'react-helmet';
import { useInjectSaga } from 'utils/injectSaga';
import { Table, Card, Button, Row, Col, Tooltip, Modal } from 'antd';
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
import {
  setBreadcrumbs,
  toggleLocationModal,
  addToCart,
  excludeItem as excludeItemAction,
  removeItem as removeItemAction,
} from '../App/actions';
import {
  makeSelectUserLocation,
  makeSelectCartItems,
  makeSelectCartNumber,
  makeSelectTotalPrice,
  makeSelectUserLocationObject,
} from '../App/selectors';
import messages from './messages';
import { toMoney } from '../../utils/string';
import { updateCacheItem, makeRequestOrder } from './actions';

function CheckoutPage({
  changeBreadcrumbs,
  location,
  cartItems,
  cartCount,
  cartTotalPrice,
  handlerSelectLocation,
  fetchItems,
  locationObject,
  includeItem,
  excludeItem,
  removeItem,
}) {
  useInjectSaga({ key: 'checkoutPage', saga });
  useInjectReducer({ key: 'checkoutPage', reducer });
  const [loading, setLoading] = useState(false);

  const postData = async () => {
    try {
      setLoading(true);
      const res = await makeRequestOrder({
        ...locationObject,
        total: cartTotalPrice,
        items: cartItems,
      });
      console.log(res);
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  };

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

  const handleOrder = () => {
    if (
      !locationObject ||
      !locationObject.province ||
      !locationObject.district ||
      !locationObject.address ||
      !locationObject.name ||
      !locationObject.phone ||
      !locationObject.email
    ) {
      Modal.warning({
        content: <FormattedMessage {...messages.warningMessage} />,
      });
      return;
    }
    postData();
  };

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
                          <Button
                            icon={<PlusOutlined />}
                            shape="circle"
                            onClick={() => {
                              if (loading) return;
                              includeItem({
                                ProductName: record.Name,
                                ProductId: record.ProductId,
                                PromotionCode: record.PromotionCode,
                                PromotionPrice:
                                  record.PromotionPrice || record.Price,
                                ProductPrice: record.Price,
                                Quantity: 1,
                                Code: record.PromotionCode,
                              });
                            }}
                          />
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
                          <Button
                            icon={<MinusOutlined />}
                            onClick={() => {
                              if (loading) return;
                              excludeItem({
                                ProductId: record.ProductId,
                              });
                            }}
                            shape="circle"
                          />
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
                      render={(row, record) => (
                        <Tooltip placement="bottom" title="Xoá khỏi giỏ hàng">
                          <Button
                            type="danger"
                            shape="circle"
                            onClick={() => {
                              if (loading) return;
                              removeItem({
                                ProductId: record.ProductId,
                              });
                            }}
                            icon={<DeleteOutlined />}
                          />
                        </Tooltip>
                      )}
                    />
                  </Table>
                </Col>
                <Col xs={24} sm={24} xl={8} className="right-side">
                  <Card title="Giao hàng tới" headStyle={{ padding: '0 16px' }}>
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
                      {location || (
                        <FormattedMessage {...messages.locationAsking} />
                      )}
                    </Button>
                  </Card>

                  <Card
                    headStyle={{ padding: '0 16px' }}
                    title={
                      <span>
                        <FormattedMessage {...messages.totals} />
                        <span style={{ color: '#828282' }}>
                          {' '}
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
                  <Button
                    className="checkout"
                    type="danger"
                    loading={loading}
                    onClick={handleOrder}
                  >
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
  locationObject: PropTypes.object,
  cartItems: PropTypes.array,
  cartCount: PropTypes.number,
  cartTotalPrice: PropTypes.number,
  handlerSelectLocation: PropTypes.func,
  fetchItems: PropTypes.func,
  includeItem: PropTypes.func,
  excludeItem: PropTypes.func,
  removeItem: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeBreadcrumbs: obj => dispatch(setBreadcrumbs(obj)),
    handlerSelectLocation: () => dispatch(toggleLocationModal(true)),
    fetchItems: items => dispatch(updateCacheItem(items)),
    includeItem: item => dispatch(addToCart(item)),
    excludeItem: item => dispatch(excludeItemAction(item)),
    removeItem: item => dispatch(removeItemAction(item)),
  };
}

function mapStateToProps() {
  return createStructuredSelector({
    location: makeSelectUserLocation(),
    cartItems: makeSelectCartItems(),
    cartCount: makeSelectCartNumber(),
    cartTotalPrice: makeSelectTotalPrice(),
    locationObject: makeSelectUserLocationObject(),
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
