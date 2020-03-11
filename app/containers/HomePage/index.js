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
  makeSelectLocationModalState,
} from '../App/selectors';
import { VerticleMenuItem } from '../../components/Categories';
import { getSlug, getValueFromSiteConfigs } from '../../utils/string';
import { getRouteUrl } from '../../route';
import {
  makeRequestGetHomeData,
  makeRequestGetProductByCategory,
} from './actions';

const defaultCateData = {
  categoryId: 0,
  categoryName: 'default',
  loading: true,
  items: [],
};

const defaultPageState = {
  siteConfigs: [],
  categories: [],
};

let loading = null;
function HomePage({ homeState, categories }) {
  useInjectReducer({ key: 'homePage', reducer });

  const [siteState, setSiteState] = useState(defaultPageState);
  const [promotion, setPromotion] = useState(defaultCateData);

  const getHomeData = async () => {
    loading = message.loading('Đang lấy dữ liệu trang web', 0);
    try {
      const res = await makeRequestGetHomeData();
      if (res.HasError) {
        message.error('có lỗi xảy ra, vui lòng thử lại sau.', 5);
        return;
      }

      const { Data: data } = res;
      setSiteState(
        produce(siteState, draftState => {
          draftState.siteConfigs = data.siteConfigs;
          draftState.categories = data.categories;
        }),
      );
    } catch (ex) {
      message.error('có lỗi xảy ra, vui lòng thử lại sau.', 5);
    } finally {
      loading();
    }
  };

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
    getHomeData();

    setTimeout(() => {
      setPromotion({
        loading: false,
        items: getPromotions(),
        id: 11,
        categoryName: 'Khuyến mại',
      });
    }, 1500);
  }, []);

  useEffect(() => {
    const { categories: homeCategories } = siteState;
    if (_.isEmpty(homeCategories)) return;
    getProductByCategory(homeCategories);
  }, [siteState]);

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
              <CustomCarosel draggable>
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
          <Col span={24}>
            <Items
              href={getRouteUrl('PromotionPage')}
              title={
                <Skeleton
                  active
                  loading={promotion.loading}
                  title={{
                    width: 100,
                  }}
                  paragraph={{
                    rows: 0,
                  }}
                  avatar
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

          {siteState.categories.map(category => (
            <Col span={24} key={_.uniqueId()}>
              <Items
                href={getRouteUrl('ListPage', {
                  slug: getSlug(category.Name),
                  id: category.CategoryId,
                })}
                title={
                  <Skeleton
                    active
                    loading={category.Loading}
                    title={{
                      width: 100,
                    }}
                    paragraph={{
                      rows: 0,
                    }}
                    avatar
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
  homeState: propTypes.object,
  categories: propTypes.shape({
    isLoading: propTypes.bool,
    data: propTypes.array,
    hasError: propTypes.bool,
  }),
};

const mapStateToProp = createStructuredSelector({
  homeState: makeSelectHomeState(),
  categories: makeSelectCategories(),
});
const mapDispatchToProp = (/* dispatch */) => ({});

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(HomePage);

export const getData = () => [
  {
    ProductId: '21',
    ShortName: '\nXe đẩy đôi Combi Spazio Duo ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201706031421xe-day-doi-combi-spazio-duo-115993_1.jpg',
        alt: 'Xe đẩy đôi Combi Spazio Duo',
      },
    ],
    Price: '12.500.000 ₫',
    rating: 5.2,
    ratingCount: 10,
  },
  {
    ProductId: '22',
    ShortName: '\nXe đẩy Joie Litetrax 4 Flex W/RC SIG. Noir ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/x/e/xe-day-tre-em-joie-litetrax-4-flex-w-rc-sig-noir.jpg',
        alt: 'Xe đẩy Joie Litetrax 4 Flex W/RC SIG. Noir',
      },
    ],
    Price: '6.800.000 ₫',
    Rating: 0,
    rating: 5.2,
    ratingCount: 10,
  },
  {
    ProductId: '23',
    ShortName: '\nXe đẩy Joie Pact Flex W/RC&ADPT&TB SIG. Noir ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/x/e/xe-day-tre-em-joie-pact-flex-w-rc_adpt_tb-sig-noir.jpg',
        alt: 'Xe đẩy Joie Pact Flex W/RC&ADPT&TB SIG. Noir',
      },
    ],
    Price: '5.800.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '24',
    ShortName: '\nXe đẩy Joie Litetrax 4 W/RC Chromium ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/x/e/xe-day-tre-em-joie-litetrax-4-w-rc-chromium-3.jpg',
        alt: 'Xe đẩy Joie Litetrax 4 W/RC Chromium',
      },
    ],
    Price: '5.300.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '25',
    ShortName: '\nXe đẩy Joie Pact W/RC & ADPT & TB Navy Blazer ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/x/e/xe-day-tre-em-joie-pact-w-rc-_-adpt-_-tb-navy-blazer.jpg',
        alt: 'Xe đẩy Joie Pact W/RC & ADPT & TB Navy Blazer',
      },
    ],
    Price: '4.200.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '26',
    ShortName: "\nXe đẩy Bibo's A1-262 ",
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201709181505xe-day-116025-1_1.jpg',
        alt: "Xe đẩy Bibo's A1-262",
      },
    ],
    Price: '899.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '27',
    ShortName: "\nXe đẩy Bibo's A1-112 ",
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201709181500xe-day-116024_1.jpg',
        alt: "Xe đẩy Bibo's A1-112",
      },
    ],
    Price: '899.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '28',
    ShortName: '\nXe đẩy VoVo gấp gọn màu xanh pastel ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201812181604xe-day-gap-gon-vovo-xanh-pastel-119531-4_1.jpg',
        alt: 'Xe đẩy VoVo gấp gọn màu xanh pastel',
      },
    ],
    Price: '1.999.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '29',
    ShortName: '\nXe đẩy VoVo gấp gọn màu xanh dương ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201812181600xe-day-gap-gon-vovo-xanh-bien-119529-5_1.jpg',
        alt: 'Xe đẩy VoVo gấp gọn màu xanh dương',
      },
    ],
    Price: '1.999.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '30',
    ShortName: '\nXe đẩy 2 chiều Gluck C8 màu xanh da trời ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201802051428xe-day-gluck-c8-mau-xanh-duong-800820-1_1.jpg',
        alt: 'Xe đẩy 2 chiều Gluck C8 màu xanh da trời',
      },
    ],
    Price: '1.790.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '31',
    ShortName: '\nXe đẩy 2 chiều Gluck C8 màu đỏ ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201801301622xe-day-gluck-c8-mau-do-1_1.jpg',
        alt: 'Xe đẩy 2 chiều Gluck C8 màu đỏ',
      },
    ],
    Price: '1.790.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '32',
    ShortName: '\nXe đẩy 2 chiều Seebaby T11 Plus màu xanh ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/x/e/xe-day-seebaby-t11-3.jpg',
        alt: 'Xe đẩy 2 chiều Seebaby T11 Plus màu xanh',
      },
    ],
    Price: '1.499.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '33',
    ShortName: '\nXe đẩy Seebaby Q6 màu xanh dương/xanh lá ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/x/e/xe-day-seebaby-q6-xanh-duong-xanh-la-120318-1.jpg',
        alt: 'Xe đẩy Seebaby Q6 màu xanh dương/xanh lá',
      },
    ],
    Price: '895.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '34',
    ShortName: '\nXe đẩy 2 chiều Seebaby T11 Plus màu đỏ ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201709271641xe-day-seebaby-t11-mau-do-106424_1.jpg',
        alt: 'Xe đẩy 2 chiều Seebaby T11 Plus màu đỏ',
      },
    ],
    Price: '1.499.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '35',
    ShortName: '\nXe đẩy Seebaby Q6 màu đỏ ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/x/e/xe-day-seebaby-q6-do-120319-1.jpg',
        alt: 'Xe đẩy Seebaby Q6 màu đỏ ',
      },
    ],
    Price: '895.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '36',
    ShortName: '\nXe đẩy Combi Umbretta 4 bánh quay tự động nâu kaki ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/x/e/xe-day-combi-umbretta-4-banh-quay-tu-dong-nau-kaki.jpg',
        alt: 'Xe đẩy Combi Umbretta 4 bánh quay tự động nâu kaki',
      },
    ],
    Price: '20.090.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '37',
    ShortName: '\nXe đẩy Combi Handy S màu tím ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/x/e/xe-day-handy-s-mau-tim_1.jpg',
        alt: 'Xe đẩy Combi Handy S màu tím',
      },
    ],
    Price: '8.590.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '38',
    ShortName: '\nXe đẩy Joie Litetrax 4 Flex W/RC SIG. Granit Bleu ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/x/e/xe-day-tre-em-joie-litetrax-4-flex-w-rc-sig-granit-bleu.jpg',
        alt: 'Xe đẩy Joie Litetrax 4 Flex W/RC SIG. Granit Bleu',
      },
    ],
    Price: '6.800.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '39',
    ShortName: '\nXe đẩy Joie Litetrax 4 W/RC Sandstone ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/x/e/xe-day-tre-em-joie-litetrax-4-w-rc-sandstone.jpg',
        alt: 'Xe đẩy Joie Litetrax 4 W/RC Sandstone',
      },
    ],
    Price: '5.300.000 ₫',
    Rating: 0,
  },
  {
    ProductId: '40',
    ShortName: '\nXe đẩy du lịch Mastela siêu nhẹ A2 xám đậm ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/x/e/xe-day-du-lich-sieu-nhe-a2-cua-mastela-mstl419-xam-dam.jpg',
        alt: 'Xe đẩy du lịch Mastela siêu nhẹ A2 xám đậm',
      },
    ],
    Price: '1.250.000 ₫',
    Rating: 0,
  },
];

