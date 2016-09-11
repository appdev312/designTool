import './TextOptionPane.scss';

import React, { Component, PropTypes } from 'react';
import { Panel, FormGroup, FormControl, Form, Col, ControlLabel } from 'react-bootstrap';

export default class TextOptionPane extends Component {

  static propTypes = {
    title: PropTypes.string,
    fontList: PropTypes.array.isRequired, 
    lineCount: PropTypes.number.isRequired,
    onChooseFont: PropTypes.func,
    onChangeText: PropTypes.func
  };

  render_font_list() {
    return this.props.fontList.map((ft) =>
      (
        <option value={ft} key={ft}>{ft}</option>
      )
    );
  }

  onChooseFont(e) {
    if (this.props.onChooseFont)
    {
      this.props.onChooseFont(e.target.value);
    }
  }

  onChangeText(line, e) {
    if (this.props.onChangeText)
    {
      this.props.onChangeText(line + 1, e.target.value);
    }
  }

  render () {
    let { title } = this.props;

    return (
      <div className="text-option-pane">
        <Panel header={title} bsStyle="info">
          <Panel header="Choose Your Font" bsStyle="info">
            <FormControl componentClass="select" placeholder="" onChange={this.onChooseFont.bind(this)}>
              <option value="">Select Font</option>
              {this.render_font_list()}
            </FormControl>
          </Panel>
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
                      <FormControl type="text" placeholder="" onChange={this.onChangeText.bind(this, line)}/>
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