import React, { useEffect, useRef, useState } from "react";
import BootstrapIcon from "../bootstrap-icon";
import styles from "./styles.module.css"
interface Props {
    children:any
    defaultTruncate?:any
}

const Index = (props: Props) => {
    const divRef = useRef<any>();

    const [truncate, setTruncate] = useState<any>(false);
    const [styleTruncate, setStyleTruncate] = useState<any>("");
    useEffect(() => {
        const height = divRef.current.clientHeight;
        if(height > 48)
        {
            setTruncate(true);
            if(props.defaultTruncate == false) {
                setStyleTruncate("");
            }
            else {
                setStyleTruncate("text-truncate-3");
            }
        }
      }, []);
    
    return <><div className={styleTruncate} ref={divRef}>
                {props.children}
                {truncate == false ? <></>: 
                !styleTruncate?
                <BootstrapIcon onClick={() => { setStyleTruncate("text-truncate-3") }} 
                    iconName="CaretUpFill" className={"text-theme " + styles["append-icon-up"]} />:<></>}
            </div>
            {truncate == false ? <></>:
            styleTruncate?
            <BootstrapIcon onClick={() => { setStyleTruncate("") }} 
                            iconName="CaretDownFill" 
                            className={"text-theme " + styles["append-icon-down"]} />:<></>}
        </>;
}
export default Index