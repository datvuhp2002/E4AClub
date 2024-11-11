"use client";
import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";
const Card: React.FC<{ children: React.ReactNode; title: any }> = ({
  children,
  title,
}) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <hr />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Card;
