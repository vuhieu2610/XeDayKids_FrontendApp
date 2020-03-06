import styled from 'styled-components';
import { Card, Carousel } from 'antd';

export const CustomCard = styled(Card)`
  width: 100%;
  margin-top: 10px !important;
  margin-bottom: 5px !important;

  & .ant-card-head {
    border-bottom: 1px solid transparent;
    padding-left: 0;
  }
  & .ant-card-head-title {
    & > h4 {
      font-size: 24px;
      color: #333;
      margin: 0;
      padding: 5px 25px 2px 10px;
      line-height: 1.2;
      vertical-align: middle;
      white-space: nowrap;
      position: relative;
      padding-left: 54px;
      & img {
        display: block;
        max-width: 34px;
        max-height: 34px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: calc(100% - 54px);
        margin: auto;
      }
    }
  }

  & .ant-card-extra > a {
    color: #999;
    opacity: 0.6;
    transition: opacity 0.2s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }
`;

export const CustomCarousel = styled(Carousel)`
  width: 100%;
`;
