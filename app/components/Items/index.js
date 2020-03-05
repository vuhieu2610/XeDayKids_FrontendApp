/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { CustomCard, CustomCarousel } from './selections';
import Item from '../Item';

export default function Items({ title, data }) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMouseMove, setIsMouseMove] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setIsDragging(isMouseDown && isMouseMove);
  }, [isMouseDown, isMouseMove]);
  return (
    <div
      onMouseDown={() => setIsMouseDown(true)}
      onMouseMove={() => {
        if (isMouseDown) setIsMouseMove(true);
      }}
      onMouseUp={() => {
        setIsMouseDown(false);
        setIsMouseMove(false);
      }}
      onMouseLeave={() => {
        setIsMouseDown(false);
        setIsMouseMove(false);
      }}
      onMouseOut={() => {
        setIsMouseDown(false);
        setIsMouseMove(false);
      }}
      onBlur={() => {
        setIsMouseDown(false);
        setIsMouseMove(false);
      }}
    >
      <CustomCard
        bordered={false}
        title={<h4>{title}</h4>}
        extra={<Link to="/products">Xem thêm</Link>}
      >
        <CustomCarousel
          slidesToShow={4.5}
          speed={300}
          draggable
          dots={false}
          swipeToSlide
          infinite={false}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4.5
                // slidesToScroll: 4,
              }
            },
            {
              breakpoint: 768,
              settings: {
                rows: 2,
                slidesToShow: 3.5
                // slidesToScroll: 3,
              }
            },
            {
              breakpoint: 425,
              settings: {
                rows: 2,
                slidesToShow: 2.5
                // slidesToScroll: 3,
              }
            },
            {
              breakpoint: 375,
              settings: {
                rows: 2,
                slidesToShow: 2.2
                // slidesToScroll: 3,
              }
            },
            {
              breakpoint: 320,
              settings: {
                rows: 2,
                slidesToShow: 2
                // slidesToScroll: 3,
              }
            }
          ]}
        >
          {data.map((i, index) => (
            <Item isDragging={isDragging} key={_.uniqueId(index)} data={i} />
          ))}
        </CustomCarousel>
      </CustomCard>
    </div>
  );
}

Items.propTypes = {
  title: propTypes.oneOfType([propTypes.string, propTypes.node]),
  data: propTypes.array
};
