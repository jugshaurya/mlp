// Getting Environment Variables inside Next.js
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { PRODUCTION, API_DEVELOPMENT, API_PRODUCTION } = publicRuntimeConfig;
const API = PRODUCTION ? API_PRODUCTION : API_DEVELOPMENT;

import React from "react";
// import Link from "next/link";
// import Router from "next/router";
import Input from "./Input";

class createSeriesForm extends React.Component {
  state = {
    loading: false,
    error: null,
    message: null,
    name: "new series",
    series: []
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { name } = this.state;
    this.setState({
      loading: true
    });

    const response = await fetch(API + "/series", {
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
    //  Series creation successful
    this.setState(
      {
        error: null,
        message: result.message,
        loading: false,
        name: ""
      },
      () => {
        this.getAllSeries();
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
    this.getAllSeries();
  }

  getAllSeries = async () => {
    this.setState({
      loading: true
    });

    const response = await fetch(API + "/series", {
      method: "GET"
    });

    const result = await response.json();
    if (result.error)
      return this.setState({
        error: result.error,
        message: null,
        loading: false,
        series: []
      });
    //  Series creation successful
    this.setState({
      error: null,
      // message: result.message,
      message: null,
      loading: false,
      series: result.all_series
    });
  };

  renderCreateSeriesForm = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          type="text"
          name="name"
          value={this.state.name}
          placeholder="New Series"
          onChange={this.handleChange}
        />
        <button> Create New Series </button>
      </form>
    );
  };

  renderDeleteConfirmation = name => {
    return window.confirm("sure u wanna delete " + name + " series?");
  };

  handleSeriesDelete = async (e, s) => {
    e.preventDefault();
    const title = s.title;
    const name = s.name;
    const shouldDelete = this.renderDeleteConfirmation(name);
    if (!shouldDelete) return;

    this.setState({ loading: true });
    const response = await fetch(`${API}/series/${title}`, {
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
    //  Series creation successful
    this.setState(
      {
        error: null,
        message: result.message,
        loading: false
      },
      () => {
        this.getAllSeries();
      }
    );
  };

  renderAllSeries = () => {
    return (
      <ul>
        {this.state.series.map(s => (
          <li key={s._id}>
            <button
              title="Double click to delete"
              onDoubleClick={e => this.handleSeriesDelete(e, s)}
            >
              {s.name}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { error, message, loading } = this.state;
    return (
      <div className="create-series">
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
          this.renderCreateSeriesForm()
        )}

        {/* List all the Series */}
        {this.renderAllSeries()}
      </div>
    );
  }
}

export default createSeriesForm;
