// Getting Environment Variables inside Next.js
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { PRODUCTION, API_DEVELOPMENT, API_PRODUCTION } = publicRuntimeConfig;
const API = PRODUCTION ? API_PRODUCTION : API_DEVELOPMENT;
// React Import
import React from "react";
import Router from "next/router";
import Header from "../components/Header";
import Input from "../components/Input";

class Signup extends React.Component {
  state = {
    loading: false,
    error: null,
    message: null,
    email: "",
    username: "",
    name: "",
    password: ""
  };

  componentDidMount() {
    if (localStorage.getItem("token")) return Router.push("/");
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { email, username, password, name } = this.state;
    this.setState({
      loading: true
    });

    const response = await fetch(API + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        username,
        name,
        password
      })
    });
    const result = await response.json();
    if (result.error)
      this.setState({ error: result.error, message: null, loading: false });
    if (result.message)
      this.setState(
        {
          error: null,
          message: result.message,
          loading: false,
          email: "",
          password: "",
          name: "",
          username: ""
        },
        () => {
          Router.push("/signin");
        }
      );
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null,
      message: null
    });
  };

  render() {
    const {
      username,
      name,
      password,
      email,
      error,
      message,
      loading
    } = this.state;
    return (
      <div className="signup">
        <Header />
        {error && (
          <div className="error" style={{ background: "red", padding: "10px" }}>
            {error}
          </div>
        )}
        {message && (
          <div
            className="message"
            style={{ background: "green", padding: "10px" }}
          >
            {message}
          </div>
        )}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <Input
              type="text"
              name="username"
              value={username}
              placeholder="username"
              onChange={this.handleChange}
            />
            <Input
              type="text"
              name="name"
              value={name}
              placeholder="name"
              onChange={this.handleChange}
            />
            <Input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />
            <Input
              type="password"
              name="password"
              value={password}
              placeholder="password"
              onChange={this.handleChange}
            />
            <button> Sign Up</button>
          </form>
        )}
      </div>
    );
  }
}

export default Signup;
