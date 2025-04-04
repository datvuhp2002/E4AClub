import { useState, useRef } from "react";

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

    streamRef.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    mediaRecorderRef.current = new MediaRecorder(streamRef.current);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
      onEvaluate?.(url);

      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };

    mediaRecorderRef.current.start();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.start();
    setIsListening(true);

    recognitionRef.current.onresult = (event: any) => {
      const speechText = event.results[0][0].transcript;
      setText(speechText);
      onResult?.(speechText);
    };

    recognitionRef.current.onend = () => {
      stopListening();
    };
  };

  const stopListening = () => {
    if (isListening) {
      setIsListening(false);
      recognitionRef.current?.stop();
      mediaRecorderRef.current?.stop();
    }
  };

  return { text, isListening, startListening, stopListening, audioURL };
};

export default useSpeechRecognition;
