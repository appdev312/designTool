import './CompTextOptionPane.scss';

import React, { Component, PropTypes } from 'react';
import { Panel, FormGroup, FormControl, Form, Col, ControlLabel } from 'react-bootstrap';

export default class CompTextOptionPane extends Component {

  static propTypes = {
    title: PropTypes.string,
    lineCount: PropTypes.number.isRequired,
    value: PropTypes.array.isRequired, 
    onChangeText: PropTypes.func
  };

  onChangeText(line, e) {
    if (this.props.onChangeText)
    {
      this.props.onChangeText(line, e.target.value);
    }
  }

  render () {
    let { title, value } = this.props;

    return (
      <div className="text-option-pane">
        <Panel header={title} bsStyle="info">
          <Panel header="Enter Your Text" bsStyle="info">
            <Form horizontal>
            {
              [...Array(this.props.lineCount)].map((x, line) => 
                (
                  <FormGroup controlId="formHorizontalEmail" key={line}>
                    <Col componentClass={ControlLabel} sm={3}>
                      Line {line + 1}:
                    </Col>
                    <Col sm={8}>
                      <FormControl type="text" placeholder="" onChange={this.onChangeText.bind(this, line)} value={value[line]}/>
                    </Col>
                  </FormGroup>
                )
              )
            } 
            </Form>
          </Panel>
        </Panel>
      </div>
    );
  }
}