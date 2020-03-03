import styled from 'styled-components';
import { Card, Rate } from 'antd';

export const CustomItem = styled(Card)`
  width: auto;
  margin: 10px !important;
  border: 1px solid transparent;
  user-select: none;
  /* transition: border-color 0.2s; */
  &:hover {
    border: 1px solid #f0f0f0;
  }

  & .ant-card-cover img {
    width: 100%;
  }

  & .ant-card-body {
    padding: 10px;
    padding-top: 0;
  }
  & .item-details {
    padding: 10px 0 0;
    min-height: 108px;
    & .item-name {
      height: 36px;
      & > a {
        display: inline;
        font-size: 14px;
        line-height: 1.25;
        color: #707070;
        text-decoration: none;
      }
    }
    & .price-box {
      margin-top: 10px;
      margin-bottom: 8px;
      min-height: 45px;
      & span {
        font-size: 14px;
        line-height: 1.33;
        color: #333;
        font-weight: 500;
      }
    }
    & .item-reviews {
      & > .ant-rate-text {
        color: #999;
        font-weight: 300;
        font-size: 12px;
        font-style: italic;
        white-space: nowrap;
        margin: 0;
      }
    }
  }
`;

export const CustomRate = styled(Rate)`
  height: 15px;
  font-size: 15px;
  & .ant-rate-star:not(:last-child) {
    margin-right: 3px;
  }
`;
