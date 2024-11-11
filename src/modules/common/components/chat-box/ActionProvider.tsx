import axios from "axios";
import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }: any) => {
  const handleGPT = (response: any) => {
    if (response.status == 200) {
      const botMessage = createChatBotMessage(
        response.data.choices[0].message.content
      );
      setState((prev: any) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }
  };
  const handlePrompt = (response: any) => {
    const botMessage = createChatBotMessage(response);
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleGPT,
            handlePrompt,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
