import { Layout, Menu } from 'antd';
import styled from 'styled-components';
const { Content, Footer } = Layout;

export const StyledContent = styled(Content)`
  margin-top: ${props => (props.mobile ? '0px' : '108px')};
  min-height: calc(100vh - 100px);
  background-color: #fff;
`;
export const StyledFooter = styled(Footer)``;

export const BreadcrumbBox = styled.div`
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #f4f5f7;
  }
  &::after {
    content: '';
    display: block;
    clear: both;
  }

  & .ant-breadcrumb {
    position: relative;
    display: inline-block;
    margin: 0;
    padding: 0;
    max-width: calc(100% - 145px);
  }
`;
export const CustomBottomNav = styled(Menu)`
  text-align: center;
  border-top: 1px solid #d9d9d9;
  & li {
    font-size: 13px;
  }
`;

export const PageWrapper = styled.div`
  width: 100%;
  @media (max-width: 1439px) {
    padding-left: 10px;
    padding-right: 10px;
  }
  @media (min-width: 1440px) {
    margin-left: auto;
    margin-right: auto;
    max-width: 1282px;
    padding-left: 56px;
    padding-right: 56px;
  }
`;
