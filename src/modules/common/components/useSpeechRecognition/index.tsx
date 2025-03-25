import { useState } from "react";

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

  return { text, isListening, startListening, stopListening };
};

export default useSpeechRecognition;
