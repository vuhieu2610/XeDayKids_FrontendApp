/**
 *
 * FlashSale
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import clock from '!file-loader?name=[name].[ext]!../../images/timer-fs.png';
import { Affix } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { FlashSaleWrapper } from './selections';

const timeFormat = `YYYY-MM-DD'T'HH:mm:ss`;
const interval = 1000;
function FlashSale({ endDate = '', offsetTop, offsetBottom, price }) {
  const then = moment(endDate, timeFormat).unix();
  const now = moment().unix();
  const diffTime = then - now;
  let duration = moment.duration(diffTime * 1000, 'milliseconds');

  const [day, setDay] = useState('00');
  const [hour, setHour] = useState('00');
  const [min, setMin] = useState('00');
  const [second, setSecond] = useState('00');
  const [currentDuration, setCurrentDuration] = useState(duration);

  useEffect(() => {
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
  }, []);

  return (
    currentDuration > 0 && (
      <Affix {...{ offsetTop, offsetBottom }}>
        <FlashSaleWrapper>
          <div className="icon-timer">
            <img
              src="https://bibomart.com.vn/static/version1584037719/frontend/Bibomart/bibomart/vi_VN/Magenest_FlashSales/images/timer-fs.png"
              alt="clock"
            />
            <span className="label-timer hidden-mb">Flash Sale</span>
          </div>
          <div className="block-countdown">
            <p className="title">Kết thúc trong</p>
            <div className="coundown-timer">
              <div className="time">
                <span className="value">{day}</span>
                <span className="text">Ngày</span>
              </div>
              <div className="time">
                <span className="value">{hour}</span>
                <span className="text">Giờ</span>
              </div>
              <div className="time">
                <span className="value">{min}</span>
                <span className="text">Phút</span>
              </div>
              <div className="time">
                <span className="value">{second}</span>
                <span className="text">Giây</span>
              </div>
            </div>
            <span className="price">{price}</span>
          </div>
        </FlashSaleWrapper>
      </Affix>
    )
  );
}

FlashSale.propTypes = {
  endDate: PropTypes.string.isRequired,
  offsetTop: PropTypes.number,
  offsetBottom: PropTypes.number,
  price: PropTypes.string,
};

export default FlashSale;
