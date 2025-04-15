'use client';

import SentenceWrapper from '@/modules/layout/baigiang/components/SentenceWrapper';
import Talking from '@/modules/layout/baigiang/components/Talking';
import style from './GioiThieu.module.scss';
import classNames from 'classnames/bind';
import React from 'react';

const cx = classNames.bind(style);

const Page = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-item', 'wrapper-item-left')}>
                <Talking text="Sorry sir! I noticed you have broken the speed limit, can I see your driver's license and passport?" gender='male' />
                <p>Sorry sir! I noticed you have broken the speed limit, can I see your driver's license and passport?</p>
            </div>
            <div className={cx('wrapper-item', 'wrapper-item-right')}>
                <Talking text=" Ah yeah, can you give me a moment to find it? There it is, here you go Mr. Officer." gender='male' />
                <p>Ah yeah, can you give me a moment to find it? There it is, here you go Mr. Officer.</p>
            </div>
        </div>
    );
};

export default Page;
