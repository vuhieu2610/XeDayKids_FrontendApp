import styled from 'styled-components';
import { Input } from 'antd';

export const ProductImage = styled.div`
  width: 100%;
  padding: 24px 24px 20px 20px;
  border-right: 2px solid #f7f7f7;

  & > .image-box {
    margin-bottom: 15px;
    text-align: left;
    font-size: 0;
    position: relative;
    & .product-feature-images {
      margin-bottom: 8px;

      &.vertical {
        width: 72px;
        margin-top: -417px;
        height: 424px;

        & .thumb-item {
          width: 72px;
          height: 72px;
          display: inline-block;
          padding: 5px;
          border: 1px solid #ececec;
          border-radius: 3px;
          vertical-align: top;
          cursor: pointer;
          & img {
            width: 100%;
          }
          & + .thumb-item {
            margin-left: 0 !important;
            margin-top: 8px !important;
          }
        }
      }

      & .thumb-item {
        &.active {
          border-color: #189eff;
        }
        &.text {
          color: #fff;
          font-size: 12px;
          text-align: center;
          cursor: pointer;
          border: 0;
          position: relative;
          overflow: hidden;
          & .flx {
            justify-content: center;
          }
        }
        & > .flx {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          overflow: hidden;
          & .text {
            position: absolute;
            background: rgba(0, 0, 0, 0.7);
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: inline-block;
            padding-top: 15px;
            font-weight: 300;
            font-family: Roboto, Helvetica, Arial, sans-serif !important;
            line-height: normal;
          }
        }
        & + .thumb-item {
          margin: 0 0 0 8px;
        }
      }
    }

    & .product-reivew-images {
      overflow: hidden;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
      position: relative;
      margin-left: 90px;

      & img {
        position: static;
        width: 100%;
        min-width: 391px;
      }
    }
  }
`;

export const ProductCart = styled.div`
  width: 100%;
  padding: 0 24px;

  & .item-box {
    & .item-name {
      font-size: 24px;
      font-weight: 300;
      color: #333;
      line-height: 30px;
      margin: 16px 0 5px;
    }

    & .product-branch-block {
      padding-left: 27px;
      & .branch-block {
        padding: 0 24px 6px;
        margin-right: -27px;
        margin-left: -54px;
        border-bottom: 1px solid #ececec;

        & .rating-block {
          & .ant-rate {
            font-size: 17px;
            & li {
              margin: 0.1rem;
            }
          }
          & .rating-desc {
            font-size: 13px;
            vertical-align: bottom;
            margin: 0 0 0 4px;
          }
        }
      }
    }

    & .product-info-block {
      padding-left: 27px;
      width: 100%;
    }

    & .item-row1 {
      & .item-price {
        width: 100%;

        & .price-block {
          margin-right: 26px;
          padding: 0 0 10px;
          border-bottom: 1px solid #ececec;
        }

        & .special-price-item {
          margin: 19px 0 2px;
          font-size: 13px;
          color: #9b9b9b;
          font-weight: 300;
          & > span {
            color: #ff3425;
            font-size: 19px;
            font-weight: 700;
          }
        }

        & .saleoff-price-item {
          font-size: 13px;
          margin: 4px 0;
          /* font-weight: 300; */
          color: #9b9b9b;
          & .discount-percent {
            font-weight: 400;
            color: #ff3425;
            font-size: 13px;
            margin: 0 0.2rem;
          }
        }

        & .old-price-item {
          line-height: 18px;
          font-size: 13px;
          color: #9b9b9b;
          margin: 0;
        }

        & .top-feature-item {
          margin-top: 10px;
          padding-top: 10px;
          margin-right: 26px;
          padding-bottom: 15px;
          border-bottom: 1px solid #ececec;
        }
      }
    }
  }

  & .bullet-wrap > li,
  & .bullet-wrap > p {
    padding: 0 0 0 20px !important;
    margin: 0 0 5px;
    font-size: 13px;
    position: relative;
    &::after {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #6d6d6d;
      left: 0;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
    }
  }

  & .discontinued-msg,
  & .out-of-stock-msg {
    padding: 10px 0;
    font-size: 13px;
    color: #ff3425;
    font-weight: 500;
  }
`;

export const ItemProductOptions = styled.div`
  @media (min-width: 1200px) {
    margin-top: 4px;
    position: relative;
  }
  & .add-cart-action {
    position: relative;

    & .quantity-box {
      padding: 10px 0;
      display: flex;
      align-items: flex-start;

      & .quantity {
        width: 84px;
        margin-right: 31px;
        & .quantity-label {
          line-height: 6px;
          font-size: 11px;
          margin-bottom: 6px;
          color: #7b7b7b;
        }
      }
    }
  }
`;

export const QuantityControl = styled(Input)`
  & .ant-input-group-addon {
    border: none;
    background-color: transparent;
    padding: 0;
    width: 26px;
    max-width: 26px;
    & button {
      width: 100%;
      max-width: 100%;
      padding: 0;
      text-align: center;
      &:hover {
        color: rgba(0, 0, 0, 0.65);
        background-color: #e2e2e2;
        border-color: #d9d9d9;
      }
    }

    &:first-child {
      & button {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: 0;
      }
    }

    &:last-child {
      & button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left: 0;
      }
    }
  }
`;

export const ActionBox = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  & button {
    width: 225px;
    height: 40px;
    margin: 4px 0;
  }
`;

export const SellerContainer = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
  padding: 12px 0;
`;
