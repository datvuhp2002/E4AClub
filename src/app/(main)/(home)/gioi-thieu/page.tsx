'use client';

import { useEffect, useState } from 'react';
import * as Vosk from 'vosk-browser'; // import * toàn bộ

export default function SpeechRecognizer() {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognizer, setRecognizer] = useState<any>(null);
  const [audioContext, setAudioContext] = useState<any>(null);
  const [source, setSource] = useState<any>(null);

  const initRecognizer = async () => {
    const model = await Vosk.createModel('/model/vosk-model-small-en-us-0.15.tar.gz');
    const rec = new model.KaldiRecognizer(16000);
    rec.on('result', (message: any) => {
      console.log('Result:', message.result.text);
      setText((prev) => prev + ' ' + message.result.text);
    });
    rec.on('partialresult', (message: any) => {
      console.log('Partial:', message.result.partial);
    });
    setRecognizer(rec);
  };

  const startListening = async () => {
    if (!recognizer) return;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        channelCount: 1,
        sampleRate: 16000,
      },
    });

    const context = new AudioContext();
    const src = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(4096, 1, 1);

    processor.onaudioprocess = (e) => {
      try {
        recognizer.acceptWaveform(e.inputBuffer);
      } catch (err) {
        console.error('acceptWaveform failed', err);
      }
    };

    src.connect(processor);
    processor.connect(context.destination);

    setAudioContext(context);
    setSource(stream);
    setIsListening(true);
  };

  const stopListening = () => {
    if (source) {
      source.getTracks().forEach((track: any) => track.stop());
    }
    if (audioContext) {
      audioContext.close();
    }
    setIsListening(false);
  };

  useEffect(() => {
    initRecognizer();

    return () => {
      stopListening();
    };
  }, []);

  return (
    <div className="p-4">
      <button
        onClick={isListening ? stopListening : startListening}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>

      <div className="mt-4">
        <h2 className="text-xl font-bold">Recognized Text:</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}
