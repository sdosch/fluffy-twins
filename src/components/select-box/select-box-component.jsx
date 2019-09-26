import React, { Component } from "react";
import "./select-box.styles.scss";

class SelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1
    };
  }

  handleSelectChange = selected => {
    this.setState({ selected: selected });
    this.props.onSelectChange(selected);
  };

  render() {
    return (
      <div className="select">
        <label>size:</label>
        <select
          value={this.state.selected}
          onChange={e => this.handleSelectChange(e.target.value)}
        >
          {this.props.options.map(option => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default SelectBox;
