import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const VerticleMenuItem = ({ dataList }) => (
  <Menu selectable={false} mode="vertical-left">
    {dataList.map(item => (
      <MenuItem key={item.CategoryId}>
        <Link to={item.Href || ''}>
          {item.Image && (
            <span
              style={{
                backgroundImage: `url(${item.Image})`,
              }}
              className="icon"
            />
          )}
          <span>{item.Name}</span>
        </Link>
      </MenuItem>
    ))}
  </Menu>
);

const MenuItem = styled(Menu.Item)`
  padding: 0 !important;
  & > a {
    font-size: 14px;
    line-height: 23px;
    padding: 10px 10px 9px 50px;
    position: relative;
    transition: ease 0.4s;
    & span.icon {
      display: block;
      width: 30px;
      height: 30px;
      object-fit: cover;
      object-position: left top;
      top: 0;
      bottom: 0;
      left: 10px;
      margin: auto;
      background-size: cover;
      background-position: left top;
      position: absolute;
      & + span {
        font-weight: 300 !important;
        text-decoration: none;
        text-transform: none;
        font-size: 14px;
      }
    }
  }
  &:hover {
    & > a {
      color: #ec7079;
    }
  }
`;
