// Getting Environment Variables inside Next.js
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { PRODUCTION, API_DEVELOPMENT, API_PRODUCTION } = publicRuntimeConfig;
const API = PRODUCTION ? API_PRODUCTION : API_DEVELOPMENT;

import React from "react";
import Link from "next/link";
import Router from "next/router";
import NextNProgress from "./NextNProgress";

class Header extends React.Component {
  state = {
    user: null,
    message: null
  };

  componentDidMount() {
    this.setState({ user: JSON.parse(localStorage.getItem("user")) || null });
  }

  handleSignout = async e => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    const response = await fetch(API + "/signout", {
      method: "POST"
    });

    const result = await response.json();
    this.setState({ message: result.message, user: null }, () => {
      Router.push("/signin");
    });
  };

  render() {
    const { user, message } = this.state;
    return (
      <div className="header" style={{ padding: 10 }}>
        <NextNProgress
          color="#222"
          startPosition="0.3"
          stopDelayMs="200"
          height="5"
        />
        {message && (
          <div
            className="message"
            style={{ background: "green", padding: "10px" }}
          >
            {message}
          </div>
        )}
        <Link href="/">
          <a style={{ margin: "10px" }}>
            {user ? `Helllo ${user.name}` : null}
          </a>
        </Link>
        {user ? (
          <>
            <Link href="/">
              <a style={{ margin: "10px" }}>Home</a>
            </Link>
            <Link href="/user">
              <a style={{ margin: "10px" }}>Dashboard</a>
            </Link>
            <Link href="/signin">
              <a style={{ margin: "10px" }} onClick={this.handleSignout}>
                Signout
              </a>
            </Link>
          </>
        ) : (
          <>
            <Link href="/signin">
              <a style={{ margin: "10px" }}>Signin</a>
            </Link>
            <Link href="/signup">
              <a style={{ margin: "10px" }}>Signup</a>
            </Link>
          </>
        )}
      </div>
    );
  }
}

export default Header;
