import { Layout } from 'antd';
import styled from 'styled-components';
const { Content, Footer } = Layout;

export const StyledContent = styled(Content)`
  margin-top: 108px;
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
    width: calc(100% + 140px);
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    -o-transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
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
