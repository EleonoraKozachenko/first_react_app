import React from "react";
import styles from "./user.module.scss";
import Button from "../Button";
import icon from "../../bin.png";

const User = (props) => {
  const { image, name, phone, email, onSelectUser } = props;
  return (
    <div className={styles.user}>
      <div className={styles.user__column} onClick={onSelectUser}>
        <img
          className={styles.user__avatar}
          src={image || "/images/avatar.png"}
          alt={name}
        />
      </div>
      <div className={styles.user__column}>
        <p>{name}</p>
      </div>
      <div className={styles.user__column}>
        <p title={phone}>{phone}</p>
      </div>
      <div className={styles.user__column}>
        <p title={email}>{email}</p>
      </div>
      <div className={styles.user__column}>
        <div className={styles.buttons}>
          <Button onClick={props.onEdit} text="Edit" color="blue" size="md" />
          <Button
            onClick={props.onDelete}
            text="Delete"
            color="blue"
            size="md"
            icon={icon}
          />
        </div>
      </div>
    </div>
  );
};

export default User;
