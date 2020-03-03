/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { CustomItem, CustomRate } from './selections';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
export default function Item({ data, isDragging }) {
  return (
    <CustomItem
      bordered={false}
      cover={
        <Link to={isDragging ? 'javascript:void(0)' : `/${data.slug}`}>
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        </Link>
      }
    >
      <div className="item-details">
        <span className="item-name">
          <Link to={isDragging ? 'javascript:void(0)' : `/${data.slug}`}>
            Demo item name
          </Link>
        </span>
        <div className="price-box">
          <span>150.000 ₫</span>
        </div>
        <div className="item-reviews">
          {data.rating && (
            <CustomRate
              allowHalf
              disabled
              tooltips={desc}
              value={data.rating}
            />
          )}
          {data.rating ? (
            <span className="ant-rate-text">({data.ratingCount})</span>
          ) : (
            <span className="ant-rate-text">Chưa có đánh giá</span>
          )}
        </div>
      </div>
    </CustomItem>
  );
}

Item.propTypes = {
  data: propTypes.object,
  isDragging: propTypes.bool,
};
