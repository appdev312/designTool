import './ColorOptionPane.scss';

import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';

export default class ColorOptionPane extends Component {

  static propTypes = {
    title: PropTypes.string,
    colorList: PropTypes.array.isRequired, 
    selected: PropTypes.string.isRequired,
    onChooseColor: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: props.selected
    };
  }

  onClickColor(cl) {
    this.setState( {selected: cl});
    
    if (this.props.onChooseColor) {
      this.props.onChooseColor(cl);
    }
  }

  render_color_thumbnails() {
    return this.props.colorList.map((cl) =>
      (
        <a 
          href="#"
          className={classnames('color-thumbnail', { 'selected': this.state.selected === cl })}
          key={cl}
          style={{ backgroundColor: cl }}
          onClick={this.onClickColor.bind(this, cl)}
        />
      )
    );
  }

  render () {
    let { title } = this.props;

    return (
      <div className="color-option-pane">
        <Panel header={title} bsStyle="info">
          <Panel header="Choose a Color:" bsStyle="info" className="choose-color-panel">
            {this.render_color_thumbnails()}
          </Panel>
        </Panel>
      </div>
    );
  }
}