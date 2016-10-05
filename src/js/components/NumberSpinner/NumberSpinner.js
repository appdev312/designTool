import './NumberSpinner.scss';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

export default class NumberSpinner extends Component {

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value || "0"
    };
  }

  onNumberUp(e) {
    this.txtNumber.value = parseInt(this.txtNumber.value, 10) + 1;
    this.onValueChange(e);
  }

  onNumberDown(e) {
    this.txtNumber.value = parseInt(this.txtNumber.value, 10) - 1;
    this.onValueChange(e);
  }

  onValueChange(e) {
    if (isNaN(this.txtNumber.value)) {
      this.setState({ value: "0" });
    } else {
      this.setState({ value: this.txtNumber.value });
    }

    this.props.onChange(this.txtNumber.value);
  }

  render () {
    let { value, onChange } = this.props;

    return (
      <div className="number-spinner">
        <input type="text" className="form-control" value={this.state.value} min="0" ref={(ref) => this.txtNumber = ref} onChange={this.onValueChange.bind(this)} />
        <div className="input-group-btn-vertical">
          <Button bsStyle="default" bsSize="xsmall" onClick={this.onNumberUp.bind(this)}>
            <i className="fa fa-caret-up"></i>
          </Button>
          <Button bsStyle="default" bsSize="xsmall" onClick={this.onNumberDown.bind(this)} disabled={!(parseInt(this.state.value) > 0)}>
            <i className="fa fa-caret-down"></i>
          </Button>
        </div>
      </div>
    );
  }
}