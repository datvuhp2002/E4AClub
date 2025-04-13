'use client';

import React, { useEffect, useState } from 'react';

interface TalkingProps {
  text: string;
  gender?: 'male' | 'female' | 'child' | 'elderly';
}

const Talking: React.FC<TalkingProps> = ({ text, gender = 'male' }) => {
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

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = selectVoice();

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.lang = 'en-US';
    utterance.pitch = 1;
    utterance.rate = 1;

    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <button onClick={speak}>Nói</button>
    </div>
  );
};

export default Talking;
