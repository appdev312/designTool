import './GraphicPane.scss';

import React, { Component, PropTypes } from 'react';
import { Accordion, Panel, Thumbnail } from 'react-bootstrap';
import classnames from 'classnames';
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import GraphicPlaceHolder from './GraphicPlaceHolder';

export default class GraphicPane extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    selectedThumbnail: PropTypes.object.isRequired,
    thumbsData: PropTypes.array.isRequired,
    onClickThumbnail: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: props.selectedCategory,
      selectedThumbnail: props.selectedThumbnail
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

  // Manually check if the thumbnails are viewable, perform lazy-loading
  onEntered(e) {
    forceCheck();
  }

  componentDidMount() {
    // When scrolling inside each panel, we have to force check (lazy load)
    this._panelElems = document.querySelectorAll('div.panel-group .panel-body');

    if (this._panelElems && this._panelElems.length > 0) {
      this._panelElems.forEach((_elem) => {
        _elem.addEventListener('scroll', this.onEntered.bind(this));
      })
    }
  }

  onClickThumbnail(thumb) {
    this.setState({ selectedThumbnail: thumb });

    if (this.props.onClickThumbnail) {
      this.props.onClickThumbnail( this.state.selectedCategory, thumb );
    }
  }

  render_thumbnails(thumbs) {
    return thumbs.map((thumb) =>
      (
        <LazyLoad key={thumb.id} once={true} height={70} offset={[-35, 0]} placeholder={<GraphicPlaceHolder />}>
          <li>
            <Thumbnail 
              href="#" 
              className={classnames('design-thumbnail', { 'selected': this.state.selectedThumbnail === thumb })}
              alt="No Image" 
              src={thumb.url} 
              onClick={this.onClickThumbnail.bind(this, thumb)}
            />
          </li>
        </LazyLoad>
      )
    );
  }

  render () {
    let { title, thumbsData, selectedCategory } = this.props;

    return (
      <div className="graphic-pane">
        <Panel header={title} bsStyle="info">
          <Accordion onSelect={this.onSelectCategory.bind(this)} defaultActiveKey={selectedCategory}>
            {
              thumbsData.map((panelData) => 
                (
                  <Panel 
                    header={panelData.category} 
                    eventKey={panelData.category} 
                    key={panelData.category} 
                    bsStyle="info" 
                    onEntered={this.onEntered.bind(this)}
                    ref={panelData.category} 
                  >
                    <ol>
                      {this.render_thumbnails(panelData.thumbnails)}
                    </ol>
                  </Panel>
                )
              )
            }
          </Accordion>
        </Panel>
      </div>
    );
  }
}
