import React from "react";
import Header from "../../components/Header";
import NavLogin from "../../components/Header/NavLogin";
import Modal from "../../components/Modal";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";
import User from "../../components/User";
import styles from "./app.module.scss";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Upload from "../../components/Upload";

const INITIAL_FORM = {
  image: [],
  name: "",
  phone: "",
  email: "",
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModalUser: false,
      users: [],
      form: INITIAL_FORM,
      formErrors: {},
      selectedUser: null, //why null? - its "true", easy to check
      loadingUsers: false,
      searchUser: null,
    };
  }

  toLogOut = () => {
    delete localStorage.user;
  };

  addUserButton = () => {
    this.setState({ isShowModalUser: true });
  };

  onModalClose = () => {
    this.setState({ isShowModalUser: false });
  };

  addNewUserData = (field, value) => {
    if (field === "name") {
      this.setState({ form: { ...this.state.form, name: value } });
    }
    if (field === "phone") {
      this.setState({ form: { ...this.state.form, phone: value } });
    }
    if (field === "image") {
      this.setState({ form: { ...this.state.form, image: value } });
    }
    if (field === "email") {
      this.setState({ form: { ...this.state.form, email: value } });
    }
  };

  onSelectUser = (user) => {
    this.setState({ selectedUser: user });
  };

  onDelete = (id) => {
    const newUsers = [...this.state.users]; // don't work with data directly - make a new array and work with it
    const isClearActiveUser = this.state.selectedUser
      ? id === this.state.selectedUser.id
      : false;
    this.setState({
      users: newUsers.filter((item) => item.id !== id),
      ...(isClearActiveUser && {
        selectedUser: null,
      }), //when there isn't a user, delete it from preview at sidebar
    });
  };

  validate = () => {
    const errors = {};
    const fields = ["email", "name", "phone"];
    fields.forEach((item) => {
      if (this.state.form[item] === "") {
        errors[item] = "This field is required";
      }
    });

    this.setState({ formErrors: errors });
    return Object.keys(errors).length;
  };

  onSubmit = (user) => {
    //click on Edit button
    if (user.id) {
      this.setState({ form: user, isShowModalUser: true });
      return;
    }

    //click on Confirm button -to edit
    if (this.state.form.id) {
      this.setState({
        form: INITIAL_FORM,
        users: this.state.users.map((item) => {
          if (item.id === this.state.form.id) {
            return { ...this.state.form };
          }

          return item;
        }),
      });
      this.onModalClose();
    }

    //click on Confirm button -to create
    const isEmpty = this.validate();
    console.log("test");
    if (!isEmpty && !this.state.form.id) {
      const lastUser = this.state.users[this.state.users.length - 1];
      const newUSer = {
        ...this.state.form,
        id: lastUser ? lastUser.id + 1 : 1,
      };
      this.setState({
        users: [...this.state.users, newUSer],
        form: INITIAL_FORM,
      });
      this.onModalClose();
    }
  };

  getUsers = () => {
    this.setState({ loadingUsers: true });
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => this.setState({ users: data, loadingUsers: false }));
  };

  onChangeSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const searchUsers = this.state.users.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    this.setState({ searchUser: searchUsers });

    //disable search by whitespace
    if (value.length === 0 || value === " ") {
      this.setState({ searchUser: null });
    }
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div className="App">
        <Header>
          <NavLogin
            onClick={this.toLogOut}
            onChange={this.onChangeSearch}
            searchUser={this.state.searchUser}
          />{" "}
        </Header>
        <div className={styles.container}>
          <Sidebar selectedUser={this.state.selectedUser} />
          <main className={styles.mainHome}>
            <div className={styles.container__head}>
              <h3 className="title">Users</h3>
              <Button
                text="Add user"
                color="blue"
                size="md"
                onClick={this.addUserButton}
              />
            </div>

            <Table isLoading={this.state.loadingUsers}>
              <div>
                {this.state.users.length > 0 ? (
                  this.state.users.map((item) => {
                    return (
                      <User
                        name={item.name}
                        image={item.image}
                        phone={item.phone}
                        email={item.email}
                        key={item.id}
                        onEdit={() => this.onSubmit(item)}
                        onDelete={() => this.onDelete(item.id)}
                        onSelectUser={() => this.onSelectUser(item)}
                      />
                    );
                  })
                ) : (
                  <div className={styles.notification}>No results</div>
                )}
              </div>
            </Table>
          </main>
        </div>
        {this.state.isShowModalUser && (
          <Modal onModalClose={this.onModalClose}>
            <Form title="Add User">
              <Upload
                onChangeImage={(files) => this.addNewUserData("image", files)}
              />
              <div className={styles.inputWrapper}>
                <Input
                  placeholder="Enter name"
                  onChange={(value) => this.addNewUserData("name", value)}
                  value={this.state.form.name}
                />
                {this.state.formErrors.name && (
                  <p className={styles.error}>{this.state.formErrors.name}</p>
                )}
              </div>
              <div className={styles.inputWrapper}>
                <Input
                  placeholder="Phone"
                  onChange={(value) => this.addNewUserData("phone", value)}
                  value={this.state.form.phone}
                />
                {this.state.formErrors.phone && (
                  <p className={styles.error}>{this.state.formErrors.phone}</p>
                )}
              </div>
              <div className={styles.inputWrapper}>
                <Input
                  placeholder="E-mail"
                  onChange={(value) => this.addNewUserData("email", value)}
                  value={this.state.form.email}
                />
                {this.state.formErrors.email && (
                  <p className={styles.error}>{this.state.formErrors.email}</p>
                )}
              </div>
              <div className={styles.buttonsWrapper}>
                <Button
                  text="Cancel"
                  color="white"
                  size="sm"
                  uppercase
                  bold
                  onClick={this.onModalClose}
                />
                <Button
                  text="Сonfirm"
                  color="white"
                  size="sm"
                  uppercase
                  bold
                  onClick={this.onSubmit}
                />
              </div>
            </Form>
          </Modal>
        )}
      </div>
    );
  }
}
