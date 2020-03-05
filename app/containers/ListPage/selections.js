import styled from 'styled-components';
import { CustomItem } from '../../components/Item/selections';
import { Row, Card } from 'antd';

export const Grid = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  & ${CustomItem} {
    /* width: 240px; */
    margin: 0 !important;
  }
`;

export const CustomCard = styled(Card)`
  & .ant-card-head {
    border-bottom: none;
  }
`;

export const CustomCardTitle = styled.div`
  & h1 {
    display: inline-block;
    font-size: 24px;
    color: #333;
    font-weight: 300;
    margin: 0;
  }
  & > span {
    font-size: 14px;
    color: #999;
    font-weight: 300;
    margin-left: 9px;
  }
`;

export const CustomCardExtra = styled.label`
  font-family: initial;
  align-items: center;
  display: flex;
  min-width: 200px;
  height: 36px;
  position: relative;
  left: 0;

  & > span {
    font-size: 12px;
    white-space: nowrap;
    margin-right: 15px;
  }
`;
