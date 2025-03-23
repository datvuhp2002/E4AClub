"use client";

import { useState } from "react";
import DiffMatchPatch from "diff-match-patch";
import useSpeechRecognition from "@/modules/common/components/useSpeechRecognition";

export default function Home() {
  const { text, isListening, startListening } = useSpeechRecognition();
  const [score, setScore] = useState<number | null>(null);
  const [highlightedText, setHighlightedText] = useState<JSX.Element | null>(
    null
  );

  const correctText = "Hello, how are you?";

  // Hàm tính điểm và tạo markup hiển thị các chỗ sai (được đánh dấu màu đỏ)
  const calculateScore = async () => {
    // Tạo đối tượng diff-match-patch
    const dmp = new DiffMatchPatch();
    // Tính sự khác biệt giữa câu mẫu và câu người học nói
    const diffs = dmp.diff_main(correctText, text);
    dmp.diff_cleanupSemantic(diffs);

    // Tính điểm dựa trên độ khớp: tính tổng độ dài của các phần bằng nhau chia cho độ dài câu mẫu
    let equalLength = 0;
    diffs.forEach((diff: any) => {
      const [op, segment] = diff;
      if (op === 0) {
        equalLength += segment.length;
      }
    });
    const similarity = (equalLength / correctText.length) * 100;
    setScore(Math.round(similarity));

    // Tạo markup hiển thị: các phần có sự khác biệt (op != 0) được đánh dấu màu đỏ
    setHighlightedText(
      <>
        {diffs.map((diff: any, index: any) => {
          const [op, segment] = diff;
          // Nếu op == 0 (khớp hoàn toàn), hiển thị bình thường
          // Nếu không, hiển thị với màu đỏ
          return op === 0 ? (
            <span key={index}>{segment}</span>
          ) : (
            <span key={index} style={{ color: "red" }}>
              {segment}
            </span>
          );
        })}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">
        Chấm điểm phát âm tiếng Anh 🎤
      </h1>

      <button
        onClick={startListening}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
        disabled={isListening}
      >
        {isListening ? "Đang nghe..." : "Bắt đầu nói"}
      </button>

      <p className="text-lg font-semibold">
        Bạn nói: {text || <i>Chưa có dữ liệu</i>}
      </p>

      <button
        onClick={calculateScore}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
        disabled={!text}
      >
        Chấm điểm
      </button>

      {score !== null && (
        <div className="mt-4">
          <p className="text-xl font-bold">Điểm: {score}/100</p>
          <p className="mt-2">
            <strong>Câu chuẩn:</strong> {correctText}
          </p>
          <p className="mt-2">
            <strong>So sánh:</strong> {highlightedText}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Các phần hiển thị bằng{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>màu đỏ</span> cho
            biết bạn đã phát âm sai.
          </p>
        </div>
      )}
    </div>
  );
}
