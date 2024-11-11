import React from "react";
import BootstrapIcon from "../bootstrap-icon";

interface Props {
    label?: string
    onClickAll?: any
    children?: React.ReactNode
    isBgTransparent?: boolean
    className?: string
    style?: any
}

const Index = (props: Props) => {
    return <div style={props.style} className={"card" + (props.className ? " " + props.className : "")  + (props.isBgTransparent == true ? " bg-transparent" : "")}>
                <div className="card-body box-body">
                    {
                        props.label ? <div className="card-label mb-3">
                            <BootstrapIcon iconName="BookmarksFill" />{" "}
                            <span>{props.label}</span>
                            {props.onClickAll ? <div className="box-all">-- Xem tất cả --</div> : null}                        
                        </div>:<></>
                    }
                    {props.children}
                </div>
            </div>;
}
export default Index