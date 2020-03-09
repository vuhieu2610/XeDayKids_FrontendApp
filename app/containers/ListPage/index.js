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
import { setSearchPlaceholder as setSearchPlaceholderAction } from '../App/actions';
import {
  Grid,
  CustomCardTitle,
  CustomCardExtra,
  CustomCard,
} from './selections';

import { defaultArray } from '../../utils/string';
import { getProductsByCategoryId, getPromotionProducts } from './actions';

const { SubMenu } = Menu;

const defaultItems = {
  isLoading: false,
  hasError: false,
  data: defaultArray(20),
};

function ListPage({ setSearchPlaceholder }) {
  const [items, setItems] = useState(defaultItems);
  const [totalItems, setTotalItems] = useState(0);
  const [categoryName, setCategoryName] = useState('');
  const [pagination, setPagination] = useState({
    pageSize: 20,
    pageIndex: 1,
  });
  const { id } = useParams();

  useEffect(() => {
    setSearchPlaceholder(categoryName);
    return () => setSearchPlaceholder('');
  }, [categoryName]);

  const getItemsByCategory = async () => {
    setItems({ ...defaultItems, isLoading: true });
    try {
      const req = await getProductsByCategoryId({
        pageSize: pagination.pageSize,
        pageIndex: pagination.pageIndex,
        item: { CategoryId: id },
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

  const getPromotionItems = async () => {
    setItems({ ...defaultItems, isLoading: true });
    try {
      const req = await getPromotionProducts(pagination);
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
    if (!id) {
      getPromotionItems();
      setCategoryName('Khuyến mại');
    } else {
      getItemsByCategory();
    }
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Xe đẩy em bé</title>
      </Helmet>
      <Row gutter={[10, 10]} style={{ padding: '30px 0' }}>
        <Col xs={0} sm={0} xl={6}>
          <Card>
            <Menu mode="inline" style={{ width: '100%', borderRight: 'none' }}>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <span>Navigation One</span>
                  </span>
                }
              >
                <Menu.ItemGroup title="Item 1">
                  <Menu.Item key="1">Option 1</Menu.Item>
                  <Menu.Item key="2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Iteom 2">
                  <Menu.Item key="3">Option 3</Menu.Item>
                  <Menu.Item key="4">Option 4</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <span>Navigation Two</span>
                  </span>
                }
              >
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="7">Option 7</Menu.Item>
                  <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <span>Navigation Three</span>
                  </span>
                }
              >
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>
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
                  defaultValue="Phổ biến nhất"
                >
                  <Select.Option value="Phổ biến nhất">
                    Phổ biến nhất
                  </Select.Option>
                  <Select.Option value="Phổ biến nhì">
                    Phổ biến nhì
                  </Select.Option>
                  <Select.Option value="Phổ biến ba">Phổ biến ba</Select.Option>
                  <Select.Option value="Phổ biến bét">
                    Phổ biến bét
                  </Select.Option>
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
};

const mapStateToProps = createStructuredSelector({
  listPage: makeSelectListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setSearchPlaceholder: content =>
      dispatch(setSearchPlaceholderAction(content)),
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
