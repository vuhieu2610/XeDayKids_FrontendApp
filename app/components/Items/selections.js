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
  & .ant-card-body {
    padding: 0;
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
