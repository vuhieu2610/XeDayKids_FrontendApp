import React, { memo, Fragment } from 'react';
import { Row, Col, Rate, Button, Card } from 'antd';
import { ShoppingCartOutlined, PhoneOutlined } from '@ant-design/icons';

import {
  ProductImage,
  ProductCart,
  ItemProductOptions,
  QuantityControl,
  ActionBox,
  SellerContainer,
} from './selections';

const DetailPage = () => {
  return (
    <Fragment>
      <Row>
        <Col span={10}>
          <ProductImage>
            <div className="image-box">
              <div className="image-thumbnail-block">
                <div className="product-reivew-images">
                  <img
                    src="https://salt.tikicdn.com/cache/550x550/ts/product/25/8c/f0/b989c79775828841525b19c4a8d22efd.jpg"
                    alt="1123"
                  />
                </div>
                <div className="product-feature-images vertical">
                  <span className="thumb-item">
                    <span className="flx">
                      <img
                        src="https://salt.tikicdn.com/cache/75x75/ts/product/d3/3f/be/51975c4cad7e88603e81b0b9baf00c38.jpg"
                        alt="product"
                      />
                    </span>
                  </span>

                  <span className="thumb-item">
                    <span className="flx">
                      <img
                        src="https://salt.tikicdn.com/cache/75x75/ts/product/d3/3f/be/51975c4cad7e88603e81b0b9baf00c38.jpg"
                        alt="product"
                      />
                    </span>
                  </span>

                  <span className="thumb-item">
                    <span className="flx">
                      <img
                        src="https://salt.tikicdn.com/cache/75x75/ts/product/d3/3f/be/51975c4cad7e88603e81b0b9baf00c38.jpg"
                        alt="product"
                      />
                    </span>
                  </span>

                  <span className="thumb-item active">
                    <span className="flx">
                      <img
                        src="https://salt.tikicdn.com/cache/75x75/ts/product/d3/3f/be/51975c4cad7e88603e81b0b9baf00c38.jpg"
                        alt="product"
                      />
                    </span>
                  </span>

                  <span className="thumb-item text">
                    <span className="flx">
                      <img
                        src="https://salt.tikicdn.com/cache/75x75/ts/product/d3/3f/be/51975c4cad7e88603e81b0b9baf00c38.jpg"
                        alt="product"
                      />
                      <span className="text">
                        Xem <br /> thêm <br /> 7 hình
                      </span>
                    </span>
                  </span>
                </div>
                <div className="product-feature-images horizontal" />
              </div>
            </div>
            <div className="native-banner" />
          </ProductImage>
        </Col>
        <Col span={14}>
          <ProductCart>
            <div className="item-box">
              <h1 className="item-name">
                Màn Hình Dell P2418D 24inch 2K 5ms 60Hz IPS - Hàng Chính Hãng
              </h1>
              <div className="product-branch-block">
                <div className="branch-block">
                  <div className="item-price">
                    <div className="branch-block-row">
                      <div className="item-other rating-block">
                        <Rate allowHalf disabled value={3.5} />{' '}
                        <span className="rating-desc">(29 đánh giá)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Row style={{ margin: '0 -26px' }}>
                <Col span={14}>
                  <div className="product-info-block">
                    <div className="item-row1">
                      <div className="item-price">
                        <div className="price-block">
                          <p className="special-price-item">
                            <span>1.210.000 d</span>
                          </p>

                          <p className="saleoff-price-item">
                            <span className="price-label">Tiết kiệm:</span>
                            <span className="discount-percent">39%</span>
                            <span id="span-saving-price">(780.000 đ)</span>
                          </p>

                          <p className="old-price-item">
                            <span className="price-label">Giá thị trường:</span>
                            <span id="span-list-price"> 5.414.000 đ</span>
                          </p>
                        </div>

                        <div className="top-feature-item bullet-wrap">
                          <p>Kích thước màn hình: 24 inch</p>

                          <p>Độ phân giải: 2K (2560 x 1440)</p>

                          <p>Tỷ lệ màn hình: 16:9</p>

                          <p>Tấm nền: IPS</p>

                          <p>Độ tương phản: 1000:1</p>

                          <p>Thời gian phản hồi: 5ms</p>

                          <p>Tần số quét: 60Hz</p>

                          <p>
                            Cổng kết nối: DisplayPort (ver. 1.2), HDMI (ver.
                            1.4), USB 3.0 port - Upstream, USB 3.0 ports - Side,
                            USB 3.0 ports - Bottom
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 
                      <p className="out-of-stock-msg" style={{ color: 'red' }}>
                        Sản phẩm đã hết hàng
                      </p> 
                    */}

                    <ItemProductOptions>
                      <div className="add-cart-action">
                        <div className="quantity-box">
                          <div className="quantity">
                            <p className="quantity-label">Số lượng: </p>
                            <QuantityControl
                              addonBefore={<Button>+</Button>}
                              addonAfter={<Button>-</Button>}
                            />
                          </div>

                          <ActionBox>
                            <Button
                              className="order-now"
                              type="danger"
                              size="large"
                            >
                              Mua ngay
                            </Button>
                            <Button
                              className="add-to-card"
                              size="large"
                              type="primary"
                              icon={<ShoppingCartOutlined />}
                            >
                              Thêm vào giỏ hàng
                            </Button>
                          </ActionBox>
                        </div>
                      </div>
                    </ItemProductOptions>
                  </div>
                </Col>
                <Col span={10}>
                  <SellerContainer>
                    <Card>
                      <div className="contact">
                        <div className="item">
                          <PhoneOutlined />
                          <p>
                            <b>Liên hệ</b>
                            <br />
                            Hotline đặt hàng
                            <a href="tel:1800 6963">1800 6963</a>
                            <br />
                            <small>(Miễn phí, 8-21h cả T7, CN)</small>
                          </p>
                        </div>
                        <div className="item" />
                      </div>
                    </Card>

                    <div className="social-wrapper">
                      <Button>like</Button>
                      <Button>share</Button>
                    </div>
                  </SellerContainer>
                </Col>
              </Row>
            </div>
          </ProductCart>
        </Col>
      </Row>
    </Fragment>
  );
};

export default memo(DetailPage);
