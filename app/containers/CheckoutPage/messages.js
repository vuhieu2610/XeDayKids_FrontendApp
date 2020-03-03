/*
 * CheckoutPage Messages
 *
 * This contains all the text for the CheckoutPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.CheckoutPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the CheckoutPage container!',
  },
  empty: {
    id: `${scope}.empty`,
    defaultMessage: 'Chưa có sản phẩm nào trong giỏ hàng.',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Giỏ mua hàng',
  },
  totals: {
    id: `${scope}.totals`,
    defaultMessage: 'Tổng giá trị sản phẩm',
  },
  price: {
    id: `${scope}.price`,
    defaultMessage: 'Thành tiền',
  },
  checkoutButton: {
    id: `${scope}.checkoutButton`,
    defaultMessage: 'Tiến hành đặt hàng',
  },
});
