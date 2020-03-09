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
// import moment from 'moment';
import _ from 'lodash';
import { FlashSaleWrapper } from './selections';

function FlashSale({ endDate = '', offsetTop, offsetBottom, price }) {
  // const timeFormat = 'DD-MM-YYYY HH:mm:ss';
  // const then = moment(endDate, timeFormat).unix();
  // const now = moment().unix();
  // const diffTime = then - now;
  // let duration = moment.duration(diffTime * 1000, 'milliseconds');
  // const interval = 1000;

  const [day, setDay] = useState('00');
  const [hour, setHour] = useState('00');
  const [min, setMin] = useState('00');
  const [second, setSecond] = useState('00');

  // useEffect(() => {
  //   let loop = setInterval(() => {
  //     duration = moment.duration(
  //       duration.asMilliseconds() - interval,
  //       'milliseconds'
  //     );
  //     let d = moment.duration(duration).days(),
  //       h = moment.duration(duration).hours(),
  //       m = moment.duration(duration).minutes(),
  //       s = moment.duration(duration).seconds();
  //     d = _.trim(d).length === 1 ? '0' + d : d;
  //     h = _.trim(h).length === 1 ? '0' + h : h;
  //     m = _.trim(m).length === 1 ? '0' + m : m;
  //     s = _.trim(s).length === 1 ? '0' + s : s;

  //     setDay(d);
  //     setHour(h);
  //     setMin(m);
  //     setSecond(s);
  //   }, interval);
  //   return () => {
  //     clearInterval(loop);
  //   };
  // }, []);

  return (
    <Affix {...{ offsetTop, offsetBottom }}>
      <FlashSaleWrapper>
        <div className="icon-timer">
          <img src={clock} alt="clock" />
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
  );
}

FlashSale.propTypes = {
  endDate: PropTypes.string.isRequired,
  offsetTop: PropTypes.number,
  offsetBottom: PropTypes.number,
  price: PropTypes.string,
};

export default FlashSale;
