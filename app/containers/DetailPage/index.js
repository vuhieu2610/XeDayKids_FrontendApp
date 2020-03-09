/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * DetailPage
 *
 */

import React, { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useParams } from 'react-router-dom';
import {
  InputNumber,
  Button,
  Card,
  Table,
  Row,
  Col,
  Carousel,
  Progress,
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import _ from 'lodash';
import makeSelectDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { setBreadcrumbs } from '../App/actions';
import { Main } from './selections';
import { getScreenSize } from '../../utils/responsive';
import { makeSelectScreenSize } from '../App/selectors';
import FlashSale from '../../components/FlashSale';

function DetailPage({ screenSize, detailPage }) {
  useInjectReducer({ key: 'detailPage', reducer });
  useInjectSaga({ key: 'detailPage', saga });
  const [previewUrl, setPreviewUrl] = useState(detailPage.Images[0].src);

  const { slug } = useParams();

  console.log(slug);
  const isMobile = getScreenSize('xl') >= screenSize;
  return (
    <React.Fragment>
      <Helmet>
        <title>{detailPage.ShortName}</title>
        <meta name="description" content={detailPage.Metatitle} />
      </Helmet>

      <Main mobile={isMobile ? 1 : 0}>
        <Row gutter={[10, 10]}>
          <Col xl={9} xs={24} md={24}>
            <div className="product-inf">
              <div className="control">
                <Carousel
                  dots={false}
                  draggable
                  slidesToScroll={3}
                  speed={700}
                  infinite={false}
                  slidesToShow={4.5}
                  responsive={[
                    {
                      breakpoint: 1440,
                      settings: {
                        slidesToShow: 4.5,
                        // slidesToScroll: 4,
                      },
                    },
                    {
                      breakpoint: 1350,
                      settings: {
                        slidesToShow: 5.5,
                        // slidesToScroll: 4,
                      },
                    },
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 11.5,
                        // slidesToScroll: 4,
                      },
                    },
                    {
                      breakpoint: 768,
                      settings: {
                        slidesToShow: 8.5,
                        // slidesToScroll: 4,
                      },
                    },
                    {
                      breakpoint: 425,
                      settings: {
                        slidesToShow: 4.5,
                        // slidesToScroll: 4,
                      },
                    },
                    {
                      breakpoint: 375,
                      settings: {
                        slidesToShow: 4.1,
                        // slidesToScroll: 4,
                      },
                    },
                    {
                      breakpoint: 320,
                      settings: {
                        slidesToShow: 3.5,
                        // slidesToScroll: 4,
                      },
                    },
                  ]}
                >
                  {detailPage.Images.map(image => (
                    <div
                      className="thumb "
                      onClick={() => setPreviewUrl(image.src)}
                      key={_.uniqueId()}
                    >
                      <img src={image.src} alt={image.src} />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="preview">
                <img src={previewUrl} alt="demo" />
              </div>
            </div>
          </Col>
          <Col xl={9} xs={24} md={24}>
            <div className="item-info-main">
              <div className="page-title-wrapper">
                <h1 className="page-title">{detailPage.ShortName}</h1>
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
                <p className="special-price-item">
                  <span className="price-label">Giá: </span>
                  <span className="span-price">1.090.000 ₫</span>
                </p>
                <p className="saleoff-price-item">
                  <span className="price-label">Tiết kiệm:</span>
                  <span className="discount-percent"> 45% </span>({' '}
                  <span className="span-saving-price">900.000đ</span> )
                </p>
                <p className="old-price-item">
                  <span className="price-label">Giá thị trường:</span>
                  <span className="span-list-price">1.990.000đ</span>
                </p>

                <div className="deal-process">
                  <div className="deal-process-wrapper">
                    <div className="deal-time">
                      <span className="icon-timer" />
                      khuyến mãi kết thúc sau:
                      <span>02 ngày 00:00:00</span>
                    </div>
                    <div className="deal-info">
                      Đã bán 10 <Progress percent={70} status="exception" />
                    </div>
                  </div>
                </div>
              </div>
              <Row className="actions" gutter={[10, 10]}>
                <Col lg={24} md={8} xs={24} className="number">
                  <label>
                    <span>Số lượng</span>
                    <div className="number-control">
                      <Button>-</Button>
                      <InputNumber min={0} width={300} defaultValue={0} />
                      <Button>+</Button>
                    </div>
                  </label>
                </Col>
                <Col lg={24} md={16} xs={24} className="order-actions">
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
                </Col>
              </Row>
            </div>
          </Col>
          <Col xl={6} xs={0} md={0}>
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
              <div style={{ position: 'absolute', width: '100%' }}>
                <FlashSale
                  endDate="27-03-2020 08:30:00"
                  offsetTop={115}
                  price="80.000 ₫"
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col xl={18} md={24} xs={24}>
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
              <div
                className="data item"
                dangerouslySetInnerHTML={{
                  __html: detailPage.Description,
                }}
              />
            </div>
          </Col>
          <Col xl={6}>
            <div className="sidebar-right" />
          </Col>
        </Row>
      </Main>
    </React.Fragment>
  );
}

DetailPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  changeBreadcrumbs: PropTypes.func.isRequired,
  screenSize: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  detailPage: makeSelectDetailPage(),
  screenSize: makeSelectScreenSize(),
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
