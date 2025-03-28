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
    const [isActive, setIsActive] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [highlightedText, setHighlightedText] = useState<JSX.Element | null>(null);

    const normalizeText = (str: string) => {
        return str.toLowerCase().replace(/[.,!?;:"'()]/g, '');
    };

    const calculateScore = async () => {
        const dmp = new DiffMatchPatch();
        const normalizeTextForDiff = (str: string) => {
            return str.toLowerCase().replace(/[.,!?;:"'()]/g, '').replace(/\s+/g, ' ').trim();
        };

        const normalizedCorrectText = normalizeTextForDiff(question);
        const normalizedText = normalizeTextForDiff(text);
        const diffsNormalized = dmp.diff_main(normalizedCorrectText, normalizedText);
        dmp.diff_cleanupSemantic(diffsNormalized);

        let equalLength = 0;
        diffsNormalized.forEach(([op, segment]: any) => {
            if (op === 0) equalLength += segment.length;
        });

        const similarity = (equalLength / normalizedCorrectText.length) * 100;
        setScore(Math.round(similarity));

        const diffsOriginal = dmp.diff_main(question.toLowerCase(), text.toLowerCase());
        dmp.diff_cleanupSemantic(diffsOriginal);

        setHighlightedText(
            <>
                {diffsOriginal.map(([op, segment]: any, index: number) => (
                    <span
                        key={index}
                        style={{
                            color: op === -1 ? 'red' : 'black',
                            textDecoration: op === 1 ? 'underline' : 'none',
                        }}
                    >
                        {segment}
                    </span>
                ))}
            </>
        );
    };

    const handleToggleListening = () => {
        if (isActive) {
            calculateScore();
        } else {
            startListening();
        }
        setIsActive(!isActive);
    };

    const getColorForScore = (score: number | null) => {
        if (score == null) return '#D3D3D3';
        if (score <= 50) return '#FF4D4D';
        if (score < 80) return '#FFC107';
        return '#28A745';
    };

    const dynamicStyles = {
        '--progress': score ? score : 0,
        '--color-rate': getColorForScore(score),
    } as React.CSSProperties;

    return (
        <div className={cx('wrapper')}>
            <h1 className="text-2xl font-bold mb-4">Chấm điểm phát âm</h1>

            <div className={cx('wrapper-body')} style={dynamicStyles}>
                <div className={cx('wrapper-body-rate')}>
                    <svg viewBox="0 0 50 50">
                        <circle cx="25" cy="25" r="20" />
                    </svg>
                    <p>{score ?? 0}</p>
                </div>

                <div className={cx('wrapper-body-voice')}>
                    <button onClick={handleToggleListening} className={cx('wrapper-body-voice-button')}>
                        {isActive ? '🛑' : '🎤'}
                    </button>
                    <p className={cx('wrapper-body-voice-text')}>{score !== null ? highlightedText : question}</p>
                </div>
            </div>
        </div>
    );
};

export default Speaking;
