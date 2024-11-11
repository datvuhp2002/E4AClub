import axios from 'axios';
import React from 'react';

const MessageParser = ({ children, actions }:any) => {
  const parse = async (message:any) => {
    if (message) {
      if(message.toLowerCase().includes("thư viện mở cửa giờ nào")) {
        actions.handlePrompt("");
      }
      else if(message.toLowerCase().includes("giờ hoạt động của thư viện")) {
        
      }
      else if(message.toLowerCase().includes("bạn đọc có thể đến thư viện thời gian nào")) {

      }
      else if(message.toLowerCase().includes("các phòng đọc của thư viện ftu")) {

      }
      else if(message.toLowerCase().includes("bộ sưu tập tài liệu cơ sở dữ liệu khóa luận")) {

      }
      else if(message.toLowerCase().includes("tài liệu luận án, cơ sở dữ liệu đề tài")) {

      }
      else {
        let data = {
          "model": "gpt-3.5-turbo",
          "messages": [{ "role": "user", "content": message }],
          "temperature": 0.7
        }
        var response = await axios({
          url: 'https://api.openai.com/v1/chat/completions',
          method: 'Post',
          data,
          headers: {
            Authorization: "Bearer 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"
          }
        });
        actions.handleGPT(response);
      }
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;