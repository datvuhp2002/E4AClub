import { useState, useRef } from "react";
import Recorder from 'recorder-js';

const useSpeechRecognition = (
  onResult?: (text: string) => void,
  onEvaluate?: (audioURL: string) => void
) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const recorderRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const textRef = useRef("");

  const startListening = async () => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Trình duyệt không hỗ trợ Speech Recognition!");
      return;
    }

    // 🎙️ Start Speech Recognition
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.continuous = true;

    recognitionRef.current.onresult = (event: any) => {
      const speechText = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join(" ");
      textRef.current = speechText;
      setText(speechText);
    };

    recognitionRef.current.start();

    // 🎧 Start Recorder.js
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

    recorderRef.current = new Recorder(audioContextRef.current);
    await recorderRef.current.init(streamRef.current);
    recorderRef.current.start();

    setIsListening(true);
  };

  const stopListening = async () => {
    if (!isListening) return;
    setIsListening(false);

    // 🛑 Stop Speech Recognition
    recognitionRef.current?.stop();

    // 🛑 Stop Recording
    if (recorderRef.current) {
      const { blob } = await recorderRef.current.stop();
      streamRef.current?.getTracks().forEach((track) => track.stop());
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      onEvaluate?.(url);
    }

    onResult?.(textRef.current);
  };

  const resetAudio = () => {
    setAudioURL(null);
    setText("");
  };

  return {
    text,
    isListening,
    startListening,
    stopListening,
    resetAudio,
    audioURL,
  };
};

export default useSpeechRecognition;
