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
    defaultMessage: 'Bạn chưa có sản phẩm nào trong giỏ hàng.',
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
  locationAsking: {
    id: `${scope}.locationAsking`,
    defaultMessage: 'Bạn muốn giao hàng tới đâu?',
  },
  checkoutButton: {
    id: `${scope}.checkoutButton`,
    defaultMessage: 'Đặt mua',
  },
  item: {
    id: `${scope}.item`,
    defaultMessage: 'sản phẩm',
  },
  warningMessage: {
    id: `${scope}.warningMessage`,
    defaultMessage: 'Bạn vui lòng chọn địa chỉ giao hàng.',
  },
});
