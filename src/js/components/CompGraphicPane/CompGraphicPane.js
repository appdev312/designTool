import './CompGraphicPane.scss';

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
export default class CompGraphicPane extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    selectedThumbnail: PropTypes.object.isRequired,
    thumbsData: PropTypes.array.isRequired,
    onClickThumbnail: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedCategory: props.selectedCategory,
      selectedThumbnail: props.selectedThumbnail,
      open: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedCategory: nextProps.selectedCategory,
      selectedThumbnail: nextProps.selectedThumbnail
    });
  }

  onSelectCategory(e) {
    this.setState({ selectedCategory: e });
  }

  onClickThumbnail(thumb) {
    this.setState({ selectedThumbnail: thumb, open: false });

    if (this.props.onClickThumbnail) {
      this.props.onClickThumbnail( this.state.selectedCategory, thumb );
    }
  }

  // Manually check if the thumbnails are viewable, perform lazy-loading
  onEntered(e) {
    forceCheck();
  }

  render_thumbnails(thumbs) {
    return thumbs.map((thumb) =>
      (
        <li key={thumb.id}>
          <LazyLoad once={true} height={70} offset={[-15, 0]} placeholder={<GraphicPlaceHolder />}>
            <Thumbnail 
              href="#" 
              className={classnames('design-thumbnail', { 'selected': this.state.selectedThumbnail === thumb })}
              alt="No Image" 
              src={thumb.url} 
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
    var _thumbs = document.querySelectorAll('div.choose-graphic-panel .category-thumbs');
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
    let { title, thumbsData } = this.props;
    let thumbnails = (thumbsData.find((panelData)=>panelData.category === this.state.selectedCategory) || {}).thumbnails || [];

    return (
      <div className="mb-graphic-option-pane">
        <Panel header={title} bsStyle="info">
          <Button bsStyle="tap" onClick={this.onClickTap.bind(this)} ref={(ref)=>this.tapButton=ref}>Tap To Choose a Graphic:</Button>
          <Motion defaultStyle={{x: -700}} style={{x: spring(this.state.open ? 0 : -700)}}>
            {({x}) =>
              <div className="choose-graphic-panel" style={{
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`,
              }} ref={(ref)=>this.graphicPane=ref}>
                <div className="category-buttons">
                {
                  thumbsData.map((panelData) => 
                    (
                      <button
                        className={classnames('btn btn-xs btn-info', { 'selected': panelData.category === this.state.selectedCategory })}
                        key={panelData.category} onClick={this.onSelectCategory.bind(this, panelData.category)}>{panelData.category}</button>
                    )
                  )
                }
                </div>
                <div className="category-thumbs">
                  <ol>
                    {this.render_thumbnails(thumbnails)}
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
