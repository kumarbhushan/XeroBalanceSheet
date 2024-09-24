import React from "react";
import styles from "../Table.module.css";

const Cell: React.FC<{ content: String }> = ({ content }) => {
  return <div className={styles.table__cell}>{content}</div>;
};

export default Cell;
