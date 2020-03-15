/* eslint-disable prefer-destructuring */
/* eslint-disable indent */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, useState } from 'react';
import { Row, Col, Skeleton, message } from 'antd';

import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import propTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import _ from 'lodash';
import produce from 'immer';
import Items from '../../components/Items';
import {
  MainContent,
  CustomCarosel,
  CustomMenu,
  CustomCaroselWrapper,
  FourboxBlock,
} from './selections';
import reducer from './reducer';
import { makeSelectHomeState } from './selector';
import {
  makeSelectCategories,
  makeSelectScreenSize,
  makeSelectSite,
} from '../App/selectors';
import { VerticleMenuItem } from '../../components/Categories';
import { getSlug, getValueFromSiteConfigs } from '../../utils/string';
import { getRouteUrl } from '../../route';
import { makeRequestGetProductByCategory } from './actions';

import {
  setBreadcrumbs as setBreadcrumbsAction,
  setSiteConfigs,
} from '../App/actions';
import { getScreenSize } from '../../utils/responsive';

const defaultCateData = {
  categoryId: 0,
  categoryName: 'default',
  loading: true,
  items: [],
};

let loading = null;
function HomePage({
  homeState,
  categories,
  setBreadcrumbs,
  screenSize,
  siteState,
  setSiteState,
}) {
  useInjectReducer({ key: 'homePage', reducer });
  const [promotion, setPromotion] = useState(defaultCateData);

  const getProductByCategory = async homeCategories => {
    try {
      const res = await makeRequestGetProductByCategory(
        homeCategories.map(cate => cate.CategoryId),
      );
      if (res.HasError) {
        message.error('có lỗi xảy ra, vui lòng thử lại sau.', 5);
        return;
      }
      const { Data: data } = res;

      homeCategories.forEach((cate, index) => {
        homeCategories[index].Products = data[cate.CategoryId];
        homeCategories[index].Loading = false;
      });
      setPromotion(
        produce(promotion, state => {
          state.items = data[0];
          state.loading = false;
          state.categoryName = 'Khuyến mại';
        }),
      );

      setSiteState(
        produce(siteState, state => {
          state.categories = homeCategories;
        }),
      );
    } catch (err) {
      message.error('có lỗi xảy ra, vui lòng thử lại sau.', 5);
    }
  };

  useEffect(() => {
    setBreadcrumbs({
      items: [],
      displayable: false,
    });
  }, []);

  useEffect(() => {
    const {
      categories: homeCategories,
      loading: pageLoading,
      hasError,
    } = siteState;
    if (pageLoading) {
      if (!loading) loading = message.loading('Đang lấy dữ liệu trang web', 0);
      return;
    }
    if (loading) {
      loading();
      loading = null;
    }

    if (hasError) {
      message.error('có lỗi xảy ra, vui lòng thử lại sau.', 5);
      return;
    }

    if (!_.isEmpty(homeCategories) && _.isEmpty(homeCategories.Products))
      getProductByCategory(homeCategories);
  }, [siteState]);

  const isMobile = getScreenSize('xl') >= screenSize;

  return (
    <React.Fragment>
      <Helmet>
        <title>
          {getValueFromSiteConfigs({
            siteConfigs: siteState.siteConfigs,
            configKey: 'title',
            defaultValue: 'Trang chủ',
          })}
        </title>
        <meta
          name="description"
          content={getValueFromSiteConfigs({
            siteConfigs: siteState.siteConfigs,
            configKey: 'description',
            defaultValue: 'mô tả',
          })}
        />

        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={getValueFromSiteConfigs({
            siteConfigs: siteState.siteConfigs,
            configKey: 'title',
            defaultValue: 'Trang chủ',
          })}
        />
        <meta
          property="og:description"
          content={getValueFromSiteConfigs({
            siteConfigs: siteState.siteConfigs,
            configKey: 'description',
            defaultValue: 'mô tả',
          })}
        />
      </Helmet>

      <MainContent>
        <Row>
          <Col xl={categories.hasError ? 0 : 5} xs={0}>
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
          <Col xl={categories.hasError ? 24 : 19} xs={24}>
            <CustomCaroselWrapper>
              <CustomCarosel draggable mobile={isMobile ? 1 : 0}>
                {homeState.sliders.map((item, index) => (
                  <Link to="#" key={_.uniqueId(index)}>
                    <img src={item} alt={_.toString(item)} />
                  </Link>
                ))}
              </CustomCarosel>
              <div className="home-banner-block">
                <div className="home-banner">
                  <div className="banner-item">
                    <Link to="/">
                      <img
                        src="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/homebanner1_6.jpg"
                        alt="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/homebanner1_6.jpg"
                      />
                    </Link>
                  </div>

                  <div className="banner-item">
                    <Link to="/">
                      <img
                        src="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/homebanner2_7.jpg"
                        alt="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/homebanner1_6.jpg"
                      />
                    </Link>
                  </div>

                  <div className="banner-item">
                    <Link to="/">
                      <img
                        src="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/homebanner3_4.jpg"
                        alt="https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/homebanner1_6.jpg"
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

        <Row gutter={[0, 10]}>
          {(promotion.loading || !_.isEmpty(promotion.items)) && (
            <Col span={24}>
              <Items
                href={getRouteUrl('PromotionPage')}
                showPromotion
                isMobile={isMobile}
                title={
                  <Skeleton
                    active
                    loading={promotion.loading}
                    title={false}
                    paragraph={{
                      rows: 1,
                    }}
                    avatar={{
                      shape: 'square',
                    }}
                  >
                    <img
                      src="https://img.icons8.com/ios/30/000000/tag-window.png"
                      alt="icon"
                    />
                    {promotion.categoryName}
                  </Skeleton>
                }
                loading={promotion.loading}
                data={promotion.items}
              />
            </Col>
          )}

          {siteState.categories.map(category => (
            <Col span={24} key={_.uniqueId()}>
              <Items
                href={getRouteUrl('ListPage', {
                  slug: getSlug(category.Name),
                  id: category.CategoryId,
                })}
                isMobile={isMobile}
                title={
                  <Skeleton
                    active
                    loading={category.Loading}
                    title={false}
                    paragraph={{
                      rows: 1,
                    }}
                    avatar={{
                      shape: 'square',
                    }}
                  >
                    <img
                      src={
                        category.Image ||
                        'https://image.flaticon.com/icons/svg/420/420792.svg'
                      }
                      alt="icon"
                    />
                    {category.Name}
                  </Skeleton>
                }
                loading={category.Loading}
                data={category.Products || []}
              />
            </Col>
          ))}
        </Row>
      </MainContent>
    </React.Fragment>
  );
}

HomePage.propTypes = {
  setBreadcrumbs: propTypes.func,
  homeState: propTypes.object,
  categories: propTypes.shape({
    isLoading: propTypes.bool,
    data: propTypes.array,
    hasError: propTypes.bool,
  }),
  screenSize: propTypes.number,
  siteState: propTypes.object,
};

const mapStateToProp = createStructuredSelector({
  homeState: makeSelectHomeState(),
  categories: makeSelectCategories(),
  screenSize: makeSelectScreenSize(),
  siteState: makeSelectSite(),
});
const mapDispatchToProp = dispatch => ({
  setBreadcrumbs: state => dispatch(setBreadcrumbsAction(state)),
  setSiteState: siteState => dispatch(setSiteConfigs(siteState)),
});

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(HomePage);
