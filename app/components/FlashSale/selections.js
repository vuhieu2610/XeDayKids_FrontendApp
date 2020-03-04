import styled from 'styled-components';
export const FlashSaleWrapper = styled.div`
  width: 100%;
  min-height: 400px;
  margin: -1px 0;
  border-radius: 4px;
  background-color: #fa7b79;
  color: #fff;
  text-align: center;
  padding: 19px 20px 34px;
  & > .icon-timer {
    & > img {
      width: 130px;
      margin-bottom: 20px;
      margin-top: 10px;
    }
    & .label-timer {
      font-size: 38px;
      font-weight: 300;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      display: block;
      margin: 15px auto;
    }
  }
  & .price {
    font-size: 30px;
    line-height: 1;
    display: block;
    margin-top: 25px;
    letter-spacing: 4px;
    padding: 10px;
    border: 1px solid #fff;
    border-radius: 4px;
  }
  & .coundown-timer {
    margin-left: -4px;
    margin-right: -4px;
    display: flex;
    justify-content: center;
    & .time {
      max-width: calc((100% / 4) - 8px);
      width: 60px;
      height: 60px;
      border-radius: 4px;
      background-color: #fa7b79;
      margin: 0 4px;
      padding: 5px;
      border: 2px solid #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      & .value {
        font-size: 24px;
        font-weight: 700;
        line-height: 1;
        display: block;
        margin-top: 2px;
        margin-bottom: 3px;
      }
    }
  }
`;
