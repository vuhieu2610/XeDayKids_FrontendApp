import styled from 'styled-components';
import { Card, Carousel, Button } from 'antd';

export const CustomCard = styled(Card)`
  width: 100%;
  margin-top: 10px !important;
  margin-bottom: 5px !important;

  /* & .mobile-list {
    overflow-y: hidden;
    overflow-x: auto;
    white-space: nowrap;
    ::-webkit-scrollbar {
      display: none;
    }
    & > div {
      display: inline-block;
      width: 250px;
      margin: 4px 2.5px;
    }
  } */

  & > .ant-card-head {
    border-bottom: 1px solid transparent;
    padding: 0 !important;
  }
  & > .ant-card-body {
    padding: 0 !important;
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
      & img,
      .ant-skeleton-header {
        display: block;
        position: absolute;
        margin: auto;
        left: 0;
      }
      .ant-skeleton-paragraph {
        width: 100%;
        .ant-skeleton-header {
          top: 50%;
          transform: translate(0, -50%);
        }
      }
      img {
        top: 0;
        max-width: 34px;
        max-height: 34px;
        bottom: 0;
        right: calc(100% - 54px);
      }
      .ant-skeleton {
        height: 40px;
      }
      .ant-skeleton-content {
        position: relative;
        ul {
          position: absolute;
          top: 50%;
          transform: translate(0, -50%);
        }
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

export const CustomSlideButton = styled(Button)`
  width: 35px !important;
  height: 35px !important;
  z-index: 999;
  border: 1px solid #ccc !important;
  background: #fff !important;
  color: #464646 !important;
  font-size: 16px !important;
  &:hover {
    background: #eee !important;
  }
`;
