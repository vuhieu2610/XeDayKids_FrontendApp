/* eslint-disable no-script-url */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * DetailPage
 *
 */

import React, { memo, useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useParams, Link } from 'react-router-dom';
import {
  InputNumber,
  Button,
  Card,
  Table,
  Row,
  Col,
  Carousel,
  Progress,
  message,
  Empty,
} from 'antd';
import produce from 'immer';
import { ShoppingCartOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { setBreadcrumbs } from '../App/actions';
import { Main } from './selections';
import { getScreenSize } from '../../utils/responsive';
import { makeSelectScreenSize } from '../App/selectors';
import FlashSale from '../../components/FlashSale';
import { getDetail } from './actions';
import { baseURL } from '../../utils/request';
import { toMoney, getSlug } from '../../utils/string';
import { getRouteUrl } from '../../route';

const defaultItem = {
  hasData: true,
  data: {
    ProductId: 0,
    Code: '',
    ShortName: '',
    Name: '',
    Price: 0,
    BuyerCount: 0,
    RatePerMinute: 0,
    CategoryId: 0,
    CategoryName: null,
    CategoryShortName: null,
    DescriptionId: 0,
    Content: '',
    Details: [],
    ShortDescription: '',
    Images: [],
    ImageList: [],
    Attributes: [],
    SimilarProductIds: '',
    RelatedPostIds: '',
    RelatedTagIds: '',
    Rating: null,
    RatingCount: null,
    DiscountId: null,
    IsDeleted: false,
    CreateBy: null,
    CreationDate: null,
    LastUpdateBy: null,
    LastUpdateDate: null,
    DeleteBy: null,
    DeleteDate: null,
    PromotionId: 0,
    PromotionCode: '',
    PromotionShortName: '',
    PromotionName: '',
    PromotionImages: [],
    PromotionQuantity: 0,
    PromotionCurrentPrice: 0,
    PromotionPrice: 0,
    PromotionStartDate: '',
    PromotionEndDate: '',
    PromotionBuyerCount: 0,
    PromotionRatePerMinute: 0,
    PromotionAttributes: [],
    PromotionDetails: [],
    PromotionDescriptionId: 0,
  },
};
const thumbSliderConfigs = [
  {
    breakpoint: 1440,
    settings: {
      slidesToShow: 4.5,
      slidesToScroll: 4,
    },
  },
  {
    breakpoint: 1350,
    settings: {
      slidesToShow: 5.5,
      slidesToScroll: 5,
    },
  },
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 11.5,
      slidesToScroll: 11,
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 8.5,
      slidesToScroll: 8,
    },
  },
  {
    breakpoint: 425,
    settings: {
      slidesToShow: 4.5,
      slidesToScroll: 4,
    },
  },
  {
    breakpoint: 375,
    settings: {
      slidesToShow: 4.1,
      slidesToScroll: 4,
    },
  },
  {
    breakpoint: 320,
    settings: {
      slidesToShow: 3.5,
      slidesToScroll: 3,
    },
  },
];

