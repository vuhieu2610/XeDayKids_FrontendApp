import styled from 'styled-components';
import { Empty } from 'antd';

export const CustomEmpty = styled(Empty)`
  padding: 40px 0;
  text-align: center;
  & .ant-empty-image {
    width: 225px;
    margin: 0 auto;
    margin-bottom: 15px;
    & > img {
      width: 100%;
    }
  }
`;

export const CartContainer = styled.div`
  padding-top: 25px;
  padding-bottom: 10px;
  display: flex;
  width: 100%;

  & > .left-side {
    width: 65%;
    min-width: calc(100% - 400px);
    padding-right: 16px;
    position: relative;

    & .page-title {
      font-size: 24px;
      line-height: 1.5;
      color: #333;
      margin-bottom: 17px;
      font-weight: 400;
    }
  }

  & > .right-side {
    width: 35%;
    max-width: 400px;
    position: relative;
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
    }
    & .ant-card-body {
      padding: 16px;

      & .data.table.totals {
        width: 100%;
        & th {
          width: 220px;
          font-weight: 300;
        }
        & td {
          width: calc(100% - 220px);
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
`;
