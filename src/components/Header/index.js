import React from "react";
import Logo from "../Logo";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";

const Header = (props) => {
  const { children } = props;

  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo src="/images/logo192.png" />
      </Link>
      {children}
    </header>
  );
};

export default Header;
