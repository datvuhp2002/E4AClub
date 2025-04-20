import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./SingleChoice.module.scss";
import Button from "@/modules/common/components/Button";
import { useToastContext } from "@/lib/context/toast-context";
import CourseServices from "@/services/course-services";
import SentenceWrapper from "../SentenceWrapper";

const cx = classNames.bind(styles);

interface SingleChoiceProps {
  quizData: IExerciseOption[];
  exerciseId: string;
}

const SingleChoice: React.FC<SingleChoiceProps> = ({
  quizData,
  exerciseId,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showBorder, setShowBorder] = useState(false);
  const { HandleOpenToast } = useToastContext();

  const onSelectAnswer = (answerId: string) => {
    setSelectedAnswer(answerId); // Chỉ chọn một đáp án duy nhất
  };

  const onSubmitQuiz = async () => {
    if (!selectedAnswer) return;

    const correctAnswer = quizData.find((item) => item.isCorrect)?._id;
    const isCorrect = selectedAnswer === correctAnswer;

    if (isCorrect) {
      HandleOpenToast({
        type: "success",
        content: `Câu trả lời chính xác!!!`,
      });

      CourseServices.UpdateProgressExercise({
        exercise: exerciseId,
        answers: [`${selectedAnswer}`],
        score: 100,
      });
    } else {
      HandleOpenToast({
        type: "error",
        content: `Câu trả lời chưa chính xác! Vui lòng thử lại.`,
      });
    }

    setShowBorder(true);
  };

  return (
    <div>
      <div className={cx("answer")}>
        {quizData.map((item: any) => (
          <div
            key={item._id}
            onClick={() => onSelectAnswer(item._id)}
            className={cx(
              "option_answer",
              selectedAnswer === item._id && "selected", // Chỉ 1 đáp án được chọn
              showBorder
                ? item.isCorrect
                  ? "border-success"
                  : "border-danger"
                : ""
            )}
          >
            <SentenceWrapper text={item.text}/>
          </div>
        ))}
      </div>
      <div
        className={cx(
          "footer",
          "d-flex align-items-center justify-content-end mt-2"
        )}
      >
        <Button
          success_btn={selectedAnswer != null}
          rounded
          onClick={onSubmitQuiz}
          disabled={!selectedAnswer}
        >
          Trả lời
        </Button>
      </div>
    </div>
  );
};

export default SingleChoice;
