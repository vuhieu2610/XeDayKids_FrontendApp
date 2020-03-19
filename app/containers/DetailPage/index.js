/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/iframe-has-title */
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

import { useParams, Link, useHistory } from 'react-router-dom';
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
import moment from 'moment';
import {
  ShoppingCartOutlined,
  PhoneOutlined,
  MailOutlined,
  SyncOutlined,
  StarOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import { setBreadcrumbs, addToCart } from '../App/actions';
import { Main } from './selections';
import { getScreenSize } from '../../utils/responsive';
import { makeSelectScreenSize } from '../App/selectors';
import FlashSale from '../../components/FlashSale';
import { getDetail } from './actions';
import { baseURL } from '../../utils/request';
import { toMoney, getSlug } from '../../utils/string';
import { getRouteUrl } from '../../route';
import RelateItems from '../../components/RelateItems';

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
const interval = 1000;
const timeFormat = `YYYY-MM-DD'T'HH:mm:ss`;

function DetailPage({ screenSize, changeBreadcrumbs, addItemToCart }) {
  const history = useHistory();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [item, setItem] = useState(defaultItem);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [quantityItem, setQuantityItem] = useState(0);

  const [showRelateItems, setShowRelateItems] = useState(false);

  const [day, setDay] = useState('00');
  const [hour, setHour] = useState('00');
  const [min, setMin] = useState('00');
  const [second, setSecond] = useState('00');
  const [percentDeal, setPercentDeal] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);

  useEffect(() => {
    const { data } = item;

    if (!data || !data.PromotionId) return;

    setPercentDeal(100 - _.round((data.PromotionPrice / data.Price) * 100));

    const endDate = moment(data.PromotionEndDate, timeFormat).unix();
    const startDate = moment().unix();
    const diffTime = endDate - startDate;
    let duration = moment.duration(diffTime * 1000, 'milliseconds');
    setCurrentDuration(duration);
    const loop = setInterval(() => {
      duration = moment.duration(
        duration.asMilliseconds() - interval,
        'milliseconds',
      );
      setCurrentDuration(duration);
      let d = moment.duration(duration).days();
      let h = moment.duration(duration).hours();
      let m = moment.duration(duration).minutes();
      let s = moment.duration(duration).seconds();
      d = _.trim(d).length === 1 ? `0${d}` : d;
      h = _.trim(h).length === 1 ? `0${h}` : h;
      m = _.trim(m).length === 1 ? `0${m}` : m;
      s = _.trim(s).length === 1 ? `0${s}` : s;

      setDay(duration > 0 ? d : '00');
      setHour(duration > 0 ? h : '00');
      setMin(duration > 0 ? m : '00');
      setSecond(duration > 0 ? s : '00');
    }, interval);

    return () => {
      clearInterval(loop);
    };
  }, [item]);

  const { productId } = useParams();

  const doAddToCart = (defaultQty = 1) => {
    const { data } = item;
    addItemToCart({
      ProductId: data.ProductId,
      PromotionPrice: data.PromotionPrice || data.Price,
      ProductPrice: data.Price,
      Quantity: quantityItem || defaultQty,
      Code: data.PromotionCode,
    });
    setQuantityItem(0);
  };

  const socialUrl = `https://www.facebook.com/plugins/like.php?href=${encodeURIComponent(
    window.location.href,
  )}&width=150&layout=button_count&action=like&size=small&share=true&height=20&appId=787227998123391`;

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
  }, [productId]);

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
                slidesToScroll={5}
                speed={700}
                infinite={false}
                slidesToShow={5.2}
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
              {item.data.BuyerCount > 0 && (
                <div className="social-box">
                  <p className="branch-name buyer-count">
                    <span className="label">Số người mua: </span>
                    <strong style={{ fontSize: 16 }}>
                      {`0${item.data.BuyerCount}`.slice(-2)}
                    </strong>
                  </p>
                  <div className="social-components">
                    <iframe
                      src={socialUrl}
                      width="172"
                      height="20"
                      scrolling="no"
                      frameBorder="0"
                      allowTransparency="true"
                      allow="encrypted-media"
                    />
                  </div>
                </div>
              )}
              {
                <div className="social-box">
                  <p className="branch-name">
                    <span className="label">Mã sản phầm: </span>
                    <span>{item.data.Code.slice(0, 8)}</span>
                  </p>
                  {item.data.BuyerCount <= 0 && (
                    <div className="social-components">
                      <iframe
                        src={socialUrl}
                        width="172"
                        height="20"
                        scrolling="no"
                        frameBorder="0"
                        allowTransparency="true"
                        allow="encrypted-media"
                      />
                    </div>
                  )}
                </div>
              }
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
                <span className="span-price">
                  {toMoney(item.data.PromotionPrice || item.data.Price)} ₫
                </span>
              </p>
              {item.data.PromotionId && (
                <Fragment>
                  <p className="saleoff-price-item">
                    <span className="price-label">Tiết kiệm:</span>
                    <span className="discount-percent">
                      {' '}
                      {percentDeal}%{' '}
                    </span>({' '}
                    <span className="span-saving-price">
                      {toMoney(item.data.Price - item.data.PromotionPrice)} đ
                    </span>{' '}
                    )
                  </p>
                  <p className="old-price-item">
                    <span className="price-label">Giá thị trường:</span>
                    <span className="span-list-price">
                      {toMoney(item.data.Price)} đ
                    </span>
                  </p>

                  <div className="deal-process">
                    <div className="deal-process-wrapper">
                      <div className="deal-time">
                        <span className="icon-timer" />
                        khuyến mãi kết thúc sau:
                        <span>
                          {day} ngày {hour}:{min}:{second}
                        </span>
                      </div>
                      <div className="deal-info">
                        {currentDuration < 0
                          ? 'Đã kết thúc'
                          : item.data.PromotionBuyerCount
                          ? `Đã bán ${item.data.PromotionBuyerCount}`
                          : 'Vừa mở bán'}
                        <Progress
                          percent={_.round(
                            (item.data.PromotionBuyerCount /
                              item.data.PromotionQuantity) *
                              100,
                          )}
                          status="exception"
                        />
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
              <Col lg={24} md={16} xs={24}>
                <div className="order-actions">
                  <Button
                    className="order-now"
                    type="danger"
                    size="large"
                    onClick={() => {
                      doAddToCart(1);
                      history.push(getRouteUrl('CheckoutPage'));
                    }}
                  >
                    Mua ngay
                  </Button>
                  <Button
                    className="add-to-card"
                    size="large"
                    disabled={quantityItem === 0}
                    icon={<ShoppingCartOutlined />}
                    onClick={doAddToCart}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xl={6} xs={24} md={24}>
          <Row gutter={[0, 10]} style={{ paddingTop: isMobile ? 0 : 11 }}>
            <Col xl={24} xs={0} md={0}>
              <Card
                title="Liên hệ"
                bodyStyle={{ padding: '8px 11px 15px 11px', fontSize: 14 }}
              >
                <div>
                  <PhoneOutlined style={{ fontSize: 18, marginRight: 8 }} />{' '}
                  <span>Hotline: 123456789</span>
                </div>
                <div>
                  <MailOutlined style={{ fontSize: 18, marginRight: 8 }} />{' '}
                  <span>Email: cskh@xedaykids.com.vn</span>
                </div>
              </Card>
            </Col>
            <Col xl={24} xs={0} md={0}>
              <Card bodyStyle={{ padding: '12px 11px', fontSize: 14 }}>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  <li>
                    <StarOutlined
                      style={{ fontSize: 18, marginRight: 8, color: '#ff464b' }}
                    />{' '}
                    Cam kết sản phẩm chính hãng
                  </li>
                  <li>
                    <SyncOutlined
                      style={{ fontSize: 18, marginRight: 8, color: '#ff464b' }}
                    />{' '}
                    365 ngày đổi trả
                  </li>
                </ul>
              </Card>
            </Col>
            <Col span={24}>
              <div
                style={!isMobile ? { position: 'absolute', width: '100%' } : {}}
              >
                {item.data.PromotionId ? (
                  !isMobile && (
                    <FlashSale
                      endDate={item.data.PromotionEndDate}
                      offsetTop={115}
                      price={`${toMoney(item.data.PromotionPrice)} đ`}
                    />
                  )
                ) : (
                  <div
                    style={{
                      visibility: showRelateItems ? 'visible' : 'hidden',
                    }}
                  >
                    <RelateItems
                      cateId={item.data.CategoryId}
                      offsetTop={115}
                      hasOffset={!isMobile}
                      currentItem={Number(productId) || 0}
                      show={() => setShowRelateItems(true)}
                    />
                  </div>
                )}
              </div>
            </Col>
          </Row>
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
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={item.data.ShortName} />
        <meta property="og:description" content={item.data.ShortDescription} />
        <meta property="og:image" content={previewUrl} />
      </Helmet>

      <Main mobile={isMobile ? 1 : 0}>{renderBody()}</Main>
    </Fragment>
  );
}

DetailPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  changeBreadcrumbs: PropTypes.func.isRequired,
  screenSize: PropTypes.number,
  addItemToCart: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  screenSize: makeSelectScreenSize(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeBreadcrumbs: obj => dispatch(setBreadcrumbs(obj)),
    addItemToCart: item => dispatch(addToCart(item)),
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
