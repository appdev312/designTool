import './AccordionPane.scss';

import React, { Component, PropTypes } from 'react';
import { Accordion, Panel, Thumbnail } from 'react-bootstrap';
import classnames from 'classnames';
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import AccordionPlaceHolder from './AccordionPlaceHolder.js';

export default class AccordionPane extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    thumbsData: PropTypes.array.isRequired,
    onClickThumbnail: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: "",
      selectedThumbnail: {}
    };
  }

  onSelectCategory(e) {
    this.setState({ selectedCategory: e });

    // Manually check if the thumbnails are viewable, perform lazy-loading
    setTimeout(function() { 
      forceCheck();
    }, 500);
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
        <LazyLoad key={thumb.id} once height={70} offset={[-5, 0]} placeholder={<AccordionPlaceHolder />}>
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
    let { title, thumbsData } = this.props;

    return (
      <div className="accordion-pane">
        <Panel header={title} bsStyle="info">
          <Accordion onSelect={this.onSelectCategory.bind(this)}>
            {
              thumbsData.map((panelData) => 
                (
                  <Panel header={panelData.category} eventKey={panelData.category} key={panelData.category} bsStyle="info">
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
