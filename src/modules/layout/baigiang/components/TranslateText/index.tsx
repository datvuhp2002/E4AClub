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

    const renderTooltipHTML = (data: any) => {
        const posMap: { [key: string]: string } = {
            a: 'Tính từ',
            n: 'Danh từ',
            v: 'Động từ',
            r: 'Trạng từ',
            prep: 'Giới từ',
            conj: 'Liên từ',
            pron: 'Đại từ',
            int: 'Thán từ'
        };

        debugger;
        const details = data.translated?.details || {};
        const keys = Object.keys(details);
        let tooltipHTML = '<div>';

        keys.forEach((posKey) => {
            const detail = details[posKey];
            tooltipHTML += `<div style="margin-bottom: 1rem;">`;
            tooltipHTML += `<strong style="text-decoration: underline;">${posMap[posKey] || posKey}</strong>`;
            tooltipHTML += `<div style="margin-top: 0.25rem; color: var(--welcome-page-step-4-color)"><em>&rarr; ${detail.definition}</em> (${text})</div>`;

            if (detail.examples?.length > 0) {
                tooltipHTML += `<div style="margin-top: 0.5rem;"><strong>Ví dụ:</strong><ul style="padding-left: 1rem; margin: 0;">`;
                detail.examples.forEach((ex: any, idx: number) => {
                    tooltipHTML += `<li key=${idx}>${ex}</li>`;
                });
                tooltipHTML += `</ul></div>`;
            }

            if (detail.synonyms?.length > 0 || detail.antonyms?.length > 0) {
                tooltipHTML += `<div style="margin-top: 0.5rem;">`;
                if (detail.synonyms?.length > 0) {
                    tooltipHTML += `<div><strong>Đồng nghĩa:</strong> ${detail.synonyms.join(', ')}</div>`;
                }
                if (detail.antonyms?.length > 0) {
                    tooltipHTML += `<div><strong>Trái nghĩa:</strong> ${detail.antonyms.join(', ')}</div>`;
                }
                tooltipHTML += `</div>`;
            }
            tooltipHTML += `</div>`;
        });

        tooltipHTML += `</div>`;
        return tooltipHTML;
    };


    const handleTranslate = () => {
        if (!hasTranslated) {
            TranslatorService.TranslateText(text)
                .then((res) => {
                    if (!res.translated.error) {
                        if (res.translated.details) {
                            const html = renderTooltipHTML(res);
                            setTranslatedText(html);
                        } else {
                            setTranslatedText(res.translated)
                        }
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
            title={
                <Box
                    sx={{ maxWidth: 240, maxHeight: '35vh', overflowY: 'auto', padding: '8px 12px', }}
                    dangerouslySetInnerHTML={{
                        __html: translatedText || 'Đang dịch...',
                    }}
                />
            }
            arrow
            slotProps={{
                tooltip: {
                    sx: {
                        backgroundColor: '#fff',
                        color: 'var(--text-color)',
                        fontSize: '1.4rem',
                        borderRadius: '8px',
                        border: '2px solid var(--border-line)',
                    },
                },
                arrow: {
                    sx: {
                        color: '#fff',
                        '::before': {
                            border: '2px solid var(--border-line)',
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
