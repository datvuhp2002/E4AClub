"use client"

import React, { useEffect, useRef, useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from './config.js';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import 'react-chatbot-kit/build/main.css'
import styles from "./styles.module.css"
import BootstrapIcon from "../bootstrap-icon";
interface Props {

}

const Index = (props: Props) => {
    const [toggle, setToggle] = useState(false);

    return <div className={styles["appChatbotContainer"]}>{toggle ?<Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
                headerText='Chatbot FTU'
                placeholderText='Nhập tin nhắn, nhấn Enter để gửi...'
            />:<></>}
        <button onClick={() => { setToggle(!toggle) }} className={styles["appChatbotButton"]}>
            <BootstrapIcon iconName="ChatDots" className={styles["appChatbotButtonIcon"]} />
        </button>
    </div>;
}
export default Index