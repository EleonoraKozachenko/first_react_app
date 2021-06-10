import React from "react";
import styles from "./table.module.scss";

const Table = (props) => {
  const { children, isLoading } = props;

  return (
    <div className={styles.table}>
      <div className={styles.table__head}>
        <div className={styles.table__column}>
          <p>Image</p>
        </div>
        <div className={styles.table__column}>
          <p>Name</p>
        </div>
        <div className={styles.table__column}>
          <p>Phone</p>
        </div>
        <div className={styles.table__column}>
          <p>E-mail</p>
        </div>
      </div>
      <div className={styles.table__body}>
        {isLoading ? (
          <div className={styles.loader}>Loading...</div>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </div>
  );
};

export default Table;
