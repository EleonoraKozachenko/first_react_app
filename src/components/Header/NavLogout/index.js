import React from "react";
import { Link } from "react-router-dom";
import styles from "./navLogout.module.scss";

function NavLogout(props) {
  return (
    <nav className={styles.navLogout}>
      <Link className={styles.navLogout__link} to="/login">
        Login
      </Link>
      <Link className={styles.navLogout__link} to="/register">
        Register
      </Link>
    </nav>
  );
}

export default NavLogout;
