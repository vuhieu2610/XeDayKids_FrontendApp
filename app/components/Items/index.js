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
        extra={<Link to="/">Xem thêm</Link>}
      >
        <CustomCarousel
          slidesToShow={5.5}
          speed={300}
          draggable
          dots={false}
          swipeToSlide
          infinite={false}
          lazyLoad="ondemand"
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4.5,
                slidesToScroll: 4,
              },
            },
            {
              breakpoint: 920,
              settings: {
                slidesToShow: 3.5,
                slidesToScroll: 3,
              },
            },
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
  title: propTypes.string.isRequired,
  data: propTypes.array,
};
