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
        padding: 0;
    }

    & > .ant-card-body {
        padding: 0;
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
    @media (max-width: 1339px) {
        display: none;
    }
`;

export const CustomCardExtra = styled.label`
    align-items: center;
    display: flex;
    width: 200px;
    height: 36px;
    position: relative;
    left: 0;

    & > span {
        font-size: 12px;
        white-space: nowrap;
        margin-right: 15px;
    }
    @media (max-width: 1339px) {
      width: 300px;
    }
`;
