import React from "react";
import styles from "./form.module.scss";
import cn from "classnames";

const Form = (props) => {
  const { title, children, border } = props;
  const formStyle = cn(styles.form, {
    [styles["form__border"]]: border,
  });
  return (
    <div className={formStyle}>
      <p className={styles.form__title}>{title}</p>
      {children}
    </div>
  );
};

export default Form;
