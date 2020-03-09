/* eslint-disable no-plusplus */
import speakingurl from 'speakingurl';

export const getSlug = string =>
  speakingurl(string, {
    lang: 'vi',
  });
export const defaultArray = length => {
  const rs = [];
  for (let i = 0; i < length; i++) {
    rs.push(i);
  }
  return rs;
};

export const toMoney = num =>
  num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
