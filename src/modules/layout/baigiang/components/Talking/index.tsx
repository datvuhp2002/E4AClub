'use client';

import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import style from './Talking.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

interface TalkingProps {
    text: string;
    gender?: 'male' | 'female' | 'child' | 'elderly';
    classNames?: string;
    autoSpeak?: boolean;
    onStart?: () => void;
    onEnd?: () => void;
}

const Talking: React.FC<TalkingProps> = ({
    text,
    gender = 'male',
    classNames = '',
    autoSpeak = false,
    onStart,
    onEnd
}) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    // Load danh sách giọng nói
    useEffect(() => {
        const loadVoices = () => {
            const voicesList = speechSynthesis.getVoices();
            if (voicesList.length > 0) {
                setVoices(voicesList);
            } else {
                // Nếu chưa có giọng nào, thử lại sau một chút
                setTimeout(loadVoices, 100);
            }
        };

        loadVoices();
        if (typeof speechSynthesis.onvoiceschanged !== 'undefined') {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const selectVoice = () => {
        if (voices.length === 0) return null;

        // Chỉ lấy những voice có ngôn ngữ là tiếng Anh
        const englishVoices = voices.filter(v => v.lang.startsWith('en'));

        switch (gender) {
            case 'female':
                return (
                    englishVoices.find(v => /female|samantha|zira/i.test(v.name)) ||
                    englishVoices[0]
                );
            case 'child':
                return (
                    englishVoices.find(v => /child|kid|boy|girl/i.test(v.name)) ||
                    englishVoices[0]
                );
            case 'elderly':
                return (
                    englishVoices.find(v => /old|grand|elder|wise/i.test(v.name)) ||
                    englishVoices[0]
                );
            default: // male
                return (
                    englishVoices.find(v => /male|david|google us english/i.test(v.name)) ||
                    englishVoices[0]
                );
        }
    };

    const speak = React.useMemo(() => {
        return () => {
            if (!text) return;

            const utterance = new SpeechSynthesisUtterance(text);
            const selectedVoice = selectVoice();

            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            utterance.lang = 'en-US';
            utterance.pitch = 1;
            utterance.rate = 1;

            utterance.onstart = () => onStart?.();
            utterance.onend = () => onEnd?.();

            speechSynthesis.speak(utterance);
        };
    }, [text, voices]);

    useEffect(() => {
        if (autoSpeak && voices.length > 0) {
            speak();
        }
    }, [autoSpeak, voices]);

    return (
        <div>
            <button className={cx('wrapper', classNames)} onClick={speak}>
                <FontAwesomeIcon icon={faVolumeHigh} />
            </button>
        </div>
    );
};

export default Talking;
