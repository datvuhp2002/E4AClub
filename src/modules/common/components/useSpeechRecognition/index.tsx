import { useState, useRef } from "react";

const useSpeechRecognition = (onResult?: (text: string) => void) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null); // Lưu stream để tắt khi kết thúc

  const startListening = async () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Trình duyệt không hỗ trợ Speech Recognition!");
      return;
    }

    // Yêu cầu quyền truy cập microphone
    streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(streamRef.current);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);

      // 🔴 Dừng tất cả các track của microphone (tắt biểu tượng thu âm)
      streamRef.current?.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    };

    mediaRecorderRef.current.start();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition() as any;

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const speechText = event.results[0][0].transcript;
      setText(speechText);
      onResult?.(speechText);
    };

    recognition.onend = () => {
      setIsListening(false);
      mediaRecorderRef.current?.stop(); // Dừng ghi âm khi nhận diện xong
      recognition.stop(); // Đảm bảo dừng hẳn nhận diện giọng nói
    };
  };

  return { text, isListening, startListening, audioURL };
};

export default useSpeechRecognition;
