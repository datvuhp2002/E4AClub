import React, { ReactNode } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Wrapper as PopperWrapper } from "..";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";
import classNames from "classnames/bind";
import { Placement } from "tippy.js";

const cx = classNames.bind(styles);

interface MenuProps {
  children: ReactNode;
  items: any[][];
}

const Menu: React.FC<MenuProps> = ({ children, items }) => {
  const renderItems = () => {
    return items?.map((group, index) => (
      <ul key={index} className={cx("item")}>
        {group.map((item, idx) => (
          <MenuItem key={idx} data={item} />
        ))}
      </ul>
    ));
  };
  const renderResult = (attrs: {
    "data-placement": Placement;
    "data-reference-hidden"?: string;
    "data-escaped"?: string;
  }) => (
    <div className={cx("content")} tabIndex={-1} {...attrs}>
      <PopperWrapper>{renderItems()}</PopperWrapper>
    </div>
  );

  return (
    <Tippy
      interactive
      zIndex={1000}
      animation={false}
      placement={"bottom-end"}
      render={renderResult}
    >
      <div className={cx("user", "h-100 d-flex align-items-center p-1")}>
        {children}
      </div>
    </Tippy>
  );
};

export default Menu;
