import './AccordionPane.scss';

import React, { Component, PropTypes } from 'react';
import { Accordion, Panel, Thumbnail } from 'react-bootstrap';
import classnames from 'classnames';

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
  }

  onClickThumbnail(thumb) {
    this.setState({ selectedThumbnail: thumb });

    if (this.props.onClickThumbnail) {
      this.props.onClickThumbnail( this.state.selectedCategory, this.state.selectedThumbnail );
    }
  }

  render_thumbnails(thumbs) {
    return thumbs.map((thumb) =>
      (
        <li key={thumb.name}>
          <Thumbnail 
            href="#" 
            className={classnames('design-thumbnail', { 'selected': this.state.selectedThumbnail === thumb })}
            alt="No Image" 
            src={thumb.url} 
            onClick={this.onClickThumbnail.bind(this, thumb)}
          />
        </li>
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
