import styled from 'styled-components';
import { Empty } from 'antd';

export const CustomEmpty = styled(Empty)`
    padding: 40px 0;
    text-align: center;
    & .ant-empty-image {
        width: 225px;
        height: auto;
        margin: 0 auto;
        margin-bottom: 15px;
        & > img {
            width: 100%;
            height: auto;
        }
    }
`;

export const CartContainer = styled.div`
    padding-top: 25px;
    padding-bottom: 10px;
    width: 100%;

    & .left-side {
        position: relative;

        & .page-title {
            font-size: 24px;
            line-height: 1.5;
            color: #333;
            margin-bottom: 17px;
            font-weight: 400;
            @media (max-width: 768px) {
              text-align: center;
            }
        }
    }

    & .right-side {
        & button.checkout {
            width: 100%;
            height: 52px;
        }
        & .anticon {
            font-size: 20px;
            color: #999;
            width: 32px;
        }
        & .ant-card {
            margin-bottom: 16px;
            width: 100%;
        }
        & .ant-card-body {
            padding: 16px;

            & .data.table.totals {
                width: 100%;
                & th {
                    width: 100px;
                    font-weight: 300;
                }
                & td {
                    width: calc(100% - 100px);
                    text-align: right;
                    & span.price {
                        color: #ff464b;
                        line-height: 1.5;
                        font-size: 20px;
                    }
                }
            }
        }

        & .ant-card-head-title {
            color: #333;
            font-weight: 300;
        }
    }
`;
