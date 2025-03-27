'use client';

import { useState } from 'react';

interface FillBlankProps {
    sentence: string; // Câu có chứa "_____"
    correctAnswer: string; // Đáp án đúng
    options: string[]; // Danh sách đáp án để chọn
}

const FillBlank: React.FC<FillBlankProps> = ({ sentence, correctAnswer, options = [] }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleSelectAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        setIsCorrect(null); // Reset trạng thái đúng/sai khi chọn đáp án mới
    };

    const checkAnswer = () => {
        setIsCorrect(selectedAnswer === correctAnswer);
    };

    const parts = sentence.split('_____'); // Tách câu thành hai phần

    return (
        <div style={{ textAlign: 'center' }}>
            {/* Hiển thị câu với đáp án được chọn */}
            <p style={{ fontSize: '18px' }}>
                {parts[0]}{' '}
                <span
                    style={{
                        display: 'inline-block',
                        minWidth: '80px',
                        borderBottom: '2px solid black',
                        padding: '5px',
                        fontWeight: 'bold'
                    }}
                >
                    {selectedAnswer || '_____'}
                </span>{' '}
                {parts[1]}
            </p>

            {/* Hiển thị danh sách các lựa chọn dưới dạng button */}
            <div style={{ marginTop: '10px' }}>
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelectAnswer(option)}
                        style={{
                            margin: '5px',
                            padding: '10px',
                            fontSize: '16px',
                            backgroundColor: selectedAnswer === option ? '#007bff' : '#f0f0f0',
                            color: selectedAnswer === option ? '#fff' : '#000',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {/* Nút kiểm tra đáp án */}
            <div style={{ marginTop: '15px' }}>
                <button
                    onClick={checkAnswer}
                    style={{
                        padding: '10px 15px',
                        fontSize: '16px',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Kiểm tra
                </button>
            </div>

            {/* Hiển thị kết quả */}
            {isCorrect !== null && (
                <p style={{ color: isCorrect ? 'green' : 'red', fontSize: '18px', marginTop: '10px' }}>
                    {isCorrect ? '✔ Chính xác!' : '❌ Sai, hãy thử lại!'}
                </p>
            )}
        </div>
    );
};

export default FillBlank;
