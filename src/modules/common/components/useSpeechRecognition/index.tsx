import { useState, useRef, useEffect } from "react";
import * as Vosk from 'vosk-browser';
import Recorder from 'recorder-js';

const useSpeechRecognition = (
    onResult?: (text: string) => void,
    onEvaluate?: (audioURL: string) => void
) => {
    const textRef = useRef<any>(null);
    const [isListening, setIsListening] = useState(false);
    const [recognizer, setRecognizer] = useState<any>(null);
    const [audioContext, setAudioContext] = useState<any>(null);
    const [source, setSource] = useState<any>(null);

    const [audioURL, setAudioURL] = useState<string | null>(null);
    const recorderRef = useRef<any>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const initRecognizer = async () => {
        const model = await Vosk.createModel('/model/vosk-model-small-en-us-0.15.tar.gz');
        const rec = new model.KaldiRecognizer(16000);
        rec.on('result', async (message: any) => {
            console.log('Result:', message.result.text);
            textRef.current += message.result.text
        });
        rec.on('partialresult', (message: any) => {
            // console.log('Partial:', message.result.partial);
        });
        setRecognizer(rec);
    };

    const startListening = async () => {
        if (!recognizer) return;

        resetAudio();

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

        // 🎧 Start Recorder.js
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

        recorderRef.current = new Recorder(audioContextRef.current);
        await recorderRef.current.init(streamRef.current);
        recorderRef.current.start();

        setIsListening(true);
    };

    const stopListening = async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        if (source) {
            source.getTracks().forEach((track: any) => track.stop());
        }
        if (audioContext) {
            audioContext.close();
        }

        if (recorderRef.current) {
            const { blob } = await recorderRef.current.stop();
            streamRef.current?.getTracks().forEach((track) => track.stop());
            const url = URL.createObjectURL(blob);
            setAudioURL(url);
            onEvaluate?.(url);
        }

        setIsListening(false);
        onResult?.(textRef.current);
    };

    const resetAudio = () => {
        setAudioURL(null);
        textRef.current = "";
    };

    useEffect(() => {
        initRecognizer();

        return () => {
            stopListening();
        };
    }, []);

    return {
        isListening,
        startListening,
        stopListening,
        resetAudio,
        audioURL,
    };
};

export default useSpeechRecognition;
