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

import { Row, Col, Menu, Card, Select } from 'antd';
import { Helmet } from 'react-helmet';

import Item from '../../components/Item';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectListPage from './selectors';
import reducer from './reducer';
import { setSearchPlaceholder as setSearchPlaceholderAction } from '../App/actions';
import saga from './saga';
import {
    Grid,
    CustomCardTitle,
    CustomCardExtra,
    CustomCard
} from './selections';
import _ from 'lodash';

const { SubMenu } = Menu;

function ListPage({ setSearchPlaceholder }) {
    useInjectReducer({ key: 'listPage', reducer });
    useInjectSaga({ key: 'listPage', saga });

    const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 67, 7, 8, 8, 9, 9]);

    useEffect(() => {
        setSearchPlaceholder('Item title');
        return () => {
            setSearchPlaceholder('');
        };
    }, []);

    return (
        <Fragment>
            <Helmet>
                <title>Trang danh sách</title>
            </Helmet>
            <Row gutter={[10, 10]} style={{ padding: '30px 0' }}>
                <Col xs={0} sm={0} xl={6}>
                    <Card>
                        <Menu
                            mode='inline'
                            style={{ width: '100%', borderRight: 'none' }}
                        >
                            <SubMenu
                                key='sub1'
                                title={
                                    <span>
                                        <span>Navigation One</span>
                                    </span>
                                }
                            >
                                <Menu.ItemGroup title='Item 1'>
                                    <Menu.Item key='1'>Option 1</Menu.Item>
                                    <Menu.Item key='2'>Option 2</Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup title='Iteom 2'>
                                    <Menu.Item key='3'>Option 3</Menu.Item>
                                    <Menu.Item key='4'>Option 4</Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                            <SubMenu
                                key='sub2'
                                title={
                                    <span>
                                        <span>Navigation Two</span>
                                    </span>
                                }
                            >
                                <Menu.Item key='5'>Option 5</Menu.Item>
                                <Menu.Item key='6'>Option 6</Menu.Item>
                                <SubMenu key='sub3' title='Submenu'>
                                    <Menu.Item key='7'>Option 7</Menu.Item>
                                    <Menu.Item key='8'>Option 8</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                            <SubMenu
                                key='sub4'
                                title={
                                    <span>
                                        <span>Navigation Three</span>
                                    </span>
                                }
                            >
                                <Menu.Item key='9'>Option 9</Menu.Item>
                                <Menu.Item key='10'>Option 10</Menu.Item>
                                <Menu.Item key='11'>Option 11</Menu.Item>
                                <Menu.Item key='12'>Option 12</Menu.Item>
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
                                    <span>Items title</span>
                                </h1>
                                <span> 519 sản phẩm</span>
                            </CustomCardTitle>
                        }
                        extra={
                            <CustomCardExtra>
                                <span>Sắp xếp</span>
                                <Select
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    defaultValue='Phổ biến nhất'
                                >
                                    <Select.Option value='Phổ biến nhất'>
                                        Phổ biến nhất
                                    </Select.Option>
                                    <Select.Option value='Phổ biến nhì'>
                                        Phổ biến nhì
                                    </Select.Option>
                                    <Select.Option value='Phổ biến ba'>
                                        Phổ biến ba
                                    </Select.Option>
                                    <Select.Option value='Phổ biến bét'>
                                        Phổ biến bét
                                    </Select.Option>
                                </Select>
                            </CustomCardExtra>
                        }
                    >
                        <Grid gutter={[10, 10]}>
                            {items.map(item => (
                                <Col xl={6} sm={6} xs={12} key={_.uniqueId()}>
                                    <Item
                                        data={{
                                            slug: 'item',
                                            rating: 3.5,
                                            ratingCount: 20,
                                            title: 'Sữa'
                                        }}
                                    />
                                </Col>
                            ))}
                        </Grid>
                    </CustomCard>
                </Col>
            </Row>
        </Fragment>
    );
}

ListPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    setSearchPlaceholder: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
    listPage: makeSelectListPage()
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        setSearchPlaceholder: content =>
            dispatch(setSearchPlaceholderAction(content))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    withConnect,
    memo
)(ListPage);
