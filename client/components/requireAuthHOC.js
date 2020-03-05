import React from "react";
import Router from "next/router";

const requireAuthHOC = WrappedComponent => {
  class DecoratedComponent extends React.Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      if (!localStorage.getItem("token")) this.shouldNavigateAway();
    }

    shouldNavigateAway = () => {
      if (!localStorage.getItem("token")) {
        Router.push("/signin");
      } else {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.role === 1) {
          Router.push("/admin");
        } else {
          Router.push("/user");
        }
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return DecoratedComponent;
};

export default requireAuthHOC;
