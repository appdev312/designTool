import './CompPatternPane.scss';

import React, { Component, PropTypes } from 'react';
import { Panel, Button, Thumbnail } from 'react-bootstrap';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';
import classnames from 'classnames';
import {Motion, spring} from 'react-motion';
import ReactDOM from 'react-dom';
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import GraphicPlaceHolder from '../GraphicPane/GraphicPlaceHolder';

addStyle(Button, 'tap');
export default class CompPatternPane extends Component {

  static propTypes = {
    title: PropTypes.string,

    patternList: PropTypes.array.isRequired, 
    selected: PropTypes.object,
    onChoosePattern: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: props.selected ? props.selected : props.patternList[0],
      open: false
    };
  }

  onClickThumbnail(cl) {
    this.setState( {selected: cl, open: false} );
    
    if (this.props.onChoosePattern) {
      this.props.onChoosePattern(cl);
    }
  }

  // Manually check if the thumbnails are viewable, perform lazy-loading
  onEntered(e) {
    forceCheck();
  }

  render_pattern_thumbnails() {
    return this.props.patternList.map((thumb, i) =>
      (
        <li key={i}>
          <LazyLoad once={true} height={70} offset={[-15, 0]} placeholder={<GraphicPlaceHolder />}>
            <a 
              href="#" 
              className={classnames('pattern-thumbnail', { 'selected': this.state.selected === thumb })}
              alt="No Image" 
              style={ {backgroundImage: 'url(' + thumb.thumbPath + ')'} }
              onClick={this.onClickThumbnail.bind(this, thumb)}
            />
          </LazyLoad>
        </li>
      )
    );
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

    // When scrolling inside each panel, we have to force check (lazy load)
    var _thumbs = document.querySelectorAll('div.choose-pattern-panel .category-thumbs');
    if (_thumbs && _thumbs.length > 0) {
        _thumbs[0].addEventListener('scroll', this.onEntered.bind(this));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onOutsideTap.bind(this));
  }

  onOutsideTap(e) {   
    const graphicPane = ReactDOM.findDOMNode(this.graphicPane);
    const tapButton = ReactDOM.findDOMNode(this.tapButton);

    if (graphicPane && !graphicPane.contains(e.target) && tapButton !== e.target) {
      this.setState({open: false});
    }
  }

  render () {
    let { title } = this.props;

    return (
      <div className="mb-pattern-option-pane">
        <Panel header={title} bsStyle="info">
          <Button bsStyle="tap" onClick={this.onClickTap.bind(this)} ref={(ref)=>this.tapButton=ref}>Tap To Choose a Pattern:</Button>
          <Motion defaultStyle={{x: -700}} style={{x: spring(this.state.open ? 0 : -700)}}>
            {({x}) =>
              <div className="choose-pattern-panel" style={{
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`,
              }} ref={(ref)=>this.graphicPane=ref}>
                <div className="category-thumbs">
                  <ol>
                    {this.render_pattern_thumbnails()}
                  </ol>
                </div>
              </div>
            }
          </Motion>
        	
        </Panel>
      </div>
    );
  }
}
