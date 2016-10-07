import './CompFontOptionPane.scss';

import React, { Component, PropTypes } from 'react';
import { Panel, FormControl } from 'react-bootstrap';

export default class CompFontOptionPane extends Component {

  static propTypes = {
    title: PropTypes.string,
    fontList: PropTypes.array.isRequired, 
    selectedFont: PropTypes.string.isRequired,
    onChooseFont: PropTypes.func
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

  render () {
    let { title } = this.props;

    return (
      <div className="text-option-pane">
        <Panel header={title} bsStyle="info">
          <Panel header="Choose Your Font" bsStyle="info">
            <FormControl componentClass="select" placeholder="" onChange={this.onChooseFont.bind(this)} defaultValue={this.props.selectedFont}>
              <option value="">Select Font</option>
              {this.render_font_list()}
            </FormControl>
          </Panel>
        </Panel>
      </div>
    );
  }
}