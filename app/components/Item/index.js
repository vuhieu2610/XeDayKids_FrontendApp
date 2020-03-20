/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import {
  CustomItem,
  CustomRate,
  CustomBar,
  CountDownWrapper,
} from './selections';
import { getSlug, toMoney } from '../../utils/string';
import { baseURL } from '../../utils/request';
import { getRouteUrl } from '../../route';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const defaultThumb = `https://img.icons8.com/ios/480/000000/product.png`;

const interval = 1000;
const timeFormat = `YYYY-MM-DD'T'HH:mm:ss`;
export default function Item({ data, showPromotion = false }) {
  // let then = moment(endDate, timeFormat).unix();
  const [day, setDay] = useState('00');
  const [hour, setHour] = useState('00');
  const [min, setMin] = useState('00');
  const [second, setSecond] = useState('00');
  const [percentDeal, setPercentDeal] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);

  useEffect(() => {
    if (!data || !data.PromotionId) return;

    setPercentDeal(
      100 - _.round((data.PromotionPrice / data.PromotionCurrentPrice) * 100),
    );

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
  }, [data]);

  let images = [];
  try {
    images = JSON.parse(data.Images);
  } catch (err) {
    images = [];
  }
  return (
    <CustomItem
      cover={
        <Link
          to={getRouteUrl('DetailPage', {
            slug: getSlug(data.Name),
            productId: data.ProductId,
          })}
        >
          <img
            alt={images[0] ? _.toString(images[0].alt) : ''}
            src={images[0] ? `${baseURL}${images[0].url}` : defaultThumb}
          />
        </Link>
      }
    >
      <div className="item-details">
        {showPromotion && data.PromotionId && (
          <span className="percent deal">-{percentDeal}%</span>
        )}
        <span className="item-name">
          <Link
            to={getRouteUrl('DetailPage', {
              slug: getSlug(data.Name),
              productId: data.ProductId,
            })}
          >
            {data.ShortName}
          </Link>
        </span>
        <div className="price-box">
          <span>
            {showPromotion && data.PromotionPrice
              ? toMoney(data.PromotionPrice)
              : toMoney(data.Price)}
          </span>
          {showPromotion && data.PromotionPrice && (
            <span className="original deal">{toMoney(data.Price)}</span>
          )}
        </div>
        <div className="item-reviews">
          {data.Rating && (
            <CustomRate
              allowHalf
              disabled
              tooltips={desc}
              value={data.Rating}
            />
          )}
          {data.Rating ? (
            <span className="ant-rate-text">({data.RatingCount})</span>
          ) : (
            <span className="ant-rate-text">Chưa có đánh giá</span>
          )}
        </div>
        {showPromotion && data.PromotionId && (
          <div className="progress">
            <CustomBar
              percent={_.round(
                (data.PromotionBuyerCount / data.PromotionQuantity) * 100,
              )}
              format={() =>
                currentDuration < 0
                  ? 'Đã kết thúc'
                  : data.PromotionBuyerCount
                  ? `Đã bán ${data.PromotionBuyerCount}`
                  : 'Vừa mở bán'
              }
            />
            <CountDownWrapper>
              {day} ngày {hour}:{min}:{second}
            </CountDownWrapper>
          </div>
        )}
      </div>
    </CustomItem>
  );
}

Item.propTypes = {
  data: propTypes.object,
  showPromotion: propTypes.bool,
};
