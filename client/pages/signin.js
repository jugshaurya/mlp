// Getting Environment Variables inside Next.js
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { PRODUCTION, API_DEVELOPMENT, API_PRODUCTION } = publicRuntimeConfig;
const API = PRODUCTION ? API_PRODUCTION : API_DEVELOPMENT;

// React Import
import React from "react";
import Router from "next/router";

// Generic input field
class Input extends React.Component {
  render() {
    const { type, name, placeholder, onChange, value } = this.props;
    return (
      <div className="Input">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          autoComplete="false"
          required
          onChange={onChange}
          value={value}
        />
        <label htmlFor={name}></label>
      </div>
    );
  }
}

class Signin extends React.Component {
  state = {
    loading: false,
    error: null,
    message: null,
    email: "test1@gmail.com",
    password: "test1a9a9a9"
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({
      loading: true
    });

    const response = await fetch(API + "/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const result = await response.json();
    if (result.error)
      this.setState({ error: result.error, message: null, loading: false });
    //  Signin successful
    if (result.message)
      this.setState(
        {
          error: null,
          message: result.message,
          loading: false,
          email: "",
          password: ""
        },
        () => {
          Router.push("/");
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
    const { password, email, error, message, loading } = this.state;
    return (
      <div className="signup">
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
            <button> Sign In</button>
          </form>
        )}
      </div>
    );
  }
}

export default Signin;
