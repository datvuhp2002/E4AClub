interface ExerciseOption {
  text: string;
  isCorrect?: boolean;
}

interface Exercise {
  sectionId: string;
  type: "multiple-choice" | "single-choice" | "fill-in-the-blank" | "speaking";
  question: string;
  options?: ExerciseOption[];
  correctAnswers?: any[];
}
