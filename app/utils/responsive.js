export const getScreenSize = (breakPoint = '') => {
  switch (breakPoint) {
    case 'xs':
      return 576;
    case 'sm':
      return 576;
    case 'md':
      return 768;
    case 'lg':
      return 992;
    case 'xl':
      return 1200;
    case 'xxl':
      return 1600;
  }
};
