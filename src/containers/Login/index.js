import React from "react";
import NavLogout from "../../components/Header/NavLogout";
import Form from "../../components/Form";
import Header from "../../components/Header";
import Label from "../../components/Label";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./login.module.scss";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        login: "",
        password: "",
      },
      errors: {},
      noUserError: "",
    };
  }

  auth = (value, type) => {
    if (type === "login") {
      this.setState({
        user: { ...this.state.user, login: value },
      });
    } else {
      this.setState({
        user: { ...this.state.user, password: value },
      });
    }
  };

  redirect = (path) => {
    window.location.href = `http://localhost:3000${path}`;
  };

  validate = () => {
    const errors = {};
    const fields = ["login", "password"];
    fields.forEach((item) => {
      if (this.state.user[item] === "") {
        errors[item] = "This field is required";
      }
    });

    this.setState({ errors: errors });
    return Object.keys(errors).length;
  };

  authUser = (userClient, userStorage) => {
    const isLogin = userClient.login === userStorage.login;
    const isPassword = userClient.password === userStorage.password;

    if (isLogin && isPassword) {
      this.redirect("/");
    } else {
      this.setState({ noUserError: "This user isn't defined" });
      this.setState({ user: { login: "", password: "" } });
    }
  };

  button = () => {
    const errorsObject = this.validate();
    if (!errorsObject) {
      this.authUser(this.state.user, JSON.parse(localStorage.user));
    }
  };

  render() {
    // if (!localStorage.user && !window.location.pathname.includes("login")) {
    //   this.redirect("/login");
    // }

    return (
      <div>
        <Header>
          <NavLogout />
        </Header>
        <div className={styles.formWrapper}>
          <Form title="Sign in" border>
            <div className={styles.form__row}>
              <Label text="Enter login" />
              <Input
                type="text"
                placeholder="Login"
                onChange={(value) => this.auth(value, "login")}
                value={this.state.user.login}
              />
              {this.state.errors.login && (
                <p className={styles.error}>{this.state.errors.login}</p>
              )}
            </div>

            <div className={styles.form__row}>
              <Label text="Enter password" />
              <Input
                type="password"
                placeholder="Password"
                onChange={(value) => this.auth(value, "password")}
                value={this.state.user.password}
              />
              {this.state.errors.password && (
                <p className={styles.error}>{this.state.errors.password}</p>
              )}
            </div>
            <Button
              text="Sign in"
              size="md"
              color="blue"
              uppercase
              onClick={this.button}
            />
            {this.state.noUserError.length > 0 && (
              <p className={styles.error}>{this.state.noUserError}</p>
            )}
          </Form>
        </div>
      </div>
    );
  }
}
