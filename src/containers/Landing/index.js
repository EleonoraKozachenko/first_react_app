import React from "react";
import NavLogout from "../../components/Header/NavLogout";
import styles from "./landing.module.scss";
import Header from "../../components/Header";

const Landing = () => {
  return (
    <div>
      <Header>
        <NavLogout />
      </Header>
      <div
        style={{
          backgroundImage: "url(/images/waves.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "35%",
          objectFit: "cover",
        }}
        className={styles.greeting}
      >
        <p>Welcome</p>
      </div>
    </div>
  );
};

export default Landing;
