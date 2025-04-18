'use client';

import React, { useRef, useEffect, useState } from 'react';
import SentenceWrapper from '@/modules/layout/baigiang/components/SentenceWrapper';
import Talking from '@/modules/layout/baigiang/components/Talking';
import style from './GioiThieu.module.scss';
import classNames from 'classnames/bind';
import { ManPersonSVG, SmileFace, SurpriseFace } from '@/modules/common/components/IconSVG/IconSVG';
import Speaking from '@/modules/layout/baigiang/components/Speaking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

const fakeData = {
    "success": true,
    "exercise": {
        "conversation": {
            "role": "Customer",
            "script": [
                {
                    "speaker": "Police",
                    "text": "Sorry sir! I noticed you have broken the speed limit, can I see your driver's license and passport?",
                    "_id": "1"
                },
                {
                    "speaker": "Customer",
                    "text": "Ah yeah, can you give me a moment to find it? There it is, here you go Mr. Officer.",
                    "_id": "2"
                },
                {
                    "speaker": "Police",
                    "text": "Okay, all done you're through.",
                    "_id": "3"
                },
                {
                    "speaker": "Police",
                    "text": "Do you know how fast you were driving?",
                    "_id": "4"
                },
                {
                    "speaker": "Customer",
                    "text": "No, sorry. It's a rental car. I'm not used to it.",
                    "_id": "5"
                },
                {
                    "speaker": "Police",
                    "text": "Have you been drinking tonight, Mr. Johnson?",
                    "_id": "6"
                },
                {
                    "speaker": "Customer",
                    "text": "I had one or two drinks. I'm okay to drive, though. I know my limit.",
                    "_id": "7"
                },
                {
                    "speaker": "Police",
                    "text": "How long have you been in Viet Nam?",
                    "_id": "8"
                },
                {
                    "speaker": "Customer",
                    "text": "A few weeks, why?",
                    "_id": "9"
                },
                {
                    "speaker": "Police",
                    "text": "It seems you are unaware of our zero tolerance for drinking and driving.",
                    "_id": "10"
                },
                {
                    "speaker": "Customer",
                    "text": "I'm not drunk. I'll blow into a breathalyzer.",
                    "_id": "11"
                },
                {
                    "speaker": "Police",
                    "text": "Sorry sir, according to our country's regulations, you are not allowed to operate any vehicle after consuming alcohol.",
                    "_id": "12"
                },
                {
                    "speaker": "Customer",
                    "text": "Oh I'm sorry, I am totally unaware of that.",
                    "_id": "13"
                },
                {
                    "speaker": "Police",
                    "text": "You were also going over the speed limit, Mr. Johnson. I will have to ask you to step out of your vehicle and get into my car.",
                    "_id": "14"
                },
                {
                    "speaker": "Customer",
                    "text": "But what about my car?",
                    "_id": "15"
                },
                {
                    "speaker": "Police",
                    "text": "We'll have the rental car towed to the agency. When you're in our country you have to respect our rules.",
                    "_id": "16"
                }
            ]
        },
        "_id": "67fbe8000324299a951ebc25",
        "sectionId": "6766f4c33844124af27a06cd",
        "type": "conversation",
        "question": "Traffic and traffic occurrences when encountering foreigners",
        "options": [],
        "createdAt": "2025-04-13T16:36:16.149Z",
        "updatedAt": "2025-04-13T16:36:16.149Z",
        "__v": 0
    }
}

const Page = () => {
    const wrapperMainRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scores, setScores] = useState<{ index: number; score: number }[]>([]);
    const [isFinished, setIsFinished] = useState(false);

    const conversation = fakeData.exercise.conversation.script;

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
    }, [currentIndex]);

    const handleSentenceComplete = (index: number, score: number) => {
        // Chấm điểm và lưu lại
        setScores(prev => [...prev, { index, score }]);
    };

    useEffect(() => {
        if (currentIndex === conversation.length - 1) {
            setIsFinished(true);
        }
    }, [currentIndex]);

    const handleFinalSubmit = () => {
        const totalScore = scores.reduce((sum, s) => sum + s.score, 0) / scores.length;
        console.log('Gửi điểm:', scores, 'Tổng điểm:', totalScore);

        // Gửi request API ở đây nếu cần
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-title')}>
                <div className={cx('wrapper-title-person')}>
                    <ManPersonSVG />
                </div>
                <SentenceWrapper className={cx('wrapper-title-name')} text={fakeData.exercise.question}></SentenceWrapper>

            </div>

            <div className={cx('wrapper-main')} ref={wrapperMainRef}>

                {conversation.map((item, index) => {
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
                                // disabled={index !== currentIndex}
                                />
                            ) : (
                                <>
                                    <Talking text={item.text} gender='male' />
                                    <SentenceWrapper text={item.text} />
                                </>
                            )}
                        </div>
                    );
                })}

                {/* <div className={cx('wrapper-item', 'wrapper-item-left')}>
                    <Talking text="Sorry sir! I noticed you have broken the speed limit, can I see your driver's license and passport?" gender='male' />
                    <SentenceWrapper text="Sorry sir! I noticed you have broken the speed limit, can I see your driver's license and passport?"></SentenceWrapper>
                </div>
                <div className={cx('wrapper-item', 'wrapper-item-right')}>
                    <Speaking key='1' talking question="Ah yeah, can you give me a moment to find it? There it is, here you go Mr. Officer." />
                </div>
                <div className={cx('wrapper-item', 'wrapper-item-left')}>
                    <Talking text="Okay, all done you're through. Do you know how fast you were driving?" gender='male' />
                    <SentenceWrapper text="Okay, all done you're through. Do you know how fast you were driving?"></SentenceWrapper>
                </div>
                <div className={cx('wrapper-item', 'wrapper-item-right')}>
                    <Speaking key='2' talking question="No, sorry. It's a rental car. I'm not used to it." />
                </div>
                <div className={cx('wrapper-item', 'wrapper-item-left')}>
                    <Talking text="Have you been drinking tonight, Mr. Johnson?" gender='male' />
                    <SentenceWrapper text="Have you been drinking tonight, Mr. Johnson?"></SentenceWrapper>
                </div>
                <div className={cx('wrapper-item', 'wrapper-item-right')}>
                    <Speaking key='3' talking question="I had one or two drinks. I'm okay to drive, though. I know my limit." />
                </div> */}
            </div>

            <div className={cx('wrapper-score')}>
                <div className={cx('wrapper-score-result')}>
                    <FontAwesomeIcon icon={faCheck} />
                    <div className={cx('wrapper-score-result-main')}>
                        <h6>90 điểm</h6>
                        <p className='mb-0'>Điểm số thật ấn tượng</p>
                    </div>
                </div>
                <button className={cx('wrapper-score-btn', { 'continue-button': !isFinished })} onClick={isFinished ? handleFinalSubmit : () => setCurrentIndex(currentIndex + 1)}>
                    {isFinished ? 'Chấm điểm' : 'Tiếp tục'}
                </button>
            </div>
        </div>
    );
};

export default Page;
