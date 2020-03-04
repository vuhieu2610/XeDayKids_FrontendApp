import styled from 'styled-components';

export const Main = styled.div`
  & * {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  }
  padding-bottom: 20px;
  & .product-inf {
    display: flex;
    align-items: center;
    padding-right: ${props => (props.mobile ? '0' : '24px')};
    width: 100%;
    height: 464px;
    flex-direction: ${props => (props.mobile ? 'column-reverse' : 'row')};
    & > .control {
      width: 100%;
      height: 100px;
      & .ant-carousel {
        & .slick-track {
          display: flex;
          cursor: grab;
        }
        & .slick-slide {
          height: 80px;
          & .thumb {
            border: solid 1px #ebecf0;
            border-radius: 4px;
            width: 80px !important;
            height: 80px;
            overflow: hidden;
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
          }
          & img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
    & img {
      height: 100%;
    }

    & > .preview,
    & .thumb {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
  }

  & .preview {
    overflow: hidden;
    max-height: 80%;
    width: calc(100% - 75px);
  }

  & .item-info-main {
    width: 100%;
    padding-bottom: 25px;

    & > .page-title-wrapper {
      margin-bottom: 24px;
      margin-right: 16px;
      & > h1 {
        display: inline-block;
        padding-top: 11px;
        font-size: 24px;
        color: #333;
        font-weight: 300;
        margin: 0;
        line-height: 1.5;
      }
    }
    & > .attributes {
      margin: 20px 0;
      color: #333;
      line-height: 1.71;
      & ul {
        padding: 0 0 0 13px;
        list-style: none;
        & > li {
          margin: 0 0 1px;
          font-weight: 300;
          &::before {
            content: '';
            display: block;
            float: left;
            margin-top: 8px;
            margin-left: -13px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #a5adbb;
          }
        }
      }
    }

    & .product-info-price {
      display: block;
      width: 100%;
      padding: 10px 0;
      & > strong {
        font-size: 30px;
        line-height: 1.08;
        color: #333;
        font-weight: 500;
      }
      & .special-price-item {
        margin: 19px 0 2px;
        font-size: 14px;
        color: #9b9b9b;
        font-weight: 300;
        & > .price-label {
          display: inline-block;
          margin-bottom: 5px;
        }
        & > .span-price {
          color: #ff3425;
          font-size: 40px;
          font-weight: bold;
        }
      }
      & .saleoff-price-item {
        font-size: 14px;
        margin: 4px 0;
        font-weight: 300;
        color: #9b9b9b;
        & .discount-percent {
          font-weight: 400;
          color: #ff3425;
          /* font-size: 13px; */
        }
        & .span-saving-price {
          color: #000;
          font-weight: bold;
        }
      }
      & .old-price-item {
        line-height: 18px;
        /* font-size: 13px; */
        color: #9b9b9b;
        font-weight: 300;
        margin: 0;
        & .span-list-price {
          color: #000;
          font-weight: bold;
        }
      }

      & .deal-process-wrapper {
        padding-bottom: 22px;
        margin-top: 18px;
        & > .deal-time {
          color: #242424;
          & > .icon-timer {
            width: 24px;
            height: 24px;
            display: inline-block;
            vertical-align: middle;
            background-image: url(https://salt.tikicdn.com/desktop/img/timer@2x.png?v=3);
            background-size: contain;
            margin-right: 8px;
            & + span {
              font-size: 20px;
              margin-left: 5px;
              display: inline-block;
              font-weight: bold;
            }
          }
        }
      }

      & .deal-info {
        display: flex;
        align-items: flex-end;
        color: #ff3b27;
        margin-top: 8px;
        & .ant-progress-text {
          display: none;
        }
        & .ant-progress {
          margin-left: 8px;
          width: calc(100% - 80px);
        }
      }
    }

    & .actions {
      /* border-top: 1px solid #ccc; */
      /* padding-top: 16px; */
      margin-top: 16px;
      margin-bottom: 18px;
      align-items: flex-end;
      & > .order-actions {
        display: ${props => (props.mobile ? 'flex' : 'block')};
        & > button {
          /* border-radius: 20px; */
          height: 45px;
          padding: 0 16px;
          min-width: 160px;
          margin-right: ${props => (props.mobile ? '10px' : '20px')};
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      }
      & > .number {
        & .ant-input-number-handler-wrap {
          display: none !important;
        }
        & > label {
          & > .span {
            font-size: 14px;
            color: #333;
            font-weight: 300;
            line-height: 1.2;
            margin: 0 0 7px;
            display: block;
          }

          & > .number-control {
            display: flex;
            align-items: center;
            margin-top: 16px;
            & button {
              border-radius: 0;
              height: 35px;
            }
            & .ant-input-number {
              height: 35px;
              width: 50px;
              border-radius: 0;
              border-left: none;
              border-right: none;
              & input {
                height: 35px;
                text-align: center;
              }
            }
            & *:hover {
              border-color: #d9d9d9 !important;
              color: #d9d9d9 !important;
            }
          }
        }
      }
    }

    & .product-brand-container {
      margin-top: 2px;
      margin-bottom: 19px;
      line-height: 18px;
      max-width: calc(100% - 130px);
      & > .branch-name {
        margin: 0;
        font-weight: 300;
        & > .label {
          color: #333;
        }
      }
    }
  }

  & .sidebar-right {
    width: 296px;
    padding-bottom: 25px;
    padding-top: 20px;
    & > .ant-card {
      margin: 8px 0 16px 0;
    }
  }

  & .product.info.detailed {
    width: 100%;
    min-width: 62%;
    & > .data.item {
      &.title {
        font-size: 24px;
        color: #333;
        background: 0 0;
        height: auto;
        padding: 0;
        line-height: 1.15;
        padding-bottom: 16px;
        font-weight: 300;
      }
      &.content .label {
        background-color: #f4f5f7 !important;
        color: #333;
      }

      &.content:not(:nth-last-of-type(1)) {
        margin-bottom: 52px;
      }

      & .ant-table tbody > tr.ant-table-row:hover > td {
        background-color: #fff;
      }
    }
  }
`;
