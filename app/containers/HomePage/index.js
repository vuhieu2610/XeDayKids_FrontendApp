/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, Fragment } from 'react';
import { Row, Col, Skeleton } from 'antd';

import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import propTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { setBreadcrumbs } from '../App/actions';
import Items from '../../components/Items';
import {
  MainContent,
  CustomCarosel,
  CustomMenu,
  CustomCaroselWrapper,
  FourboxBlock
} from './selections';
import reducer from './reducer';
import { makeSelectHomeState } from './selector';
import _ from 'lodash';
import { makeSelectCategories } from '../App/selectors';
import { VerticleMenuItem } from '../../components/Categories';

function HomePage({ changeBreadcrumbs, homeState, categories }) {
  useInjectReducer({ key: 'homePage', reducer });
  useEffect(() => {
    changeBreadcrumbs({
      displayable: false,
      items: []
    });
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Trang chủ</title>
        <meta name="description" content="déc" />
      </Helmet>
      <MainContent>
        <Row>
          <Col lg={5} xs={0}>
            <CustomMenu>
              <Skeleton
                loading={categories.isLoading}
                title={false}
                paragraph={{ rows: 12 }}
                active
              >
                <VerticleMenuItem dataList={categories.data} />
              </Skeleton>
            </CustomMenu>
          </Col>
          <Col lg={19} xs={24}>
            <CustomCaroselWrapper>
              <CustomCarosel autoplay draggable>
                {homeState.sliders.map((item, index) => (
                  <Link to="#" key={index}>
                    <img src={item} alt={item} />
                  </Link>
                ))}
              </CustomCarosel>
              <div className="home-banner-block">
                <div className="home-banner">
                  <div className="banner-item">
                    <Link to="/">
                      <img
                        src="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/homebanner1_6.jpg"
                        alt
                      />
                    </Link>
                  </div>

                  <div className="banner-item">
                    <Link to="/">
                      <img
                        src="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/homebanner2_7.jpg"
                        alt
                      />
                    </Link>
                  </div>

                  <div className="banner-item">
                    <Link to="/">
                      <img
                        src="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/homebanner3_4.jpg"
                        alt
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </CustomCaroselWrapper>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <FourboxBlock>
              <div className="fourbox">
                <div className="box">
                  <a
                    href="https://hoithaotiensan.bibomart.com.vn"
                    target="_blank"
                    rel="nofollow"
                  >
                    <span className="img">
                      <img
                        src="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/icon-cuahang2.jpg"
                        data-original="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/icon-cuahang2.jpg"
                        alt="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/icon-cuahang2.jpg"
                      />
                    </span>
                    <span>
                      <span className="title">Giao hàng siêu tốc</span>
                      <span>Nhận hàng trong thời gian từ 2 đến 4 ngày</span>
                    </span>
                  </a>
                </div>
                <div className="box">
                  <a
                    href="https://hoithaotiensan.bibomart.com.vn"
                    target="_blank"
                    rel="nofollow"
                  >
                    <span className="img">
                      <img
                        src="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/icon-cuahang2.jpg"
                        data-original="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/icon-cuahang2.jpg"
                        alt="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/icon-cuahang2.jpg"
                      />
                    </span>
                    <span>
                      <span className="title">Cam kết sản phẩm chính hãng</span>
                      <span>Sản phẩm nội địa bền và đẹp</span>
                    </span>
                  </a>
                </div>
                <div className="box">
                  <a
                    href="https://hoithaotiensan.bibomart.com.vn"
                    target="_blank"
                    rel="nofollow"
                  >
                    <span className="img">
                      <img
                        src="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/icon-cuahang2.jpg"
                        data-original="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/icon-cuahang2.jpg"
                        alt="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/icon-cuahang2.jpg"
                      />
                    </span>
                    <span>
                      <span className="title">Chính sách đổi trả</span>
                      <span>Hỗ trợ chính sách đổi trả hàng trong 30 ngày</span>
                    </span>
                  </a>
                </div>
                <div className="box">
                  <a
                    href="https://hoithaotiensan.bibomart.com.vn"
                    target="_blank"
                    rel="nofollow"
                  >
                    <span className="img">
                      <img
                        src="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/icon-cuahang2.jpg"
                        data-original="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/icon-cuahang2.jpg"
                        alt="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/icon-cuahang2.jpg"
                      />
                    </span>
                    <span>
                      <span className="title">Chăm sóc khách hàng</span>
                      <span>
                        Hệ thống trực tuyến hỗ trợ chăm sóc khách hàng 24/7
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </FourboxBlock>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Items
              title={
                <>
                  <img
                    src="https://bibomart.com.vn/media/wysiwyg/bibomart_theme/icon-bean5.png"
                    data-original="https://bibomart.com.vn/media/wysiwyg/bibomart_theme/icon-bean5.png"
                    alt="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/icon-cuahang2.jpg"
                  />
                  Bé uống sữa
                </>
              }
              data={[
                {
                  slug: '1',
                  rating: 3.5,
                  ratingCount: 10
                },
                {
                  slug: '2'
                },
                {
                  slug: '3'
                },
                {
                  slug: '4'
                },
                {
                  slug: '5'
                },
                {
                  slug: '6'
                },
                {
                  slug: '7'
                },
                {
                  slug: '8'
                },
                {
                  slug: '9'
                },
                {
                  slug: '10'
                }
              ]}
            />
          </Col>
        </Row>
      </MainContent>
    </React.Fragment>
  );
}

HomePage.propTypes = {
  changeBreadcrumbs: propTypes.func,
  homeState: propTypes.object,
  categories: propTypes.shape({
    isLoading: propTypes.bool,
    data: propTypes.array,
    hasError: propTypes.bool
  })
};

const mapStateToProp = createStructuredSelector({
  homeState: makeSelectHomeState(),
  categories: makeSelectCategories()
});
const mapDispatchToProp = dispatch => ({
  changeBreadcrumbs: obj => dispatch(setBreadcrumbs(obj))
});

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(HomePage);
