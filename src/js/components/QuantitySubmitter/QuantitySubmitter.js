import './QuantitySubmitter.scss';

import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { NumberSpinner } from '../';

export default class QuantitySubmitter extends Component {

  static propTypes = {
    title: PropTypes.string,
    onSubmit: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      quantity: "0"
    };
  }

  changeQuantity(e) {
    this.setState({
      quantity: e
    });
  }

  render () {
    let { title, onSubmit } = this.props;

    return (
      <div className="quantity-submitter">
        <Panel header={title} bsStyle="info">
          <div className="quantity-label">Quantity: </div>
          <div className="quantity-spinner">
            <NumberSpinner value={this.state.quantity} onChange={this.changeQuantity.bind(this)} />
          </div>
          <div className="submit-button">
            <Button bsStyle="default" bsSize="small" onClick={onSubmit(this.state.quantity)}>Submit</Button>
          </div>
        </Panel>
      </div>
    );
  }
}