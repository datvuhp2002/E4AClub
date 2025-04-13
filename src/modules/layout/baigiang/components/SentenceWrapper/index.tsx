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
    children: React.ReactNode;
}

const SentenceWrapper: React.FC<SentenceWrapperProps> = ({ text, children = null }) => {
    const [phraseArr, setPhraseArr] = useState([]);

    useEffect(() => {
        const doc = nlp(text);

        // 1. Tách theo cụm: lấy các cụm danh từ và cụm động từ
        const nounPhrases = doc.nouns().out('array');       // English book
        const verbPhrases = doc.verbs().out('array');       // like to read

        // 2. Gộp tất cả cụm lại, tránh trùng lặp
        const phraseSet = new Set([...nounPhrases, ...verbPhrases]);

        // 3. Lấy tất cả các từ gốc trong câu
        const allWords = text.split(/\s+/);

        // 4. Gom lại thành mảng cụm / từ:
        const result: string[] = [];

        let i = 0;
        while (i < allWords.length) {
            let found = false;

            // Kiểm tra từng cụm xem có khớp không
            for (let len = Math.min(4, allWords.length - i); len > 0; len--) {
                const slice = allWords.slice(i, i + len).join(' ');
                if (phraseSet.has(slice)) {
                    result.push(slice);
                    i += len;
                    found = true;
                    break;
                }
            }

            // Nếu không phải cụm nào thì push từng từ
            if (!found) {
                result.push(allWords[i]);
                i += 1;
            }
        }

        setPhraseArr(result);

    }, [text])

    return (
        <div className={cx("wrapper")}>
            {children !== null ? children : text}
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
