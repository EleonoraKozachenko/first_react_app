import React from "react";
import logo from "../../logo.svg";
import styles from "./logo.module.scss";

const Logo = (props) => {
  return (
    <div className={styles.logoContainer}>
      <img src={props.src || logo} className={styles.logo} alt="logo" />
    </div>
  );
};

export default Logo;
