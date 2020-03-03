import styled from 'styled-components';
import { Carousel, Menu } from 'antd';

export const MainContent = styled.main`
  padding-top: 10px;
`;

export const CustomCarosel = styled(Carousel)`
  min-height: 422px;
  border-radius: 0 4px 4px 0;
  overflow: hidden;
  & .slick-slide {
    text-align: center;
    background: #364d79;
    overflow: hidden;
    line-height: 400px;
    height: 422px !important;
  }

  & .slick-slide h3 {
    color: #fff;
  }
`;

export const CustomMenu = styled(Menu)`
  width: 100%;
  border-radius: 4px 0 0 4px;
  border: 1px solid #ebecf0;
  min-height: 422px;
`;
