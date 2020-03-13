import styled from 'styled-components';
import { Card, Rate, Progress } from 'antd';

const barHeight = '18px';
export const CustomBar = styled(Progress)`
  height: 25px;
  & > .ant-progress-outer {
    height: ${barHeight};
    margin-right: 0 !important;
    padding-right: 0 !important;
    & > .ant-progress-inner {
      background-color: rgb(253, 218, 200);
      height: ${barHeight} !important;
      & > .ant-progress-bg {
        height: ${barHeight} !important;
        background-color: rgb(253, 110, 35);
      }
    }
  }
  & .ant-progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: ${barHeight};
    color: #fff !important;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
  }
`;

export const CountDownWrapper = styled.div`
  color: rgb(36, 36, 36);
  font-size: 12px;
  font-weight: 300;
  line-height: 18px;
  margin: 0px;
`;

export const CustomItem = styled(Card)`
  width: auto;
  position: relative;
  user-select: none;
  overflow: hidden;
  @media (min-width: 768px) {
    margin: 5px 5px 0 0 !important;
  }
  @media (max-width: 767px) {
    margin: 5px 5px 0 0 !important;
  }
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
    & > .percent.deal {
      position: absolute;
      top: 0px;
      left: 0px;
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      padding-bottom: 4px;
      color: rgb(255, 255, 255);
      font-weight: 500;
      width: 50px;
      height: 46px;
      background-image: url(https://frontend.tikicdn.com/_new-next/static/img/icons/product/deal-tag.png);
      background-size: 50px 46px;
      margin: 1px 0px 0px;
      background-position: 0px 0px;

      @media (max-width: 768px) {
        zoom: 0.7;
      }
    }
    & .item-name {
      height: 36px;
      & > a {
        font-size: 14px;
        line-height: 1.25;
        color: rgb(36, 36, 36);
        text-decoration: none;
        display: block;
        height: 40px;
        max-height: 40px;
        width: 100%;
        color: rgb(36, 36, 36);
        font-size: 13px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.54;
        letter-spacing: 0.1px;
        text-align: left;
        text-overflow: ellipsis;
        margin: 0px;
        overflow: hidden;
      }
    }
    & .price-box {
      margin-top: 10px;
      margin-bottom: 8px;
      min-height: 25px;
      & span {
        align-self: stretch;
        color: rgb(36, 36, 36);
        font-size: 16px;
        font-weight: bold;
        line-height: 1.6;
        margin: 0px;
        padding: 8px 0px 0px;
      }
      & .original.deal {
        color: rgb(120, 120, 120);
        font-size: 13px;
        font-weight: normal;
        text-decoration: line-through;
        display: inline-block;
        margin-left: 15px;
      }
    }
    & .progress {
      display: flex;
      align-self: stretch;
      margin-top: 12px;
      align-items: center;
      & ${CustomBar} {
        width: calc(100% - 100px);
      }
      & ${CountDownWrapper} {
        width: 90px;
        margin-left: 10px;
        text-align: right;
      }
      @media (max-width: 768px) {
        flex-direction: column;
        & ${CustomBar} {
          width: 100%;
        }
        & ${CountDownWrapper} {
          width: 100%;
          margin-left: 0;
          text-align: center;
        }
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
  display: inline-block !important;
  height: 15px;
  font-size: 13px !important;
  margin-right: 5px !important;
  & .ant-rate-star:not(:last-child) {
    margin-right: 3px;
  }
`;
