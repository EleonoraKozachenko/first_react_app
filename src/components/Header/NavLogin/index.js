import React from "react";
import Search from "../Search";
import styles from "./navLogin.module.scss";
import cn from "classnames";
import { Link } from "react-router-dom";

const dropdownList = [
  { itemName: "Logout", id: 1, onClick: true },
  // { itemName: "Test1", id: 2 },
  // { itemName: "Test2", id: 3 },
];

export default class NavLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropdownActive: false,
    };
  }

  onShowDropdown = () => {
    this.setState({ isDropdownActive: !this.state.isDropdownActive });
  };

  render() {
    const stylesDropdown = cn(styles.header__dropdown, {
      [styles.isOpen]: this.state.isDropdownActive,
    });

    const { onClick, onChange, searchUser } = this.props;

    return (
      <div className={styles.header}>
        <Search onChange={onChange} searchUser={searchUser} />
        <div className={styles.header__info}>
          <p className={styles.header__infoName}>Admin</p>
          <div
            className={styles.header__containerAvatar}
            onClick={this.onShowDropdown}
          >
            <img
              className={styles.header__avatar}
              src="/images/johnAvatar.jpg"
              alt="ava"
            />
            <div className={stylesDropdown}>
              {dropdownList.map((item) => {
                if (item.onClick) {
                  return (
                    <Link to="landing" key={item.id} onClick={onClick}>
                      {item.itemName}
                    </Link>
                  );
                } else {
                  return (
                    <Link to={item} key={item.id}>
                      {item.itemName}
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