let hideLoading = null;
function DetailPage({ screenSize, changeBreadcrumbs }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [item, setItem] = useState(defaultItem);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [quantityItem, setQuantityItem] = useState(0);

  const { productId } = useParams();

  const fetchingItem = async () => {
    setIsLoading(true);
    try {
      const res = await getDetail(productId);
      const { data: body } = res;

      if (!body || body.HasError) {
        setHasError(true);
      } else {
        const { Data: data, HasData: hasData } = body;
        if (hasData) {
          // const data = data[0];
          if (!_.isNull(data.Images)) {
            try {
              data.Images = JSON.parse(data.Images);
            } catch (err) {
              data.Images = [];
            }
          }

          if (!_.isNull(data.Attributes)) {
            try {
              data.Attributes = JSON.parse(data.Attributes);
            } catch (err) {
              data.Attributes = [];
            }
          }

          if (!_.isNull(data.Details)) {
            try {
              data.Details = JSON.parse(data.Details);
            } catch (err) {
              data.Details = [];
            }
          }

          if (!_.isNull(data.PromotionImages)) {
            try {
              data.PromotionImages = JSON.parse(data.PromotionImages);
            } catch (err) {
              data.PromotionImages = [];
            }
          }

          if (!_.isNull(data.PromotionAttributes)) {
            try {
              data.PromotionAttributes = JSON.parse(data.PromotionAttributes);
            } catch (err) {
              data.PromotionAttributes = [];
            }
          }

          if (!_.isNull(data.PromotionDetails)) {
            try {
              data.PromotionDetails = JSON.parse(data.PromotionDetails);
            } catch (err) {
              data.PromotionDetails = [];
            }
          }

          setItem(
            produce(item, draftItem => {
              draftItem.data = data;
              draftItem.hasData = true;
            }),
          );
        } else {
          setItem(
            produce(item, draftItem => {
              draftItem.hasData = false;
            }),
          );
        }
      }
    } catch (err) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      hideLoading = message.loading('Đang lấy dữ liệu', 0);
    } else if (!_.isNull(hideLoading)) {
      hideLoading();
      hideLoading = null;
    }
  }, [isLoading]);

  useEffect(() => {
    if (!item.data.Images) return;
    window.item = item;
    try {
      setPreviewUrl(item.data.Images[0].url);
    } catch (err) {
      //
    }

    changeBreadcrumbs({
      displayable: true,
      items: [
        {
          name: item.data.CategoryName,
          href: getRouteUrl('ListPage', {
            slug: getSlug(item.data.CategoryName),
            id: item.data.CategoryId,
          }),
        },
        {
          name: item.data.Name,
          href: '#',
        },
      ],
    });
  }, [item]);

  useEffect(() => {
    fetchingItem();
  }, []);

  const isMobile = getScreenSize('xl') >= screenSize;

  const renderDetail = () => (
    <Fragment>
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
                responsive={thumbSliderConfigs}
              >
                {item.data.Images.map(image => (
                  <div
                    className={`thumb ${_.eq(previewUrl, image.url) &&
                      'active'}`}
                    onClick={() => setPreviewUrl(image.url)}
                    key={_.uniqueId()}
                  >
                    <img src={baseURL + image.url} alt={image.url} />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="preview">
              <img src={baseURL + previewUrl} alt="demo" />
            </div>
          </div>
        </Col>
        <Col xl={9} xs={24} md={24}>
          <div className="item-info-main">
            <div className="page-title-wrapper">
              <h1 className="page-title">{item.data.Name}</h1>
            </div>
            <div className="product-brand-container">
              <p className="branch-name">
                <span className="label">Mã sản phầm: </span>
                <span>{item.data.ProductId}</span>
              </p>
              {item.data.BuyerCount > 0 && (
                <p className="branch-name">
                  <span className="label">Số người mua: </span>
                  <span>{item.data.BuyerCount}</span>
                </p>
              )}
            </div>
            <div className="attributes">
              <ul>
                {item.data.Attributes.map(attribute => (
                  <li key={_.uniqueId()}>{attribute.value}</li>
                ))}
              </ul>
            </div>
            <div className="product-info-price">
              <p className="special-price-item">
                <span className="price-label">Giá: </span>
                <span className="span-price">{toMoney(item.data.Price)} ₫</span>
              </p>
              {item.data.DiscountId && (
                <Fragment>
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
                </Fragment>
              )}
            </div>
            <Row className="actions" gutter={[10, 10]}>
              <Col lg={24} md={8} xs={24} className="number">
                <label>
                  <span>Số lượng</span>
                  <div className="number-control">
                    <Button
                      onClick={() =>
                        setQuantityItem(
                          quantityItem <= 1 ? 0 : quantityItem - 1,
                        )
                      }
                    >
                      -
                    </Button>
                    <InputNumber min={0} width={300} value={quantityItem} />
                    <Button onClick={() => setQuantityItem(quantityItem + 1)}>
                      +
                    </Button>
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
                <li>Hotline: 123456789</li>
                <li>Email: cskh@xedaykids.com.vn</li>
              </ul>
            </Card>
            <Card>
              <ul>
                <li> Miễn phí giao hàng</li>
                <li>365 ngày đổi trả</li>
                <li>100% tích điểm thưởng</li>
              </ul>
            </Card>
            {item.data.PromotionId && (
              <div style={{ position: 'absolute' }}>
                <FlashSale
                  endDate={item.data.PromotionEndDate}
                  offsetTop={115}
                  price={`${toMoney(item.data.PromotionPrice)} đ`}
                />
              </div>
            )}
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
                dataSource={item.data.Details}
                emptyText="Không có thông tin"
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
              style={{ minHeight: 150 }}
              dangerouslySetInnerHTML={{
                __html: item.data.Content,
              }}
            />
          </div>
        </Col>
        <Col xl={6}>
          <div className="sidebar-right" />
        </Col>
      </Row>
    </Fragment>
  );

  const renderNotFound = () => (
    <div style={{ paddingTop: 20 }}>
      <Empty description="Không tìm thấy sản phẩm" />
      <Button
        type="primary"
        size="large"
        style={{
          margin: '20px auto',
          display: 'block',
        }}
      >
        <Link to={getRouteUrl('HomePage')}>Quay lại trang chủ</Link>
      </Button>
    </div>
  );

  const renderError = () => (
    <div style={{ paddingTop: 20 }}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Có lỗi xảy ra, vui lòng thử lại sau."
      />
      <Button
        type="primary"
        size="large"
        style={{
          margin: '20px auto',
          display: 'block',
        }}
      >
        <Link to={getRouteUrl('HomePage')}>Quay lại trang chủ</Link>
      </Button>
    </div>
  );

  const renderBody = () => {
    if (isLoading) {
      return '';
    }

    if (!item.hasData) {
      return renderNotFound();
    }

    if (hasError) {
      return renderError();
    }

    return renderDetail();
  };

  return (
    <Fragment>
      <Helmet>
        <title>{item.data.ShortName}</title>
        <meta name="description" content={item.data.ShortDescription} />
      </Helmet>

      <Main mobile={isMobile ? 1 : 0}>{renderBody()}</Main>
    </Fragment>
  );
}

DetailPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  changeBreadcrumbs: PropTypes.func.isRequired,
  screenSize: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
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
