import { useState } from "react";

type SpeechRecognition = {
  new (): {
    lang: string;
    interimResults: boolean;
    start: () => void;
    stop: () => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: { error: string }) => void;
    onstart: () => void;
    onend: () => void;
  };
};

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognition;
    webkitSpeechRecognition: SpeechRecognition;
  }
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item: (index: number) => SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  item: (index: number) => SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

const SpeechToText = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSpeech = () => {
    const recognition = new (window.SpeechRecognition ||
      (window as any).webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognition.onerror = (event) =>
      console.error("Speech recognition error:", event.error);

    recognition.start();
  };

  return (
    <div>
      <button onClick={handleSpeech} disabled={isListening}>
        {isListening ? "Listening..." : "Start Speaking"}
      </button>
      <p>Recognized Text: {text}</p>
    </div>
  );
};

export default SpeechToText;
