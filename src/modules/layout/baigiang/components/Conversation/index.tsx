'use client';

import React, { useRef, useEffect, useState } from 'react';
import SentenceWrapper from '@/modules/layout/baigiang/components/SentenceWrapper';
import Talking from '@/modules/layout/baigiang/components/Talking';
import style from './Conversation.module.scss';
import classNames from 'classnames/bind';
import { ManPersonSVG } from '@/modules/common/components/IconSVG/IconSVG';
import Speaking from '@/modules/layout/baigiang/components/Speaking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamation, faTimes } from '@fortawesome/free-solid-svg-icons';
import CourseServices from '@/services/course-services';

const cx = classNames.bind(style);

const getScoreMessage = (score: number) => {
    if (score >= 90) {
        return {
            message: "Phát âm rất tốt, giữ vững phong độ!",
            primary: "#58a700",
            background: "#d7ffb8",
            icon: faCheck
        };
    } else if (score >= 80) {
        return {
            message: "Phát âm khá tốt, cố gắng thêm chút nữa nhé!",
            primary: "#58a700",
            background: "#d7ffb8",
            icon: faCheck
        };
    } else if (score >= 50 && score < 80) {
        return {
            message: "Một số âm chưa chuẩn. Cứ tiếp tục luyện nhé!",
            primary: "#ffa500",
            background: "#ffe5b4",
            icon: faExclamation
        };
    } else {
        return {
            message: "Nhiều lỗi phát âm. Luyện từng câu ngắn sẽ hiệu quả hơn!",
            primary: "#ff0000",
            background: "#ffcccc",
            icon: faTimes
        };
    }
};

interface ConversationProps {
    data: IExercise;
    exerciseId: string;
}

const Conversation: React.FC<ConversationProps> = ({exerciseId, data }) => {
    const wrapperMainRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scores, setScores] = useState<{ index: number; score: number }[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const [totalScore, setTotalScore] = useState<number | null>(null);
    const [isStarted, setIsStarted] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const conversation = data.conversation.parsedScript ?? [];

    useEffect(() => {
        setIsStarted(false);
        setCurrentIndex(0);
        setScores([]);
        setTotalScore(null);
    }, [exerciseId]);

    useEffect(() => {
        if (wrapperMainRef.current) {
            wrapperMainRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        }
    }, []);

    useEffect(() => {
        if (wrapperMainRef.current) {
            const container = wrapperMainRef.current;
            container.scrollTop = container.scrollHeight;
        }

        if (currentIndex === conversation.length - 1) {
            setIsFinished(true);
        }
    }, [currentIndex]);

    const handleSentenceComplete = (index: number, score: number = 0) => {
        setScores(prev => [...prev, { index, score }]);
    };

    const handleFinalSubmit = () => {
        const totalScore = (scores.reduce((sum, s) => sum + s.score, 0) / scores.length) || 0;
        setTotalScore(totalScore);

        CourseServices.UpdateProgressExercise({
            exercise: exerciseId,
            answers: [`${data.question}`],
            score: totalScore
        });
    };

    const startConversation = () => {
        setIsStarted(true);
    };

    const handleSpeakStart = () => {
        setIsSpeaking(true);
    };

    const handleSpeakEnd = () => {
        setIsSpeaking(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-title')}>
                <div className={cx('wrapper-title-person')}>
                    <ManPersonSVG />
                    <div className={cx('wrapper-title-person-mouth', { talking: isSpeaking })}></div>
                </div>
                <div className='d-flex align-items-center'>
                    <Talking classNames='mt-1' text={data.question} gender='male' onStart={handleSpeakStart} onEnd={handleSpeakEnd} />
                    <SentenceWrapper className={cx('wrapper-title-name')} text={data.question}></SentenceWrapper>
                </div>
            </div>

            <div className={cx('wrapper-main')} ref={wrapperMainRef}>
                {isStarted && (
                    <>
                        {
                            conversation.map((item, index) => {
                                const isUser = item.speaker === "Customer";
                                const isVisible = index <= currentIndex;

                                if (!isVisible) return null;

                                return (
                                    <div key={index} className={cx('wrapper-item', isUser ? 'wrapper-item-right' : 'wrapper-item-left')}>
                                        {isUser ? (
                                            <Speaking
                                                talking
                                                question={item.text}
                                                onScoreChange={(score) => handleSentenceComplete(index, score)}
                                            />
                                        ) : (
                                            <>
                                                <Talking text={item.text} gender='male' onStart={handleSpeakStart} onEnd={handleSpeakEnd} autoSpeak />
                                                <SentenceWrapper text={item.text} />
                                            </>
                                        )}
                                    </div>
                                );
                            })
                        }
                    </>
                )}
            </div>


            <div className={cx('wrapper-score')}>
                {totalScore != null && (() => {
                    const { message, primary, background, icon } = getScoreMessage(totalScore);
                    return (
                        <div className={cx('wrapper-score-result')} style={{
                            '--score-color': primary,
                            '--score-background': background
                        } as React.CSSProperties}>
                            <FontAwesomeIcon icon={icon} />
                            <div className={cx('wrapper-score-result-main')}>
                                <h6>{totalScore} điểm</h6>
                                <p className='mb-0'>{message}</p>
                            </div>
                        </div>
                    );
                })()}
                <button className={cx('wrapper-score-btn', { 'continue-button': !isFinished })} onClick={isStarted ? (isFinished ? handleFinalSubmit : () => setCurrentIndex(currentIndex + 1)) : startConversation}>
                    {isStarted ? (isFinished ? 'Chấm điểm' : 'Tiếp tục') : 'Bắt đầu'}
                </button>
            </div>
        </div>
    );
};

export default Conversation;
