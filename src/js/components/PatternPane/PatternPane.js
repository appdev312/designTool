import './PatternPane.scss';

import React, { Component, PropTypes } from 'react';
import { Panel, Button, Thumbnail } from 'react-bootstrap';
import classnames from 'classnames';

import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import GraphicPlaceHolder from '../GraphicPane/GraphicPlaceHolder';

export default class PatternPane extends Component {

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,

    patternList: PropTypes.array.isRequired, 
    selected: PropTypes.object,
    onChoosePattern: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: props.selected ? props.selected : props.patternList[0]
    };
  }

  onClickThumbnail(cl) {
    this.setState( {selected: cl});
    
    if (this.props.onChoosePattern) {
      this.props.onChoosePattern(cl);
    }
  }

  render_pattern_thumbnails(thumbs) {
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

  componentDidMount() {
    // When scrolling inside each panel, we have to force check (lazy load)
    var _thumbs = document.querySelectorAll('div.choose-pattern-panel .panel-body');
    if (_thumbs && _thumbs.length > 0) {
        _thumbs[0].addEventListener('scroll', this.onEntered.bind(this));
    }
  }

  // Manually check if the thumbnails are viewable, perform lazy-loading
  onEntered(e) {
    forceCheck();
  }

  render () {
    let { title, subtitle } = this.props;
    if (typeof subtitle === "undefined") {
      subtitle = "Choose a Pattern";
    }

    return (
      <div className="pattern-option-pane">
        <Panel header={title} bsStyle="info">
          <Panel header={subtitle} bsStyle="info" className="choose-pattern-panel">
            <ol>
              {this.render_pattern_thumbnails()}
            </ol>
          </Panel>
        </Panel>
      </div>
    );
  }
}