const getPromotions = () => [
  {
    ProductId: '21',
    ShortName: '\nXe đẩy đôi Combi Spazio Duo ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201706031421xe-day-doi-combi-spazio-duo-115993_1.jpg',
        alt: 'Xe đẩy đôi Combi Spazio Duo',
      },
    ],
    Price: '12.500.000 ₫',
    rating: 5.2,
    ratingCount: 10,
    DisountId: 10,
  },
  {
    ProductId: '22',
    ShortName: '\nXe đẩy Joie Litetrax 4 Flex W/RC SIG. Noir ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/x/e/xe-day-tre-em-joie-litetrax-4-flex-w-rc-sig-noir.jpg',
        alt: 'Xe đẩy Joie Litetrax 4 Flex W/RC SIG. Noir',
      },
    ],
    Price: '6.800.000 ₫',
    Rating: 0,
    DisountId: 10,
    rating: 5.2,
    ratingCount: 10,
  },
  {
    ProductId: '23',
    ShortName: '\nXe đẩy Joie Pact Flex W/RC&ADPT&TB SIG. Noir ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/x/e/xe-day-tre-em-joie-pact-flex-w-rc_adpt_tb-sig-noir.jpg',
        alt: 'Xe đẩy Joie Pact Flex W/RC&ADPT&TB SIG. Noir',
      },
    ],
    Price: '5.800.000 ₫',
    Rating: 0,
    DisountId: 10,
  },
  {
    ProductId: '24',
    ShortName: '\nXe đẩy Joie Litetrax 4 W/RC Chromium ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/x/e/xe-day-tre-em-joie-litetrax-4-w-rc-chromium-3.jpg',
        alt: 'Xe đẩy Joie Litetrax 4 W/RC Chromium',
      },
    ],
    Price: '5.300.000 ₫',
    Rating: 0,
    DisountId: 10,
  },
  {
    ProductId: '25',
    ShortName: '\nXe đẩy Joie Pact W/RC & ADPT & TB Navy Blazer ',
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/x/e/xe-day-tre-em-joie-pact-w-rc-_-adpt-_-tb-navy-blazer.jpg',
        alt: 'Xe đẩy Joie Pact W/RC & ADPT & TB Navy Blazer',
      },
    ],
    Price: '4.200.000 ₫',
    Rating: 0,
    DisountId: 10,
  },
  {
    ProductId: '26',
    ShortName: "\nXe đẩy Bibo's A1-262 ",
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201709181505xe-day-116025-1_1.jpg',
        alt: "Xe đẩy Bibo's A1-262",
      },
    ],
    Price: '899.000 ₫',
    Rating: 0,
    DisountId: 10,
  },
  {
    ProductId: '27',
    ShortName: "\nXe đẩy Bibo's A1-112 ",
    ImageList: [
      {
        url:
          'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201709181500xe-day-116024_1.jpg',
        alt: "Xe đẩy Bibo's A1-112",
      },
    ],
    Price: '899.000 ₫',
    Rating: 0,
    DisountId: 10,
  },
];
