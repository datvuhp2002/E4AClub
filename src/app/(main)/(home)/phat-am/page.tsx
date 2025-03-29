'use client';

import { useState } from 'react';
import DiffMatchPatch from 'diff-match-patch';
import useSpeechRecognition from '@/modules/common/components/useSpeechRecognition';
import classNames from 'classnames/bind';

import styles from './PhatAm.module.scss';
import Speaking from '@/modules/layout/baigiang/components/Speaking';
const cx = classNames.bind(styles);

export default function Home() {
    return (
        <div className={cx('wrapper')}>
            <Speaking question='Hello, how are you?' />
        </div>
    );
}
