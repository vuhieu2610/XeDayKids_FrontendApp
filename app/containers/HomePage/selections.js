import styled from 'styled-components';
import { Carousel, Menu } from 'antd';

export const MainContent = styled.main`
  padding-top: 10px;
`;

export const CustomCarosel = styled(Carousel)`
  height: 100%;
  border-radius: 0;
  overflow: hidden;
  & .slick-slide {
    text-align: center;
    overflow: hidden;

    & a {
      display: block;
      height: 422px;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: left;
      }
    }
  }

  & .slick-slide h3 {
    color: #fff;
  }
`;

export const CustomMenu = styled.div`
  width: 100%;
  border-radius: 0;
  border: 1px solid #ebecf0;
  height: 422px;
  padding: 10px;
  & > .ant-menu {
    margin: -10px;
  }
`;

export const CustomCaroselWrapper = styled.div`
  position: relative;
  & > .home-banner-block {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    height: 100%;
    width: 300px;
    padding: 10px 10px 11px;
    & > .home-banner {
      & > .banner-item {
        padding: 9px 10px 8px;
        border-radius: 4px;
        overflow: hidden;
        & > a {
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
          border-radius: 4px;
          height: 0;
          padding-bottom: 45%;
          overflow: hidden;
          position: relative;
          display: block;
          & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            display: block;
          }
        }
      }
    }
  }
`;

export const FourboxBlock = styled.div`
  margin: 5px -5px;
  & > .fourbox {
    display: flex;
    flex-wrap: wrap;
    & > .box {
      width: 25%;
      padding: 5px;
      box-sizing: border-box;
      float: left;
      & img {
        display: inline-block;
        max-width: 60px;
        height: 60px;
        object-fit: contain;
      }
      & > a {
        display: flex;
        height: 100%;
        padding: 15px 14px 15px 15px;
        border-radius: 4px;

        & > span:not(.img) {
          display: flex;
          flex-direction: column;
          & > span {
            width: 100%;
            padding-left: 15px;
            font-size: 12px;
            line-height: 1.2;
            color: #999;
            font-weight: 300;
            &.title {
              display: block;
              font-size: 18px;
              color: #333;
              margin: 1px 0 5px;
              font-weight: 300;
            }
          }
        }
      }
    }
  }
`;
