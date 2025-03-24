import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./MultipleChoice.module.scss";
import Button from "@/modules/common/components/Button";
import { useToastContext } from "@/lib/context/toast-context";

const cx = classNames.bind(styles);

interface MultipleChoiceProps {
  quizData: IExerciseOption[];
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ quizData }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showBorder, setShowBorder] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const { HandleOpenToast } = useToastContext();
  const toggleAnswer = (answerId: string) => {
    setSelectedAnswers(
      (prevAnswers) =>
        prevAnswers.includes(answerId)
          ? prevAnswers.filter((id) => id !== answerId) // Bỏ chọn nếu đã chọn
          : [...prevAnswers, answerId] // Chọn nếu chưa có
    );
  };

  const onSubmitQuiz = async () => {
    if (!isAnswerCorrect) {
      const correctAnswers = quizData
        .filter((item) => item.isCorrect)
        .map((item) => item._id);

      const isCorrect =
        selectedAnswers.length === correctAnswers.length &&
        selectedAnswers.every((answer) => correctAnswers.includes(answer));

      const isPartiallyCorrect = selectedAnswers.every((answer) =>
        correctAnswers.includes(answer)
      );

      if (isCorrect) {
        HandleOpenToast({
          type: "success",
          content: `Câu trả lời chính xác!!!`,
        });
        setShowBorder(true);
        setIsAnswerCorrect(true);
      } else if (isPartiallyCorrect) {
        HandleOpenToast({
          type: "warning",
          content: `Đúng nhưng chưa đủ! Hãy chọn thêm.`,
        });
      } else {
        HandleOpenToast({
          type: "error",
          content: `Câu trả lời chưa chính xác! Vui lòng thử lại.`,
        });
      }
    } else {
      return;
    }
  };

  return (
    <div>
      <div className={cx("answer")}>
        {quizData.map((item) => (
          <div
            key={item._id}
            onClick={() => toggleAnswer(item._id)}
            className={cx(
              "option_answer",
              selectedAnswers.includes(item._id) && "selected",
              showBorder
                ? item.isCorrect
                  ? "border-success"
                  : "border-danger"
                : ""
            )}
          >
            {item.text}
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
          success_btn={selectedAnswers.length != 0}
          rounded
          onClick={onSubmitQuiz}
          disabled={selectedAnswers.length === 0}
        >
          Trả lời
        </Button>
      </div>
    </div>
  );
};

export default MultipleChoice;
