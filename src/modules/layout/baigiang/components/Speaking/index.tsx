'use client';

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

import { SoundIcon, VoiceIcon } from '@/modules/common/components/IconSVG/IconSVG';
import useSpeechRecognition from '@/modules/common/components/useSpeechRecognition';
import CourseServices from '@/services/course-services';
import SentenceWrapper from '../SentenceWrapper';
import styles from './Speaking.module.scss';

const cx = classNames.bind(styles);

interface SpeakingProps {
    question: string;
    exerciseId?: string;
    talking?: boolean;
    className?: string;
    onScoreChange?: (score: number) => void;
}

const Speaking: React.FC<SpeakingProps> = ({ question, exerciseId, talking, className = "", onScoreChange }) => {
    const [score, setScore] = useState<number | null>(null);
    const [highlightedText, setHighlightedText] = useState<JSX.Element | null>(null);

    const calculateScore = async (inputText: string) => {
        console.log(inputText)
        // Hàm loại bỏ dấu câu và tách câu thành từ + lưu vị trí dấu câu
        const splitTextWithPunctuation = (text: string) => {
            const words = [];
            const punctuations = [];
            const regex = /(\w+)|([^\w\s])/g; // Bắt cả từ và dấu câu
            let match;
            let index = 0;

            while ((match = regex.exec(text)) !== null) {
                if (match[1]) {
                    words.push({ index, value: match[1] });
                } else if (match[2]) {
                    punctuations.push({ index, value: match[2] });
                }
                index++;
            }

            return { words, punctuations };
        };

        // Tách `question` và `inputText`
        const questionData = splitTextWithPunctuation(question);
        const inputData = splitTextWithPunctuation(inputText.toLowerCase());

        // So sánh từ theo vị trí
        let incorrectIndexes = new Set<number>();
        let correctCount = 0;

        questionData.words.forEach((qWord, i) => {
            if (inputData.words[i] && qWord.value.toLowerCase() === inputData.words[i].value) {
                correctCount++;
            } else {
                incorrectIndexes.add(qWord.index); // Đánh dấu từ sai
            }
        });

        // Tính điểm
        const totalWords = questionData.words.length;
        const similarity = (1 - incorrectIndexes.size / totalWords) * 100;
        const roundedScore = Math.round(similarity);
        setScore(roundedScore);

        if (onScoreChange) {
            onScoreChange(roundedScore);
        }

        // chỉ tự gửi điểm đi với type default
        if (!talking && exerciseId != null) {
            CourseServices.UpdateProgressExercise({
                exercise: exerciseId,
                answers: [`${inputText}`],
                score: roundedScore
            });
        }

        // Tạo highlight text với khoảng trắng trước các từ không phải từ đầu tiên
        const highlightedText = questionData.words.map((word, i) => {
            const isIncorrect = incorrectIndexes.has(word.index);
            return (
                <span key={i} style={{ color: isIncorrect ? 'red' : 'black' }}>
                    {i > 0 && ' '}
                    {word.value}
                </span>
            );
        });

        // Chèn dấu câu vào vị trí ban đầu
        questionData.punctuations.forEach((punc) => {
            highlightedText.splice(
                punc.index,
                0,
                <span key={`p-${punc.index}`} style={{ color: 'black' }}>
                    {punc.value}
                </span>
            );
        });

        setHighlightedText(<>{highlightedText}</>);
    };

    const { isListening, startListening, stopListening, resetAudio, audioURL } = useSpeechRecognition(calculateScore);

    useEffect(() => {
        setScore(null);
        setHighlightedText(null);
        resetAudio();
    }, [exerciseId, question])

    const handlePlayAudio = () => {
        if (audioURL) {
            const audio = new Audio(audioURL);
            audio.play();
        }
    };

    const classes = cx('wrapper', {
        [className]: className,
        talking
    });

    return (
        <div className={classes}>
            <h1 className="text-2xl font-bold mb-4">Chấm điểm phát âm tiếng Anh</h1>

            <div
                className={cx('wrapper-body')}
                style={
                    {
                        '--progress': score || 0,
                        '--color-rate': score
                            ? score < 50
                                ? '#FF4D4D'
                                : score < 80
                                    ? '#FFC107'
                                    : '#28A745'
                            : '#D3D3D3'
                    } as React.CSSProperties
                }
            >
                <div className={cx('wrapper-body-rate')}>
                    <svg viewBox="0 0 50 50">
                        <circle cx="25" cy="25" r="20" />
                    </svg>
                    <p>{score || 0}</p>
                </div>

                <div className={cx('wrapper-body-voice')}>
                    {isListening ? (
                        <button onClick={stopListening} className={cx('wrapper-body-voice-button')}>
                            <SoundIcon width={40} height={40} color="white" />
                        </button>
                    ) : (
                        <button onClick={startListening} className={cx('wrapper-body-voice-button')}>
                            <VoiceIcon color="white" />
                        </button>
                    )}
                    <button
                        className={cx('wrapper-body-voice-replay-btn')}
                        onClick={handlePlayAudio}
                        disabled={!audioURL}
                    >
                        <FontAwesomeIcon icon={faVolumeHigh} />
                    </button>
                    <div className={cx('wrapper-body-voice-text')}>
                        <SentenceWrapper text={question}>
                            {score !== null ? highlightedText : question}
                        </SentenceWrapper>
                    </div>
                    {/* <p className={cx('wrapper-body-voice-text')}>{score !== null ? highlightedText : question}</p> */}
                </div>
            </div>
        </div>
    );
};

export default Speaking;
