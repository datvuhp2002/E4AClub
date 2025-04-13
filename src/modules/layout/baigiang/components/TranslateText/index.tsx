'use client';

import { useEffect, useState, CSSProperties } from "react";
import { Tooltip } from "@mui/material";
import classNames from 'classnames/bind';
import styles from './TranslateText.module.scss';
import TranslatorService from "@/services/translator-service";

const cx = classNames.bind(styles);

interface TranslateTextProps {
    text: string;
    className?: string; 
    style?: CSSProperties; 
}

const TranslateText: React.FC<TranslateTextProps> = ({ text, className, style }) => {
    const [translatedText, setTranslatedText] = useState<string | null>(null);
    const [hasTranslated, setHasTranslated] = useState(false);

    const handleTranslate = () => {
        if (!hasTranslated) {
            TranslatorService.TranslateText(text)
                .then((res) => {
                    if (!res.translated.error) {
                        res.translated.details
                            ? setTranslatedText(res.translated.translated)
                            : setTranslatedText(res.translated);
                    } else {
                        setTranslatedText(text);
                    }
                    setHasTranslated(true);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    useEffect(() => {
        setTranslatedText(null);
        setHasTranslated(false);
    }, [text]);

    return (
        <Tooltip
            className={cx('wrapper', className)}
            onMouseEnter={handleTranslate}
            title={translatedText || 'Đang dịch...'}
            arrow
        >
            <span style={style}>{text}</span>
        </Tooltip>
    );
};

export default TranslateText;
