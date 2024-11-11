import React, { useEffect, useRef, useState } from "react";
import BootstrapIcon from "../bootstrap-icon";
import styles from "./styles.module.css"
interface Props {
    text: any
    length: any
    character: any
}

const Index = (props: Props) => {
    const [appendText, setAppendText] = useState(false);
    const CutBarCode = (length:any) => {
        let cutText = props.text.split(props.character);
        let rs:any = [];
        if(cutText.length > 0) {
            if(cutText.length <= props.length)
            {
                for(let i = 0;i < cutText.length;i++)
                {
                    rs.push(cutText[i]); 
                    if(i != cutText.length - 1)
                    {
                        rs.push(",");    
                    }
                }
            }
            else
            {
                let length = props.length;
                if(appendText)
                {
                    length = cutText.length;
                }
                for(let i = 0;i < length;i++)
                {
                    rs.push(cutText[i]); 
                    if(i != length - 1)
                    {
                        rs.push(",");    
                    }
                }
                if(appendText)
                {
                    rs.push(" ");
                    rs.push(<BootstrapIcon onClick={() => { setAppendText(false) }} iconName="DashCircle" className={"text-theme " + styles["append-icon"]} />)
                }
                else
                {
                    rs.push(", ... ");
                    rs.push(<BootstrapIcon onClick={() => { setAppendText(true) }} iconName="PlusCircle" className={"text-theme " + styles["append-icon"]} />)
                }
            }
        }
        else {
            rs.push(props.text); 
        }
        return rs;
    }

    return <>{CutBarCode(props.length)}</>;
}
export default Index