/* eslint-disable no-plusplus */
import speakingurl from 'speakingurl';
import _ from 'lodash';

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

export const isNullOrUndefined = value =>
  _.isUndefined(value) || _.isNull(value);

export const getValueFromSiteConfigs = ({
  siteConfigs,
  defaultValue,
  configKey,
}) => {
  if (_.isEmpty(siteConfigs)) return defaultValue;
  const findKey = siteConfigs.find(config => _.eq(config.ConfigKey, configKey));

  return isNullOrUndefined(findKey) ? defaultValue : findKey.ConfigValue;
};
