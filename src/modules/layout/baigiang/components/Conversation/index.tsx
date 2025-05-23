'use client';

import React, { useRef, useEffect, useState } from 'react';
import SentenceWrapper from '@/modules/layout/baigiang/components/SentenceWrapper';
import Talking from '@/modules/layout/baigiang/components/Talking';
import style from './Conversation.module.scss';
import classNames from 'classnames/bind';
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

const Conversation: React.FC<ConversationProps> = ({ exerciseId, data }) => {
    const wrapperMainRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scores, setScores] = useState<{ index: number; score: number }[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const [totalScore, setTotalScore] = useState<number | null>(null);
    const [isStarted, setIsStarted] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const conversation = data.conversation.parsedScript ?? [];

    useEffect(() => {
        const updatedScores: { index: number; score: number }[] = conversation
            .map((item, index) => {
                if (data.conversation.role ? item.speaker.toLowerCase() === data.conversation.role.toLowerCase() : false) {
                    return { index, score: 0 };
                }
                return null;
            })
            .filter((item): item is { index: number; score: number } => item !== null);

        setIsStarted(false);
        setCurrentIndex(0);
        setTotalScore(null);
        setScores(updatedScores);
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

            const rect = wrapperMainRef.current.getBoundingClientRect();
            const absoluteY = window.scrollY + rect.top;

            window.scrollTo({
                top: absoluteY - (window.innerHeight - wrapperMainRef.current.offsetHeight) + 80, // cách bottom 80px
                behavior: 'smooth'
            });
        }

        if (currentIndex === conversation.length - 1) {
            setIsFinished(true);
        }
    }, [currentIndex]);

    const handleSentenceComplete = (index: number, score: number = 0) => {
        setScores(prev => {
            const existingIndex = prev.findIndex(item => item.index === index);

            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex] = { index, score };
                return updated;
            }

            return [...prev, { index, score }];
        });
    };

    const handleFinalSubmit = () => {
        const totalScore = Math.round((scores.reduce((sum, s) => sum + s.score, 0) / scores.length) || 0);
        setTotalScore(totalScore);
        console.log(scores);

        CourseServices.UpdateProgressExercise({
            exercise: exerciseId,
            answers: [`${data.question}`],
            score: totalScore
        });

        // kéo xuống để xem điểm
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
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
                    <img src={`${process.env.FILE_URL}/svg/person_suit.svg`} alt="User Avatar" />
                    <div className={cx('wrapper-title-person-mouth', { talking: isSpeaking })}></div>
                </div>
                <div className={cx('wrapper-title-name')}>
                    <p className='mb-0'>{data.question}</p>
                    <button className={cx('wrapper-score-btn', { 'continue-button': !isFinished })} onClick={isStarted ? (isFinished ? handleFinalSubmit : () => setCurrentIndex(currentIndex + 1)) : startConversation}>
                        {isStarted ? (isFinished ? 'Chấm điểm' : 'Tiếp tục') : 'Bắt đầu'}
                    </button>
                </div>
            </div>

            <div className={cx('wrapper-main')} ref={wrapperMainRef}>
                {isStarted && (
                    <>
                        {
                            conversation.map((item, index) => {
                                const isUser = data.conversation.role ? item.speaker.toLowerCase() === data.conversation.role.toLowerCase() : false;
                                const isVisible = index <= currentIndex;

                                if (!isVisible) return null;

                                return (
                                    <div key={index} className={cx('wrapper-item', isUser ? 'wrapper-item-right' : 'wrapper-item-left')}>
                                        {isUser ? (
                                            <Speaking
                                                talking
                                                question={item.text}
                                                onScoreChange={(score) => handleSentenceComplete(index, score)}
                                                onCompleted={() => {
                                                    setCurrentIndex(currentIndex + 1);
                                                }}
                                            />
                                        ) : (
                                            <>
                                                <Talking text={item.text} gender='male' onStart={handleSpeakStart} onEnd={handleSpeakEnd} autoSpeak />
                                                {/* <SentenceWrapper text={item.text} /> */}
                                                <p className='mb-0'>{item.text}</p>
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
            </div>
        </div>
    );
};

export default Conversation;
