'use client';

import TranslateText from '@/modules/layout/baigiang/components/TranslateText';
import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import nlp from 'compromise';
import style from './SentenceWrapper.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

interface SentenceWrapperProps {
    text: string;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties; // Allow passing additional styles
}

const SentenceWrapper: React.FC<SentenceWrapperProps> = ({ text, children = null, className = "", style }) => {
    const [phraseArr, setPhraseArr] = useState<string[]>([]);

    useEffect(() => {
        const doc = nlp(text);
        const nounPhrases = doc.nouns().out('array');
        const allWords = text.split(/\s+/);

        const pronouns = ['I', 'you', 'he', 'she', 'it', 'we', 'they', 'He', 'She', 'We', 'They', 'It', 'You'];
        const tobeVerbs = ['is', 'am', 'are', 'was', 'were', 'Is', 'Am', 'Are', 'Was', 'Were'];

        const result: string[] = [];
        let i = 0;
        let buffer: string[] = [];

        while (i < allWords.length) {
            let found = false;

            // Tìm cụm danh từ dài nhất có thể (tối đa 4 từ)
            for (let len = Math.min(4, allWords.length - i); len > 0; len--) {
                const sliceArr = allWords.slice(i, i + len);
                const slice = sliceArr.join(' ');

                // Nếu chỉ là 1 từ và là đại từ thì bỏ qua
                if (len === 1 && pronouns.includes(sliceArr[0])) {
                    continue;
                }

                if (nounPhrases.includes(slice)) {
                    // Push buffer nếu có
                    if (buffer.length > 0) {
                        result.push(buffer.join(' '));
                        buffer = [];
                    }

                    result.push(slice);
                    i += len;
                    found = true;
                    break;
                }
            }

            if (!found) {
                const currentWord = allWords[i];

                // Nếu là động từ tobe → gộp với từ trước 
                if (tobeVerbs.includes(currentWord)) {
                    result[result.length - 1] += ' ' + currentWord;
                } else {
                    buffer.push(currentWord);
                }

                i++;
            }
        }

        // Push phần còn lại
        if (buffer.length > 0) {
            result.push(buffer.join(' '));
        }

        setPhraseArr(result);
    }, [text]);

    return (
        <div className={cx("wrapper", "w-100 pe-2", [className])} style={style}> 
            <span> {children !== null ? children : text} </span>
            <div className={cx("wrapper-translate-tooltip")}>
                {
                    phraseArr.map((phrase, index) => (<>
                        {index !== 0 && <span>&nbsp;</span>}
                        <TranslateText key={index} text={phrase} />
                    </>))
                }
            </div>
        </div>
    );
};

export default SentenceWrapper;
