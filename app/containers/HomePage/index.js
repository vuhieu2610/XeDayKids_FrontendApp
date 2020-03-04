/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect } from 'react';
import { Menu, Row, Col } from 'antd';
import propTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { setBreadcrumbs } from '../App/actions';
import Items from '../../components/Items';
import { MainContent, CustomCarosel, CustomMenu } from './selections';

const { SubMenu } = Menu;

function HomePage({ changeBreadcrumbs }) {
  useEffect(() => {
    changeBreadcrumbs({
      displayable: false,
      items: []
    });
  }, []);

  return (
    <MainContent>
      <Row>
        <Col lg={5} xs={0}>
          <CustomMenu mode="vertical">
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
          </CustomMenu>
        </Col>
        <Col lg={19} xs={24}>
          <CustomCarosel autoplay draggable>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
          </CustomCarosel>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Items
            title="Xe đẩy"
            data={[
              {
                slug: 1,
                rating: 3.5,
                ratingCount: 10
              },
              {
                slug: 2
              },
              {
                slug: 3
              },
              {
                slug: 4
              },
              {
                slug: 5
              },
              {
                slug: 6
              },
              {
                slug: 7
              },
              {
                slug: 8
              },
              {
                slug: 9
              },
              {
                slug: 10
              }
            ]}
          />
        </Col>
      </Row>
    </MainContent>
  );
}

HomePage.propTypes = {
  changeBreadcrumbs: propTypes.func
};

const mapStateToProp = createStructuredSelector({});
const mapDispatchToProp = dispatch => ({
  changeBreadcrumbs: obj => dispatch(setBreadcrumbs(obj))
});

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(HomePage);
