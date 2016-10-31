import './ColorOptionPane.scss';

import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';

export default class ColorOptionPane extends Component {

  static propTypes = {
    title: PropTypes.string,
    colorList: PropTypes.array.isRequired, 
    selected: PropTypes.object,
    onChooseColor: PropTypes.func,
    subtitle: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: props.selected ? props.selected : props.colorList[0]
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
          className={classnames('color-thumbnail', { 'selected': this.state.selected.colorName === cl.colorName })}
          key={cl.colorRGB}
          style={{ backgroundColor: cl.colorRGB }}
          onClick={this.onClickColor.bind(this, cl)}
        />
      )
    );
  }

  render () {
    let { title, subtitle } = this.props;
    if (typeof subtitle === "undefined") {
      subtitle = "Choose a Color:";
    }

    return (
      <div className="color-option-pane">
        <Panel header={title} bsStyle="info">
          <Panel header={subtitle} bsStyle="info" className="choose-color-panel">
            {this.render_color_thumbnails()}
          </Panel>
        </Panel>
      </div>
    );
  }
}