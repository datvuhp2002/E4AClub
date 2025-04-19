interface IExerciseOption {
  text: string;
  isCorrect: boolean;
  _id?: string;
}
interface ConversationLineDto {
  _id: string;
  speaker: string;
  text: string;
}
interface IExercise {
  _id: string;
  sectionId: string;
  question: string;
  type:
    | "multiple-choice"
    | "single-choice"
    | "fill-in-the-blank"
    | "speaking"
    | "conversation";
  options: IExerciseOption[];
  blankAnswer: string;
  createdAt: string;
  updatedAt: string;
  conversation: {
    role?: string;
    script?: string;
    parsedScript?: ConversationLineDto[];
  };
}
interface ICreateExercise {
  _id: string;
  sectionId: string;
  question: string;
  type:
    | "multiple-choice"
    | "single-choice"
    | "fill-in-the-blank"
    | "speaking"
    | "conversation";
  options: IExerciseOption[];
  blankAnswer: string;
  createdAt: string;
  updatedAt: string;
  conversation: {
    role?: string;
    script?: string;
  };
}
