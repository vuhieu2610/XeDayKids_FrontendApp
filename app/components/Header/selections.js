import { Layout, Input } from 'antd';
import styled from 'styled-components';
const { Header } = Layout;

export const StyledHeader = styled(Header)`
  background: #fff;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 108px;
  line-height: normal;
  box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.16);
  padding: 0;
  & > .panel {
    box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.16);
    height: 32px;
    line-height: 32px;
    padding: 0 50px;
  }
  & > .content {
    height: calc(108px - 32px);
    padding: 0 50px;
    & > div {
      height: 100%;
    }
    & .ant-col {
      display: flex;
      align-items: center;
      &.rightSide {
        justify-content: flex-end;
        & .ant-badge-count {
          top: 5px;
          background: #333;
        }
        & .shoppingCart {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          font-size: 22px;
          color: #ff464b;
          border: 1px solid #ff464b;
          border-radius: 50%;
        }
      }
    }
    & .logo {
      width: 220px;
      height: 52px;
      object-fit: cover;
      object-position: left center;
    }
  }
`;

export const Search = styled(Input.Search)`
  height: 40px;
  border-radius: 20px !important;
  padding: 4px 20px !important;
`;

export const UserLink = styled.ul`
  display: inline-block;
  width: 185px;
  height: 40px;
  padding: 1px 10px 0 48px;
  position: relative;
  margin: 0;
  list-style: none;

  & .userIco {
    color: #a5adbb;
    background: #ebecf0;
    display: inline-flex;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 23px;
    position: absolute;
    top: 1px;
    left: 0;
    margin-top: 0;
  }
  & > li {
    margin: 1px 0 0;
    & > a {
      color: #333;
      font-size: 13px;
      font-weight: 300;
    }
  }
  & > li.greet.welcome {
    height: 15px;
    margin-top: 4px;
    font-size: 13px;
    color: #999;
    font-weight: 300;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & > li.authorization-link {
    display: inline-block;
    padding-right: 8px;
    margin-right: 1px;
  }
  & > li.authorization-link + li {
    position: relative;
    display: inline-block;
    padding-left: 5px;
    margin-left: -5px;
    &::before {
      content: '';
      display: block;
      width: 1px;
      height: 11px;
      background: #ebecf0;
      position: absolute;
      top: 4px;
      left: 0;
    }
  }
`;

export const LocaltionHeader = styled.div`
  display: flex;
  align-items: center;
  & > .anticon {
    color: #ff464b;
    display: inline-block;
    font-size: 18px;
    margin-right: 5px;
  }
  & > .location-main {
    font-size: 13px;
    color: #333;
    padding-left: 5px;
    position: relative;
    font-weight: 500;
  }
  & > span:not(.anticon, .location-main) {
    margin-right: 3px;
    cursor: text;
    color: #999;
    font-weight: 300;
  }
`;

export const HotLine = styled.ul`
  margin: 0;
  padding: 0 0 0 20px;
  list-style: none;

  & > li.hotline {
    display: inline-flex;
    align-items: center;
    & > .anticon {
      color: #ff464b;
      font-size: 14px;
      margin-right: 6px;
    }

    & > span:not(.anticon) {
      font-weight: 300;
      color: #999;
      & > a {
        color: #333;
      }
    }
  }
`;
export const Notification = styled.div`
  width: 125px;
  padding-left: 25px;
  margin-right: 25px;
  & > a {
    display: flex;
    width: 100%;
    text-decoration: none;
    align-items: center;
    & > .anticon {
      font-size: 30px;
      color: #ff464b;
    }
    & > span:not(.anticon) {
      font-size: 13px;
      display: inline-block;
      width: calc(100% - 41px);
      padding-left: 5px;
      margin-top: 2px;
      line-height: 1.5;
      color: #333;
      font-weight: 300;
    }
  }
`;
