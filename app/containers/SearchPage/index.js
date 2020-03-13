/* eslint-disable react/no-unescaped-entities */
/**
 *
 * SearchPage
 *
 */

import React, { memo, useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { Select, Col, Empty, Row, Skeleton } from 'antd';
import _ from 'lodash';
import { setBreadcrumbs } from '../App/actions';
import {
  CustomCard,
  CustomCardTitle,
  CustomCardExtra,
} from '../ListPage/selections';
import { makeRequestSearch } from './actions';
import { defaultArray } from '../../utils/string';
import Item from '../../components/Item';

const defaultItems = {
  isLoading: false,
  hasError: false,
  data: defaultArray(20),
};

export function SearchPage({ changeBreadcrumbs }) {
  const [searchText, setsearchText] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const { searchContent } = useParams();
  const [pagination, setPagination] = useState({
    pageSize: 20,
    pageIndex: 1,
  });
  const [items, setItems] = useState(defaultItems);

  const getProducts = async () => {
    setItems({ ...defaultItems, isLoading: true });
    try {
      const req = await makeRequestSearch({
        ...pagination,
        content: searchContent,
      });
      const { DataList: data, HasError, TotalRecords } = req;

      if (HasError) {
        setItems({ ...defaultItems, isLoading: false, hasError: true });
        setTotalItems(0);
      } else {
        setItems({ data, isLoading: false, hasError: false });
        setTotalItems(TotalRecords);
      }
    } catch (err) {
      setItems({ ...defaultItems, isLoading: false, hasError: true });
      setTotalItems(0);
    }
  };

  useEffect(() => {
    if (!searchText) return;
    getProducts();
  }, [searchText]);

  useEffect(() => {
    changeBreadcrumbs({
      displayable: true,
      items: [
        {
          name: `Kết quả tìm kiếm cho: '${searchContent}'`,
          href: '#',
        },
      ],
    });

    setsearchText(searchContent);
  }, [searchContent]);

  return (
    <Fragment>
      <Helmet>
        <title>Kết quả tìm kiếm cho: '{searchText}'</title>
      </Helmet>
      <div>
        <CustomCard
          bordered={false}
          title={
            <CustomCardTitle>
              <h1>
                <span>Kết quả tìm kiếm cho: '{searchText}'</span>
              </h1>
              <span> 60 sản phẩm</span>
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
                <Select.Option value="Phổ biến nhì">Phổ biến nhì</Select.Option>
                <Select.Option value="Phổ biến ba">Phổ biến ba</Select.Option>
                <Select.Option value="Phổ biến bét">Phổ biến bét</Select.Option>
              </Select>
            </CustomCardExtra>
          }
        >
          <Row gutter={[5, 5]}>
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
          </Row>
        </CustomCard>
      </div>
    </Fragment>
  );
}

SearchPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  changeBreadcrumbs: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeBreadcrumbs: state => dispatch(setBreadcrumbs(state)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SearchPage);
