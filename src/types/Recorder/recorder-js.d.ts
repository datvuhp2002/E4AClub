declare module "recorder-js" {
    export default class Recorder {
      constructor(audioContext: AudioContext, config?: { [key: string]: any });
      init(stream: MediaStream): Promise<void>;
      start(): void;
      stop(): Promise<{ blob: Blob; buffer: AudioBuffer }>;
      pause(): void;
      resume(): void;
      record(): void;
      clear(): void;
      exportWAV(): Promise<Blob>;
    }
  }
  