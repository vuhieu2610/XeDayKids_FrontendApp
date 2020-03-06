/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {
    CustomItem,
    CustomRate,
    CustomBar,
    CountDownWrapper
} from './selections';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
export default function Item({ data }) {
    return (
        <CustomItem
            cover={
                <Link to={`/${data.slug}`}>
                    <img
                        alt='example'
                        src='https://salt.tikicdn.com/cache/280x280/ts/product/5a/07/aa/695ffed9d2b0c3cbed32cf329746b4d2.jpg'
                    />
                </Link>
            }
        >
            <div className='item-details'>
                <span className='percent deal'>-40%</span>
                <span className='item-name'>
                    <Link to={`/${data.slug}`}>
                        Ly Giữ Nhiệt Bằng Thép Không Gỉ Lock&Lock Clip Tumbler
                        LHC4151BLK (540ml) - Đen
                    </Link>
                </span>
                <div className='price-box'>
                    <span>150.000 ₫</span>
                </div>
                <div className='progress'>
                    <CustomBar percent={80} format={e => 'Đã bán 80'} />
                    <CountDownWrapper>0 ngày 06:18:56</CountDownWrapper>
                </div>
                <div className='item-reviews'>
                    {data.rating && (
                        <CustomRate
                            allowHalf
                            disabled
                            tooltips={desc}
                            value={data.rating}
                        />
                    )}
                    {data.rating ? (
                        <span className='ant-rate-text'>
                            ({data.ratingCount})
                        </span>
                    ) : (
                        <span className='ant-rate-text'>Chưa có đánh giá</span>
                    )}
                </div>
            </div>
        </CustomItem>
    );
}

Item.propTypes = {
    data: propTypes.shape({
        slug: propTypes.string,
        id: propTypes.number,
        title: propTypes.string,
        rating: propTypes.number,
        ratingCount: propTypes.number
    })
};
