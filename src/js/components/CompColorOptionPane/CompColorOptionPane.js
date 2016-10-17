import './CompColorOptionPane.scss';

import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';
import classnames from 'classnames';
import {Motion, spring} from 'react-motion';
import ReactDOM from 'react-dom';

addStyle(Button, 'tap');
export default class CompColorOptionPane extends Component {

  static propTypes = {
    title: PropTypes.string,
    colorList: PropTypes.array.isRequired, 
    selected: PropTypes.object,
    onChooseColor: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: props.selected ? props.selected : props.colorList[0],
      open: false
    };
  }

  onClickColor(cl) {
    this.setState( {selected: cl, open: false});

    if (this.props.onChooseColor) {
      this.props.onChooseColor(cl);
    }
  }

  // click & touch on tap button
  onClickTap(e) {
    e.preventDefault();
    this.setState({open: !this.state.open});
  }

  /*
   * click outside of tap & color pane area
   */
  componentDidMount() {
    window.addEventListener('click', this.onOutsideTap.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onOutsideTap.bind(this));
  }

  onOutsideTap(e) {   
    const colorPane = ReactDOM.findDOMNode(this.colorPane);
    const tapButton = ReactDOM.findDOMNode(this.tapButton);

    if (!colorPane.contains(e.target) && tapButton !== e.target) {
      this.setState({open: false});
    }
  }

  // rendering color thumbnails
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
    let { title } = this.props;

    return (
      <div className="mb-color-option-pane">
        <Panel header={title} bsStyle="info">
          <Button bsStyle="tap" onClick={this.onClickTap.bind(this)} ref={(ref)=>this.tapButton=ref}>Tap To Choose a Color:</Button>
          <Motion defaultStyle={{x: -700}} style={{x: spring(this.state.open ? 0 : -700)}}>
            {({x}) =>
              <div className="choose-color-panel" style={{
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`,
              }} ref={(ref)=>this.colorPane=ref}>
                {this.render_color_thumbnails()}
              </div>
            }
          </Motion>
        	
        </Panel>
      </div>
    );
  }
}