import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  let recognition: SpeechRecognition | null = null;

  const startListening = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Trình duyệt không hỗ trợ Speech Recognition!");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.lang = "en-US"; // Nhận diện giọng Anh Mỹ
    recognition.interimResults = false;
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const speechText = event.results[0][0].transcript;
      setText(speechText);
    };

    recognition.onend = () => setIsListening(false);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  // 📌 Sử dụng react-media-recorder để thu âm giọng nói
  const { startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
    });

  return {
    text,
    isListening,
    startListening,
    stopListening,
    startRecording,
    stopRecording,
    mediaBlobUrl, // URL của file ghi âm
  };
};

export default useSpeechRecognition;
