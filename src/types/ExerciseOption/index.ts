interface IExerciseOption {
  text: string;
  isCorrect: boolean;
  _id: string;
}

interface IExercise {
  _id: string;
  sectionId: string;
  type: "multiple-choice" | "single-choice" | "fill-in-the-blank" | "speaking";
  question: string;
  options: IExerciseOption[];
  blankAnswer: string;
  createdAt: string;
  updatedAt: string;
}
