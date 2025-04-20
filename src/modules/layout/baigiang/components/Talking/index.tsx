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

const Talking: React.FC<TalkingProps> = ({ text, gender = 'male', classNames = '', autoSpeak = false, onStart, onEnd }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    // Load danh sách giọng khi component mount
    useEffect(() => {
        const loadVoices = () => {
            const voicesList = speechSynthesis.getVoices();
            setVoices(voicesList);
        };

        loadVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const selectVoice = () => {
        if (voices.length === 0) return null;

        switch (gender) {
            case 'female':
                return voices.find(v => /female|samantha|zira/i.test(v.name));
            case 'child':
                return voices.find(v => /child|kid|boy|girl/i.test(v.name));
            case 'elderly':
                return voices.find(v => /old|grand|elder|wise/i.test(v.name));
            default: // male
                return voices.find(v => /male|david|google us english/i.test(v.name));
        }
    };

    const speak = React.useMemo(() => {
        return () => {
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
    }, [text]);

    useEffect(() => {
        if (autoSpeak) {
            speak();
        }
    }, [autoSpeak]);

    return (
        <div>
            <button className={cx('wrapper', classNames)} onClick={speak}><FontAwesomeIcon icon={faVolumeHigh} /></button>
        </div>
    );
};

export default Talking;
