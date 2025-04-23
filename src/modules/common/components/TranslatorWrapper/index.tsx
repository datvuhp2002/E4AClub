import { useEffect, useRef, useState } from "react";
import { Box, Popper, ClickAwayListener, Button } from '@mui/material';
import TranslatorService from "@/services/translator-service";

interface TranslatorWrapperProps {
}

const TranslatorWrapper: React.FC<TranslatorWrapperProps> = () => {
    const [selectedText, setSelectedText] = useState('');
    const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | null>(null);
    const [open, setOpen] = useState(false);
    const [translatedHTML, setTranslatedHTML] = useState('');
    const [isTranslating, setIsTranslating] = useState(false);
    const anchorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleMouseUp = (e: MouseEvent) => {
            const selection = window.getSelection();
            const text = selection?.toString().trim() || '';

            setOpen(false);
            setTranslatedHTML('');
            setSelectedText('');
            setAnchorPosition(null);

            if (text && selection) {
                const ranges = selection.getRangeAt(0);

                setSelectedText(text);
                const rect = ranges.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.bottom;
                setAnchorPosition({ x, y });
                setOpen(true);
            }
        };

        document.addEventListener('mouseup', handleMouseUp);
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, []);

    const handleTranslate = async () => {
        if (!selectedText) return;
        console.log(selectedText);
        setIsTranslating(true);
        try {
            const res = await TranslatorService.TranslateText(selectedText);
            if (!res.translated?.error) {
                if (res.translated.details) {
                    const html = renderTooltipHTML(res);
                    setTranslatedHTML(html);
                } else {
                    setTranslatedHTML(res.translated);
                }
            } else {
                setTranslatedHTML(selectedText);
            }
        } catch (err) {
            console.error(err);
            setTranslatedHTML(selectedText);
        } finally {
            setIsTranslating(false);
        }
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const renderTooltipHTML = (data: any) => {
        const posMap: { [key: string]: string } = {
            a: 'Tính từ', n: 'Danh từ', v: 'Động từ', r: 'Trạng từ',
            prep: 'Giới từ', conj: 'Liên từ', pron: 'Đại từ', int: 'Thán từ',
        };

        const details = data.translated?.details || {};
        const keys = Object.keys(details);
        let html = '<div>';

        keys.forEach((key) => {
            const d = details[key];
            html += `<div style="margin-bottom: 1rem;">`;
            html += `<strong style="text-decoration: underline;">${posMap[key] || key}</strong>`;
            html += `<div style="margin-top: 0.25rem; color: var(--admin-deep-orange-color)"><em>&rarr; ${d.definition}</em></div>`;

            if (d.examples?.length > 0) {
                html += `<div><strong>Ví dụ:</strong><ul>`;
                d.examples.forEach((ex: any) => html += `<li>${ex}</li>`);
                html += `</ul></div>`;
            }

            if (d.synonyms?.length > 0 || d.antonyms?.length > 0) {
                html += `<div>`;
                if (d.synonyms?.length > 0) html += `<div><strong>Đồng nghĩa:</strong> ${d.synonyms.join(', ')}</div>`;
                if (d.antonyms?.length > 0) html += `<div><strong>Trái nghĩa:</strong> ${d.antonyms.join(', ')}</div>`;
                html += `</div>`;
            }

            html += `</div>`;
        });

        html += `</div>`;
        return html;
    };

    return (<div ref={anchorRef}>
        {open && anchorPosition && (
            <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                    <Popper
                        open={open}
                        anchorEl={{
                            getBoundingClientRect: () =>
                                new DOMRect(anchorPosition.x, anchorPosition.y, 0, 0),
                            clientWidth: 0,
                            clientHeight: 0
                        } as any}
                        placement="bottom"
                        modifiers={[{ name: 'offset', options: { offset: [0, 8] } }]}
                        sx={{ zIndex: 999 }}
                    >
                        {!translatedHTML ? (
                            <Button
                                onClick={handleTranslate}
                                size="small"
                                variant="contained"
                                sx={{
                                    mt: '0.5rem',
                                    display: 'block',
                                    backgroundColor: 'var(--statistics-card-img-bg-blue)',
                                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: 'var(--purple-light)',
                                    },
                                    textTransform: 'none',
                                    borderRadius: '6px',
                                }}
                            >
                                {isTranslating ? 'Đang dịch...' : 'Dịch'}
                            </Button>

                        ) : (
                            <Box
                                sx={{
                                    backgroundColor: '#fff',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: '2px solid var(--grey-color)',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1);',
                                    maxWidth: 320,
                                    maxHeight: 360,
                                    overflowY: 'auto',
                                    zIndex: 99999,
                                }}
                            >
                                <div dangerouslySetInnerHTML={{ __html: translatedHTML }} />
                            </Box>
                        )}
                    </Popper>
                </div>
            </ClickAwayListener>
        )}
    </div>);
}

export default TranslatorWrapper;