import React from "react";
import Item from "./ItemSidebar";
import styles from "./sidebar.module.scss";

const menu = ["About us", "Wish list", "Photos"];

const Sidebar = (props) => {
  const { selectedUser } = props;

  return (
    <aside className={styles.aside}>
      {menu.map((item) => {
        return <Item name={item} key={item} />;
      })}
      {selectedUser && (
        <div className={styles.activeUser}>
          <div className={styles.activeUser__column}>
            <img
              alt="profile"
              className={styles.activeUser__avatar}
              src={selectedUser.image || "/images/avatar.png"}
            />
          </div>
          <div className={styles.activeUser__column}>
            <p>{selectedUser.name}</p>
          </div>
          <div className={styles.activeUser__column}>
            <p>{selectedUser.phone}</p>
          </div>
          <div className={styles.activeUser__column}>
            <p>{selectedUser.email}</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
