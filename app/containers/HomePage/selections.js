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

export const CustomMenu = styled(Menu)`
  width: 100%;
  border-radius: 0;
  border: 1px solid #ebecf0;
  height: 422px;
`;
