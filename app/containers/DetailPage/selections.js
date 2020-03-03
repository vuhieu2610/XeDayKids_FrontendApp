import styled from 'styled-components';

export const Main = styled.div`
  padding-bottom: 20px;
  & > .row-main {
    display: flex;
    align-items: flex-start;
  }
  &,
  & > .row-main {
    width: 100%;
  }
  & > .row-main > .item {
    display: flex;
    align-items: center;
    padding-right: 24px;
    width: 464px;
    height: 464px;
    & > .control {
      /* padding: 15px 0; */
      height: 417px;
      width: 65px;
      margin-right: 10px;
      & > .thumb {
        width: 65px;
        height: 65px;
        border: solid 1px ${props => (props.selected ? '#ff464b' : '#ebecf0')};
        border-radius: 4px;
        margin: 4px 8px 4px 0;
        overflow: hidden;
      }
      & .preview {
        overflow: hidden;
        display: flex;
        align-items: center;
      }
    }
    & img {
      width: 100%;
      height: auto;
    }

    & > .preview {
      height: 335px;
      width: calc(100% - 75px);
      background-color: #364d79;
    }
  }

  & > .row-main > .item-info-main {
    width: 472px;
    padding-right: 16px;
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

    & > .product-info-price {
      display: block;
      width: 100%;
      padding-bottom: 15px;
      & > strong {
        font-size: 18px;
        line-height: 1.08;
        color: #333;
        font-weight: 500;
      }
    }

    & > .actions {
      border-top: 1px solid #ccc;
      padding-top: 16px;
      margin-top: 16px;
      margin-bottom: 18px;
      & > .order-actions {
        & > button {
          border-radius: 29.5px;
          margin: 16px 4px 0px 4px;
          height: 52px;
          padding: 0 16px;
          min-width: 160px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      }
      & > .number {
        width: 125px;
        margin-right: 24px;
        margin-bottom: 16px;
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
              height: 40px;
            }
            & .ant-input-number {
              height: 40px;
              border-radius: 0;
              border-left: none;
              border-right: none;
              & input {
                height: 40px;
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

    & > .product-brand-container {
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

  & > .row-main > .sidebar-right {
    width: 296px;
    padding-bottom: 25px;
    padding-top: 20px;
    & > .ant-card {
      margin: 8px 0 16px 0;
    }
  }

  & > .row-detail {
    padding-top: 32px;
    display: flex;
    & > .product.info.detailed {
      width: calc(100% - 296px);
      min-width: 62%;
      padding-right: 16px;
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
    & > .sidebar-right {
      width: 296px;
      max-width: 38%;
    }
  }

  @media (min-width: 768px) {
    & > .row-main > .item {
      width: 57px;
      margin-bottom: 25px;
    }

    & > .row-main > .item-info-main {
      position: relative;
      width: 40%;
    }
    @media (min-width: 1200px) {
      & > .row-main > .item {
        width: 37.66%;
      }

      & > .row-main > .item-info-main {
        width: calc(62.34% - 296px);
      }
    }
  }
`;
