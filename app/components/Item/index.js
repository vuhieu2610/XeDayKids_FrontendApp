/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import _ from 'lodash';
import {
  CustomItem,
  CustomRate,
  CustomBar,
  CountDownWrapper,
} from './selections';
import { getSlug, toMoney } from '../../utils/string';
import { baseURL } from '../../utils/request';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const defaultThumb = `https://img.icons8.com/ios/480/000000/product.png`;

export default function Item({ data }) {
  let images = [];
  try {
    images = JSON.parse(data.Images);
  } catch (err) {
    images = [];
  }
  return (
    <CustomItem
      cover={
        <Link to={`/${getSlug(data.Name)}.${data.ProductId}`}>
          <img
            alt={images[0] ? _.toString(images[0].alt) : ''}
            src={images[0] ? `${baseURL}${images[0].url}` : defaultThumb}
          />
        </Link>
      }
    >
      <div className="item-details">
        {data.DisountId && <span className="percent deal">-40%</span>}
        <span className="item-name">
          <Link to={`/${getSlug(data.ShortName)}.${data.ProductId}`}>
            {data.ShortName}
          </Link>
        </span>
        <div className="price-box">
          <span>{toMoney(data.Price)}  ₫</span>
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
        {data.DisountId && (
          <div className="progress">
            <CustomBar percent={80} format={e => 'Đã bán 80'} />
            <CountDownWrapper>0 ngày 06:18:56</CountDownWrapper>
          </div>
        )}
      </div>
    </CustomItem>
  );
}

Item.propTypes = {
  data: propTypes.object,
};
