'use client';

import { useState } from 'react';
import DiffMatchPatch from 'diff-match-patch';
import useSpeechRecognition from '@/modules/common/components/useSpeechRecognition';
import classNames from 'classnames/bind';
import styles from './Speaking.module.scss';

const cx = classNames.bind(styles);

interface SpeakingProps {
    question: string;
}

const Speaking: React.FC<SpeakingProps> = ({ question }) => {
    const { text, isListening, startListening } = useSpeechRecognition();
    const [isActive, setIsActive] = useState(false); // Thêm state để kiểm soát trạng thái nghe
    const [score, setScore] = useState<number | null>(null);
    const [highlightedText, setHighlightedText] = useState<JSX.Element | null>(null);

    const normalizeText = (str: string) => {
        return str.toLowerCase().replace(/[.,!?;:"'()]/g, ''); // Bỏ dấu câu
    };

    const calculateScore = async () => {
        const dmp = new DiffMatchPatch();
    
        // Hàm chuẩn hóa văn bản để so sánh
        const normalizeTextForDiff = (str: string) => {
            return str
                .toLowerCase()
                .replace(/[.,!?;:"'()]/g, "") // Bỏ dấu câu
                .replace(/\s+/g, " ") // Bỏ khoảng trắng thừa
                .trim();
        };
    
        // 1️⃣ Chuẩn hóa văn bản
        const normalizedCorrectText = normalizeTextForDiff(question);
        const normalizedText = normalizeTextForDiff(text);
    
        // 2️⃣ Tạo diff trên văn bản chuẩn hóa
        const diffsNormalized = dmp.diff_main(normalizedCorrectText, normalizedText);
        dmp.diff_cleanupSemantic(diffsNormalized);
    
        let equalLength = 0;
        diffsNormalized.forEach((diff: any) => {
            const [op, segment] = diff;
            if (op === 0) equalLength += segment.length;
        });
    
        // 3️⃣ Tính điểm chính xác
        const similarity = (equalLength / normalizedCorrectText.length) * 100;
        setScore(Math.round(similarity));
    
        // 4️⃣ **So sánh trên văn bản gốc**
        const diffsOriginal = dmp.diff_main(question.toLowerCase(), text.toLowerCase());
        dmp.diff_cleanupSemantic(diffsOriginal);
        console.log(diffsOriginal);
        console.log(text);
    
        setHighlightedText(
            <>
                {diffsOriginal.map((diff: any, index: number) => {
                    const [op, segment] = diff;
                    const cleanedSegment = segment.replace(/\s+/g, "").replace(/[.,!?;:"'()]/g, ""); // Bỏ khoảng trắng và dấu câu
    
                    // Nếu phần khác biệt chỉ chứa khoảng trắng hoặc dấu câu, không highlight
                    if (!/[a-zA-Z0-9]/.test(cleanedSegment)) {
                        return <span key={index}>{segment}</span>;
                    }
    
                    return (
                        <span
                            key={index}
                            style={{
                                color: op === -1 ? "red" : "black", // Highlight nếu là từ bị thiếu
                                textDecoration: op === 1 ? "underline" : "none", // Gạch chân nếu là từ thêm vào
                            }}
                        >
                            {segment}
                        </span>
                    );
                })}
            </>
        );
    };        

    // Hàm bật/tắt nghe
    const handleToggleListening = () => {
        if (isActive) {
            calculateScore(); // Sau khi dừng nghe, tiến hành chấm điểm
        } else {
            startListening();
        }
        setIsActive(!isActive); // Cập nhật trạng thái
    };

    const getColorForScore = (score: number | null) => {
        if (score == null) return '#D3D3D3';
        if (score <= 50) return '#FF4D4D';
        if (score < 80) return '#FFC107';
        return '#28A745';
    };

    // Áp dụng vào style
    const dynamicStyles = {
        '--progress': score ? score : 0,
        '--color-rate': getColorForScore(score)
    } as React.CSSProperties;

    return (
        <div className={cx('wrapper')}>
            <h1 className="text-2xl font-bold mb-4">Chấm điểm phát âm tiếng Anh</h1>

            <div className={cx('wrapper-body')} style={dynamicStyles}>
                <div className={cx('wrapper-body-rate')}>
                    <svg viewBox="0 0 50 50">
                        <circle cx="25" cy="25" r="20" />
                    </svg>
                    <p>{score ? score : 0}</p>
                </div>

                <div className={cx('wrapper-body-voice')}>
                    <button onClick={handleToggleListening} className={cx('wrapper-body-voice-button')}>
                        {isActive ? (
                            <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill="#fff"
                                    d="m400 32h-352c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-352c0-26.5-21.5-48-48-48z"
                                />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path
                                    fill="#fff"
                                    d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
                                />
                            </svg>
                        )}
                    </button>
                    <p className={cx('wrapper-body-voice-text')}>{score !== null ? highlightedText : question}</p>
                </div>
            </div>
        </div>
    );
};

export default Speaking;
