import React from "react";

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

export default Input;
