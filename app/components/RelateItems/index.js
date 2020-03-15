import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Affix, Card } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getRouteUrl } from '../../route';
import { getProductsByCategoryId } from '../../containers/ListPage/actions';
import _ from 'lodash';
import { baseURL } from '../../utils/request';
import { getSlug, toMoney } from '../../utils/string';

const toJson = (string, defaultValue) => {
  try {
    return JSON.parse(string);
  } catch (err) {
    return defaultValue;
  }
};

export default function RelateItems({
  cateId,
  offsetTop,
  show,
  currentItem,
  hasOffset = true,
}) {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const req = await getProductsByCategoryId({
        pageSize: 6,
        pageIndex: 1,
        item: { CategoryId: cateId },
      });

      const { data: body } = req;

      if (body && !body.HasError && body.HasDataList) {
        setItems(
          body.DataList.filter(item => !_.eq(item.ProductId, currentItem)),
          // body.DataList,
        );
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (items.length > 0 && show) show();
  }, [items]);

  useEffect(() => {
    if (cateId) getItems();
  }, []);

  const Parent = ({ children, ...res }) =>
    hasOffset ? <Affix {...res}>{children}</Affix> : <div>{children}</div>;

  return (
    <Parent {...{ offsetTop }}>
      <CustomCard title="Sản phẩm cùng danh mục" row={hasOffset ? 0 : 1}>
        {items.length > 0 &&
          items.map(item => (
            <Item key={_.uniqueId()}>
              <div className="product-item-info">
                <Link
                  to={getRouteUrl('DetailPage', {
                    slug: getSlug(item.Name),
                    productId: item.ProductId,
                  })}
                  className="product-item-photo"
                >
                  <span className="product-image">
                    <img
                      src={`${baseURL}${toJson(item.Images, [])[0].url}`}
                      alt="product-image"
                    />
                  </span>
                </Link>

                <div className="product-item-details">
                  <p className="product-item-name">
                    <Link
                      to={getRouteUrl('DetailPage', {
                        slug: getSlug(item.Name),
                        productId: item.ProductId,
                      })}
                    >
                      {item.Name}
                    </Link>
                  </p>
                  <div className="price-box">
                    <span className="price-final">
                      {toMoney(
                        item.PromotionId ? item.PromotionPrice : item.Price,
                      )}{' '}
                      ₫
                    </span>
                    {item.PromotionId && (
                      <span className="old-price">{toMoney(item.Price)} ₫</span>
                    )}
                  </div>
                </div>
              </div>
            </Item>
          ))}
      </CustomCard>
    </Parent>
  );
}

RelateItems.propTypes = {
  show: PropTypes.func,
  cateId: PropTypes.number,
  offsetTop: PropTypes.number,
  currentItem: PropTypes.number,
  hasOffset: PropTypes.bool,
};

const Item = styled.div`
  padding: 12px 0;
  width: 100%;
  max-width: 300px;
  white-space: normal;
  &:not(:nth-last-of-type(1)) {
    border-bottom: 1px solid #ebecf0;
  }
  .product-item-info {
    width: 100%;
    display: flex;
    .product-item-photo {
      width: 88px;
      height: 88px;
      border-radius: 4px;
      border: solid 1px #ebecf0;
      position: relative;
      display: block;
      .product-image {
        display: block;
        position: absolute;
        max-width: 100%;
        max-height: 100%;
        left: 0;
        top: 0;
      }
    }

    .product-item-details {
      width: calc(100% - 100px);
      min-height: auto;
      margin-left: 12px;
      padding: 0;
      .product-item-name {
        margin: 2px 0 -1px;
        height: 42px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        a {
          display: inline;
          font-size: 13px;
          line-height: 1.25;
          color: #707070;
          text-decoration: none;
        }
      }

      .price-box {
        margin-top: 5px;
        .price-final {
          font-size: 16px;
          line-height: 1.33;
          color: #333;
          font-weight: 500;
          display: block;
        }
        .old-price {
          display: block;
          font-size: 14px;
          line-height: 1.29;
          color: #999;
          font-weight: 300;
          text-decoration: line-through;
        }
      }
    }
  }
`;

const CustomCard = styled(Card)`
  .ant-card-head {
    padding: 0 11px;
    .ant-card-head-title {
      padding: 12px 0;
    }
  }

  .ant-card-body {
    padding: 0 11px;
    overflow-y: ${props => (props.row ? 'hidden' : 'unset')};
    overflow-x: ${props => (props.row ? 'auto' : 'unset')};
    white-space: nowrap;
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.5);
    }
    ${props =>
      props.row &&
      `& ${Item} {
      display: inline-block;
      &:not(:nth-last-of-type(1)) {
        border-bottom: none;
        border-right: 1px solid #ebecf0;
        margin-right: 12px;
      }
    }`}
  }
`;
