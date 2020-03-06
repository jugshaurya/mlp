// Getting Environment Variables inside Next.js
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { PRODUCTION, API_DEVELOPMENT, API_PRODUCTION } = publicRuntimeConfig;
const API = PRODUCTION ? API_PRODUCTION : API_DEVELOPMENT;

import React from "react";
// import Link from "next/link";
// import Router from "next/router";
import Input from "./Input";

class createTagForm extends React.Component {
  state = {
    loading: false,
    error: null,
    message: null,
    name: "new tag",
    tags: []
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { name } = this.state;
    this.setState({
      loading: true
    });

    const response = await fetch(API + "/tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      },
      body: JSON.stringify({
        name
      })
    });
    const result = await response.json();
    if (result.error)
      return this.setState({
        error: result.error,
        message: null,
        loading: false
      });
    //  Tag creation successful
    this.setState(
      {
        error: null,
        message: result.message,
        loading: false,
        name: ""
      },
      () => {
        this.getAllTags();
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

  componentDidMount() {
    this.getAllTags();
  }

  getAllTags = async () => {
    this.setState({
      loading: true
    });

    const response = await fetch(API + "/tag", {
      method: "GET"
    });

    const result = await response.json();
    if (result.error)
      return this.setState({
        error: result.error,
        message: null,
        loading: false,
        tags: []
      });
    //  Tag creation successful
    this.setState({
      error: null,
      // message: result.message,
      message: null,
      loading: false,
      tags: result.all_tags
    });
  };

  renderCreateTagForm = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          type="text"
          name="name"
          value={this.state.name}
          placeholder="New Tag"
          onChange={this.handleChange}
        />
        <button> Create New Tag </button>
      </form>
    );
  };

  renderDeleteConfirmation = name => {
    return window.confirm("sure u wanna delete " + name + " tag?");
  };

  handleTagDelete = async (e, t) => {
    e.preventDefault();
    const title = t.title;
    const name = t.name;
    const shouldDelete = this.renderDeleteConfirmation(name);
    if (!shouldDelete) return;

    this.setState({ loading: true });
    const response = await fetch(`${API}/tag/${title}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });
    const result = await response.json();
    if (result.error)
      return this.setState({
        error: result.error,
        message: null,
        loading: false
      });
    //  Tag creation successful
    this.setState(
      {
        error: null,
        message: result.message,
        loading: false
      },
      () => {
        this.getAllTags();
      }
    );
  };

  renderAllTags = () => {
    return (
      <ul>
        {this.state.tags.map(t => (
          <li key={t._id}>
            <button
              title="Double click to delete"
              onDoubleClick={e => this.handleTagDelete(e, t)}
            >
              {t.name}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { error, message, loading } = this.state;
    return (
      <div className="create-tag">
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
          this.renderCreateTagForm()
        )}

        {/* List all the Tags */}
        {this.renderAllTags()}
      </div>
    );
  }
}

export default createTagForm;
