import { useState, useRef, useEffect } from "react";

const useSpeechRecognition = (
  onResult?: (text: string) => void,
  onEvaluate?: (audioURL: string) => void
) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  const startListening = async () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Trình duyệt không hỗ trợ Speech Recognition!");
      return;
    }

    streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(streamRef.current);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.start();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.continuous = true; // 👈 giữ nhận diện liên tục

    recognitionRef.current.onresult = (event: any) => {
      const speechText = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");
      setText(speechText);
    };

    recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (!isListening) return;

    setIsListening(false);

    // Stop recognition
    recognitionRef.current?.stop();

    // Stop recording
    mediaRecorderRef.current?.stop();

    // Stop audio stream
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    // Tạo audioURL khi recording stop
    mediaRecorderRef.current!.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
      onEvaluate?.(url);
      onResult?.(text); // 👈 gửi text tại thời điểm stop
    };
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
