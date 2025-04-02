"use client";

import { useState } from "react";
import styles from "./FillBlank.module.scss";
import classNames from "classnames/bind";
import Button from "../../../../common/components/Button";
import CourseServices from "@/services/course-services";

const cx = classNames.bind(styles);
interface FillBlankProps {
  question: string; // Câu hỏi
  correctAnswer: string; // Đáp án đúng
  exerciseId: string;
}

const FillBlank: React.FC<FillBlankProps> = ({ question, correctAnswer, exerciseId }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const checkAnswer = async () => {
    const isSuccess = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
    setIsCorrect(isSuccess);

    if (isSuccess) {
      CourseServices.UpdateProgressExercise({
        exercise: exerciseId,
        answers: [`${userAnswer.trim()}`],
        score: 100,
      });
    }
  };

  return (
    <div className={cx("wrapper")}>
      <input
        className={cx("wrapper-input")}
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            checkAnswer();
          }
        }}
        placeholder="Nhập đáp án..."
      />
      <div className={cx("wrapper-check-answer")}>
        <div>
          <Button
            success_btn
            className={cx("wrapper-check-answer-btn", {
              disabled: !userAnswer,
            })}
            onClick={checkAnswer}
            disabled={userAnswer ? false : true}
          >
            Kiểm tra
          </Button>
        </div>
        {isCorrect !== null && (
          <p
            className={cx("wrapper-check-answer-result")}
            style={{ color: isCorrect ? "green" : "red" }}
          >
            {isCorrect ? "✔ Chính xác!" : "❌ Chưa đúng, hãy thử lại!"}
          </p>
        )}
      </div>
    </div>
  );
};

export default FillBlank;
