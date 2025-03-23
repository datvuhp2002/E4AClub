import { useState } from "react";

const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Trình duyệt không hỗ trợ Speech Recognition!");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition() as any; // Ép kiểu tránh lỗi TypeScript

    recognition.lang = "en-US"; // Nhận diện giọng Anh Mỹ
    recognition.interimResults = false;
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const speechText = event.results[0][0].transcript;
      setText(speechText);
    };

    recognition.onend = () => setIsListening(false);
  };

  return { text, isListening, startListening };
};

export default useSpeechRecognition;
