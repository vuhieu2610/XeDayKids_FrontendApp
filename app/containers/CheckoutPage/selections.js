import styled from 'styled-components';
import { Empty } from 'antd';

export const CustomEmpty = styled(Empty)`
  padding: 40px 0;
  text-align: center;
  & .ant-empty-image {
    width: 225px;
    height: auto;
    margin: 0 auto;
    margin-bottom: 15px;
    & > img {
      width: 100%;
      height: auto;
    }
  }
`;

export const CartContainer = styled.div`
  padding-top: 25px;
  padding-bottom: 10px;
  width: 100%;

  & .left-side {
    position: relative;

    & .page-title {
      font-size: 24px;
      line-height: 1.5;
      color: #333;
      margin-bottom: 17px;
      font-weight: 400;
      @media (max-width: 768px) {
        text-align: center;
      }
    }
  }

  & .right-side {
    & button.checkout {
      width: 100%;
      height: 52px;
    }
    & .anticon {
      font-size: 20px;
      color: #999;
      width: 32px;
    }
    & .ant-card {
      margin-bottom: 16px;
      width: 100%;
    }
    & .ant-card-body {
      padding: 16px;

      & .data.table.totals {
        width: 100%;
        & th {
          width: 100px;
          font-weight: 300;
        }
        & td {
          width: calc(100% - 100px);
          text-align: right;
          & span.price {
            color: #ff464b;
            line-height: 1.5;
            font-size: 20px;
          }
        }
      }
    }

    & .ant-card-head-title {
      color: #333;
      font-weight: 300;
    }
  }

  .cart-actions {
    & > span {
      height: 36px;
      width: 45px;
      text-align: 'center';
      line-height: 1.29px;
      display: 'inline-block';
    }
  }
  table td{
      white-space: nowrap;
  }

  table td:first-child{
    white-space: normal;
  }

  @media only screen and (max-width: 767px) {
    .cart-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        min-width: 26px;
        max-width: 26px;
        min-height: 26px;
        max-height: 26px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 11px;
        color: rgba(0, 0, 0, 0.65);
        border-radius: 0px;
        background-color: #fff;
      }
      & > span {
        display: inline-flex;
        height: 26px;
        width: 36px;
        background-color: #fff;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
      }
    }
  }
`;
