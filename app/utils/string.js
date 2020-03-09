import speakingurl from 'speakingurl';

export const getSlug = function(string) {
  return speakingurl(string, {
    lang: 'vi',
  });
};

export const defaultArray = length => {
  const rs = [];
  for (let i = 0; i < length; i++) {
    rs.push(i);
  }
  return rs;
};
