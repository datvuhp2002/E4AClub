'use client';

import SentenceWrapper from '@/modules/layout/baigiang/components/SentenceWrapper';
import Talking from '@/modules/layout/baigiang/components/Talking';
import React from 'react';

const Page = () => {
  return (
    <div>
      <Talking text='Hi. Where do you from?' gender='elderly'/>
      <div className='mt-5'>
        <SentenceWrapper text='My name is Sons. I want to play game'>My name is Sons. I want to play game</SentenceWrapper>
      </div>
    </div>
  );
};

export default Page;
