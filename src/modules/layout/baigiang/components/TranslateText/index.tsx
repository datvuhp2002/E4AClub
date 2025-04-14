'use client';

import { useEffect, useState, CSSProperties } from "react";
import { Box, Tooltip } from "@mui/material";
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
            // title={
            //     <Box
            //         sx={{ maxWidth: 220 }}
            //         dangerouslySetInnerHTML={{
            //             __html: `<strong>Đây là HTML</strong><br><em>Hiển thị bằng cách không an toàn</em>`,
            //         }}
            //     />
            // }
            arrow
            slotProps={{
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 8],
                            },
                        },
                    ],
                },
                tooltip: {
                    sx: {
                        backgroundColor: '#fff',
                        color: 'var(--text-color)',
                        fontSize: '14px',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '2px solid #ccc',
                    },
                },
                arrow: {
                    sx: {
                        color: '#fff',
                        '::before': {
                            border: '2px solid #ccc',
                            boxSizing: 'border-box',
                        },
                    },
                },
            }}
        >
            <span style={style}>{text}</span>
        </Tooltip>
    );
};

export default TranslateText;
