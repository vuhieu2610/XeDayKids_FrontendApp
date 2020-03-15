/* eslint-disable indent */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Skeleton, Row, Col } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { CustomCard, CustomCarousel, CustomSlideButton } from './selections';
import Item from '../Item';
import { defaultArray } from '../../utils/string';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <CustomSlideButton
      className={className}
      onClick={onClick}
      shape="circle"
      icon={<RightOutlined />}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <CustomSlideButton
      className={className}
      onClick={onClick}
      shape="circle"
      icon={<LeftOutlined />}
    />
  );
}

export default function Items({
  title,
  data,
  loading,
  href,
  showPromotion = false,
  isMobile,
}) {
  // const isMobile = true;

  return (
    <div>
      <CustomCard
        bordered={false}
        title={<h4>{title}</h4>}
        extra={<Link to={href}>Xem thêm</Link>}
      >
        {isMobile ? (
          <Row gutter={[5, 5]}>
            {!loading
              ? data.map((i, index) => (
                  <Col xs={12} sm={6} key={_.uniqueId()}>
                    <Item
                      showPromotion={showPromotion}
                      key={_.uniqueId(index)}
                      data={i}
                    />
                  </Col>
                ))
              : defaultArray(10).map(i => (
                  <Col xs={12} sm={6} key={_.uniqueId(i)}>
                    <div style={{ padding: 10 }}>
                      <Skeleton active loading />
                    </div>
                  </Col>
                ))}
          </Row>
        ) : (
          <CustomCarousel
            slidesToShow={4.5}
            speed={300}
            draggable
            dots={false}
            swipeToSlide
            infinite={false}
            arrows
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
            responsive={carouselResponsiveConfigs}
          >
            {!loading
              ? data.map((i, index) => (
                  <Item
                    showPromotion={showPromotion}
                    key={_.uniqueId(index)}
                    data={i}
                  />
                ))
              : defaultArray(10).map(i => (
                  <div key={_.uniqueId(i)}>
                    <div style={{ padding: 10 }}>
                      <Skeleton active loading />
                    </div>
                  </div>
                ))}
          </CustomCarousel>
        )}
      </CustomCard>
    </div>
  );
}

const carouselResponsiveConfigs = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 4.5,
      // slidesToScroll: 4,
    },
  },
  {
    breakpoint: 768,
    settings: {
      rows: 2,
      slidesToShow: 3.5,
      // slidesToScroll: 3,
    },
  },
  {
    breakpoint: 425,
    settings: {
      rows: 2,
      slidesToShow: 2.3,
      // slidesToScroll: 3,
    },
  },
  {
    breakpoint: 375,
    settings: {
      rows: 2,
      slidesToShow: 2.1,
      // slidesToScroll: 3,
    },
  },
  {
    breakpoint: 320,
    settings: {
      rows: 2,
      slidesToShow: 1.7,
      // slidesToScroll: 3,
    },
  },
];

Items.propTypes = {
  title: propTypes.oneOfType([propTypes.string, propTypes.node]),
  data: propTypes.array,
  loading: propTypes.bool,
  href: propTypes.string,
  showPromotion: propTypes.bool,
  isMobile: propTypes.bool,
};
