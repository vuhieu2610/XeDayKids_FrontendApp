/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * DetailPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useParams } from 'react-router-dom';
import { InputNumber, Button, Card, Table } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import makeSelectDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { setBreadcrumbs } from '../App/actions';
import { Main } from './selections';

function DetailPage({ changeBreadcrumbs }) {
  useInjectReducer({ key: 'detailPage', reducer });
  useInjectSaga({ key: 'detailPage', saga });

  const { slug } = useParams();

  console.log(slug);

  useEffect(() => {
    changeBreadcrumbs({
      displayable: true,
      items: [
        {
          href: '/',
          name: 'Trang chủ',
        },
        {
          name: 'Trang Chi tiết',
        },
      ],
    });
  }, []);

  return (
    <div>
      <Helmet>
        <title>DetailPage</title>
        <meta name="description" content="Description of DetailPage" />
      </Helmet>

      <Main>
        <div className="row-main">
          <div className="item">
            <div className="control">
              <div className="thumb" selected>
                <img
                  src="https://bibomart.com.vn/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/g/h/ghe-an-bot-sai-gon-xanh-120129.jpg"
                  alt="demo"
                />
              </div>
              <div className="thumb">
                <img
                  src="https://bibomart.com.vn/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/g/h/ghe-an-bot-sai-gon-xanh-120129.jpg"
                  alt="demo"
                />
              </div>
              <div className="thumb">
                <img
                  src="https://bibomart.com.vn/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/g/h/ghe-an-bot-sai-gon-xanh-120129.jpg"
                  alt="demo"
                />
              </div>
              <div className="thumb">
                <img
                  src="https://bibomart.com.vn/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/g/h/ghe-an-bot-sai-gon-xanh-120129.jpg"
                  alt="demo"
                />
              </div>
              <div className="thumb">
                <img
                  src="https://bibomart.com.vn/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/g/h/ghe-an-bot-sai-gon-xanh-120129.jpg"
                  alt="demo"
                />
              </div>
              <div className="thumb">
                <img
                  src="https://bibomart.com.vn/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/g/h/ghe-an-bot-sai-gon-xanh-120129.jpg"
                  alt="demo"
                />
              </div>
            </div>
            <div className="preview">
              <img
                src="https://bibomart.com.vn/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/g/h/ghe-an-bot-sai-gon-xanh-120129.jpg"
                alt="demo"
              />
            </div>
          </div>
          <div className="item-info-main">
            <div className="page-title-wrapper">
              <h1 className="page-title">
                Chuyển đến phần đầu của thư viện hình ảnh Ghế ăn bột Sài Gòn màu
                xanh
              </h1>
            </div>
            <div className="product-brand-container">
              <p className="branch-name">
                <span className="label">Mã sản phầm: </span>
                <span>123456</span>
              </p>
            </div>
            <div className="attributes">
              <ul>
                <li>
                  Thực phẩm bổ sung: sản phẩm dinh dưỡng Icreo Follow up Milk
                  (Icreo số 1)
                </li>
                <li>Giúp hệ tiêu hóa khỏe, trí não tinh anh</li>
                <li>
                  Bổ sung dinh dưỡng khó hấp thu từ bữa ăn: Sắt - vitamin C,
                  vitamin D - photpho, canxi,…
                </li>
              </ul>
            </div>
            <div className="product-info-price">
              <strong>100.000 ₫</strong>
            </div>
            <div className="actions">
              <div className="number">
                <label>
                  <span>Số lượng</span>
                  <div className="number-control">
                    <Button>-</Button>
                    <InputNumber min={0} width={300} defaultValue={0} />
                    <Button>+</Button>
                  </div>
                </label>
              </div>
              <div className="order-actions">
                <Button className="order-now" type="danger" size="large">
                  Mua ngay
                </Button>
                <Button
                  className="add-to-card"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>
          </div>
          <div className="sidebar-right">
            <Card title="Liên hệ">
              <ul>
                <li>Hotline: 1800 6886</li>
                <li>Email: cskh@bibomart.com.vn</li>
              </ul>
            </Card>
            <Card>
              <ul>
                <li> Miễn phí giao hàng</li>
                <li>365 ngày đổi trả</li>
                <li>100% tích điểm thưởng</li>
              </ul>
            </Card>
          </div>
        </div>
        <div className="row-detail">
          <div className="product info detailed">
            <div className="data item title">Thông tin chi tiết</div>
            <div className="data item content">
              <Table
                showHeader={false}
                bordered
                pagination={false}
                dataSource={[
                  {
                    key: 'Thương hiệu',
                    value: 'Demo brand',
                  },
                  {
                    key: 'Xuất xứ thương hiệu',
                    value: 'Nhật Bản',
                  },
                  {
                    key: 'Nơi sản xuất',
                    value: 'Nhật Bản',
                  },
                  {
                    key: 'Độ tuổi sử dụng',
                    value: '1 - 3 tuổi',
                  },
                ]}
              >
                <Table.Column
                  className="label"
                  title="key"
                  dataIndex="key"
                  width={180}
                />
                <Table.Column title="value" dataIndex="value" />
              </Table>
            </div>
            <div className="data item title">Mô tả sản phẩm</div>
            <div className="data item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem
              delectus ullam voluptatum est distinctio quasi enim culpa
              asperiores quis, corrupti facilis vel officiis magni quibusdam
              suscipit. Quaerat aliquam magni impedit. <br />
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem
              delectus ullam voluptatum est distinctio quasi enim culpa
              asperiores quis, corrupti facilis vel officiis magni quibusdam
              suscipit. Quaerat aliquam magni impedit. <br />
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem
              delectus ullam voluptatum est distinctio quasi enim culpa
              asperiores quis, corrupti facilis vel officiis magni quibusdam
              suscipit. Quaerat aliquam magni impedit.
            </div>
          </div>
          <div className="sidebar-right" />
        </div>
      </Main>
    </div>
  );
}

DetailPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  changeBreadcrumbs: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  detailPage: makeSelectDetailPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeBreadcrumbs: obj => dispatch(setBreadcrumbs(obj)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DetailPage);
