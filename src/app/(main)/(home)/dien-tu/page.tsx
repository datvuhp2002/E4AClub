import FillBlank from '@/modules/common/components/FillBlank';
import { useState } from 'react';

export default function Home() {
    const sentence = 'I ____ to school every day.';
    const correct_answer = 'go';

    return (
        <div className='mt-5'>
            <FillBlank
                sentence="I _____ to school every day."
                correctAnswer="go"
                options={['go', 'goes', 'going', 'went']}
            />
        </div>
    );
}
