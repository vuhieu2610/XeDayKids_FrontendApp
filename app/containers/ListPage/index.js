/* eslint-disable indent */
/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * ListPage
 *
 */

import React, { memo, Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';

import { Row, Col, Menu, Card, Select, Skeleton, message, Empty } from 'antd';
import { Helmet } from 'react-helmet';

import _ from 'lodash';
import Item from '../../components/Item';

import makeSelectListPage from './selectors';
import {
  setSearchPlaceholder as setSearchPlaceholderAction,
  setBreadcrumbs,
} from '../App/actions';
import {
  Grid,
  CustomCardTitle,
  CustomCardExtra,
  CustomCard,
} from './selections';

import { defaultArray } from '../../utils/string';
import { getProductsByCategoryId, getPromotionProducts } from './actions';
import { VerticleMenuItem } from '../../components/Categories';
import { makeSelectCategories } from '../App/selectors';

const defaultItems = {
  isLoading: false,
  hasError: false,
  data: defaultArray(20),
};

const sorts = [
  { value: 'Price ASC', text: 'Giá tăng dần' },
  { value: 'Price DESC', text: 'Giá giảm dần' },
  { value: 'ProductId ASC', text: 'Hàng mới' },
  { value: 'BuyerCount DESC', text: 'Phổ biến nhất' },
];

function ListPage({ setSearchPlaceholder, changeBreadcrumb, categories }) {
  const [items, setItems] = useState(defaultItems);
  const [totalItems, setTotalItems] = useState(0);
  const [categoryName, setCategoryName] = useState('');
  const [sortBy, setSortBy] = useState('ProductId ASC');
  const [pagination, setPagination] = useState({
    pageSize: 20,
    pageIndex: 1,
  });
  const { id } = useParams();

  useEffect(() => {
    setSearchPlaceholder(categoryName);
    changeBreadcrumb({
      displayable: true,
      items: [
        {
          name: categoryName,
          href: '#',
        },
      ],
    });
    return () => setSearchPlaceholder('');
  }, [categoryName]);

  const getItemsByCategory = async () => {
    setItems({ ...defaultItems, isLoading: true });
    try {
      const req = await getProductsByCategoryId({
        pageSize: pagination.pageSize,
        pageIndex: pagination.pageIndex,
        sortBy,
        item: { CategoryId: id },
      });
      const { data: body } = req;
      if (!body || body.HasError) {
        setItems({ ...defaultItems, isLoading: false, hasError: true });
        setTotalItems(0);
      } else {
        setItems({ data: body.DataList, isLoading: false, hasError: false });
        setCategoryName(body.Data && body.Data.CategoryName);
        setTotalItems(body.TotalRecords);
      }
    } catch (err) {
      setItems({ ...defaultItems, isLoading: false, hasError: true });
      setTotalItems(0);
    }
  };

  const getPromotionItems = async () => {
    setItems({ ...defaultItems, isLoading: true });
    changeBreadcrumb({
      displayable: true,
      items: [
        {
          name: 'Khuyến mại',
          href: '#',
        },
      ],
    });
    try {
      const req = await getPromotionProducts({
        ...pagination,
        sortBy,
      });
      const { data: body } = req;
      if (!body || body.HasError) {
        setItems({ ...defaultItems, isLoading: false, hasError: true });
        setTotalItems(0);
      } else {
        setItems({ data: body.DataList, isLoading: false, hasError: false });
        setTotalItems(body.TotalRecords);
      }
    } catch (err) {
      setItems({ ...defaultItems, isLoading: false, hasError: true });
      setTotalItems(0);
    }
  };

  useEffect(() => {
    if (items.hasError) message.error('Có lỗi xảy ra, vui lòng thử lại sau', 2);
  }, [items.hasError]);

  useEffect(() => {
    changeBreadcrumb({
      displayable: true,
      items: [],
    });
  }, []);

  useEffect(() => {
    if (!id) {
      getPromotionItems();
      setCategoryName('Khuyến mại');
    } else {
      getItemsByCategory();
    }
  }, [sortBy, id]);

  return (
    <Fragment>
      <Helmet>
        <title>Xe đẩy em bé</title>
      </Helmet>
      <Row gutter={[10, 10]} style={{ padding: '30px 0' }}>
        <Col xs={0} sm={0} xl={6}>
          <Card
            bodyStyle={{
              padding: '10px 0',
            }}
          >
            <VerticleMenuItem
              dataList={categories.data}
              mode="inline"
              style={{ width: '100%', borderRight: 'none' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} xl={18}>
          <CustomCard
            bordered={false}
            title={
              <CustomCardTitle>
                <h1>
                  <span>{categoryName}</span>
                </h1>
                <span> {totalItems} sản phẩm</span>
              </CustomCardTitle>
            }
            extra={
              <CustomCardExtra>
                <span>Sắp xếp</span>
                <Select
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  value={sortBy}
                  onChange={value => setSortBy(value)}
                >
                  {sorts.map(option => (
                    <Select.Option value={option.value} key={_.uniqueId()}>
                      {option.text}
                    </Select.Option>
                  ))}
                </Select>
              </CustomCardExtra>
            }
          >
            <Grid gutter={[5, 5]}>
              {_.isEmpty(items.data) ? (
                <Col span={24}>
                  <Empty />
                </Col>
              ) : (
                items.data.map(item => (
                  <Col xl={6} sm={6} xs={12} key={_.uniqueId()}>
                    <Skeleton loading={items.isLoading} active>
                      {_.isObject(item) && <Item data={item} />}
                    </Skeleton>
                  </Col>
                ))
              )}
            </Grid>
          </CustomCard>
        </Col>
      </Row>
    </Fragment>
  );
}

ListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  setSearchPlaceholder: PropTypes.func,
  changeBreadcrumb: PropTypes.func,
  categories: PropTypes.shape({
    isLoading: PropTypes.bool,
    data: PropTypes.array,
    hasError: PropTypes.bool,
  }),
};

const mapStateToProps = createStructuredSelector({
  listPage: makeSelectListPage(),
  categories: makeSelectCategories(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setSearchPlaceholder: content =>
      dispatch(setSearchPlaceholderAction(content)),
    changeBreadcrumb: state => dispatch(setBreadcrumbs(state)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ListPage);
