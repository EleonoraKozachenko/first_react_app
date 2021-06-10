import React from "react";
import NavLogout from "../../components/Header/NavLogout";
import Form from "../../components/Form";
import Header from "../../components/Header";
import Label from "../../components/Label";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./register.module.scss";

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: "",
        login: "",
        password: "",
      },
      errors: {},
    };
  }

  register = (value, type) => {
    if (type === "name") {
      this.setState({
        user: { ...this.state.user, name: value },
      });
    } else if (type === "login") {
      this.setState({
        user: { ...this.state.user, login: value },
      });
    } else {
      this.setState({
        user: { ...this.state.user, password: value },
      });
    }
  };

  validate = () => {
    const errors = {};
    const fields = ["name", "login", "password"];
    fields.forEach((item) => {
      if (this.state.user[item] === "") {
        errors[item] = "This field is required";
      }
    });

    this.setState({ errors: errors });
    return Object.keys(errors).length;
  };

  button = () => {
    const errorsObject = this.validate();
    if (!errorsObject) {
      localStorage.user = JSON.stringify(this.state.user);
      window.location.href = "http://localhost:3000/login";
    }
  };

  render() {
    return (
      <div>
        <Header>
          <NavLogout />
        </Header>
        <div className={styles.formWrapper}>
          <Form title="Register" border>
            <div className={styles.form__row}>
              <Label text="Enter name" />
              <Input
                type="text"
                placeholder="Name"
                onChange={(value) => this.register(value, "name")}
                value={this.state.user.name}
              />
              {this.state.errors.login && (
                <p className={styles.error}>{this.state.errors.name}</p>
              )}
            </div>
            <div className={styles.form__row}>
              <Label text="Enter login (email)" />
              <Input
                type="email"
                placeholder="Email"
                onChange={(value) => this.register(value, "login")}
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
                onChange={(value) => this.register(value, "password")}
                value={this.state.user.password}
              />
              {this.state.errors.login && (
                <p className={styles.error}>{this.state.errors.password}</p>
              )}
            </div>
            <Button
              text="Submit"
              size="md"
              color="blue"
              uppercase
              onClick={this.button}
            />
          </Form>
        </div>
      </div>
    );
  }
}
