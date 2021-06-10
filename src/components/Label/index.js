import styles from "./label.module.scss";
import React from "react";

const Label = (props) => {
  return (
    <div>
      <p className={styles.label}>{props.text}</p>
    </div>
  );
};

export default Label;
