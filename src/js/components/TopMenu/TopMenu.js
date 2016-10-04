import './TopMenu.scss';

import React, { Component, PropTypes } from 'react';
import { Button, Row, Col, Glyphicon } from 'react-bootstrap';

export default class TopMenu extends Component {

  static propTypes = {
    buttonList: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    topMenuOptions: PropTypes.object.isRequired,
    onClickButton: PropTypes.func,
    onGoBack: PropTypes.func.isRequired,
    onGoForward: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected
    });
  }

  onClickButton(bt) {
    this.setState({ selected: bt });

    if (this.props.onClickButton) {
      this.props.onClickButton(bt);
    }
  }

  renderButtons() {
    return this.props.buttonList.map((bt) =>
      (
        <Button 
          bsStyle="default" 
          bsSize="small" 
          key={bt}
          active={this.state.selected == bt ? true : false}
          onClick={this.onClickButton.bind(this, bt)}
        >
        {bt}
        </Button>
      )
    );
  }

  render () {
    let { topMenuOptions } = this.props;

    return (
      <div className = "topmenu bg-info">
        <Row>
          <Col xs={4} md={4}>
            {this.renderButtons()}
          </Col>
          <Col xs={3} md={3}>
            <div>
              Layout: <strong>{topMenuOptions.layout}</strong>
            </div>
            <div>
              Background Color: <strong>{topMenuOptions.backgroundColor}</strong>
            </div>
            <div>
              Border Color: <strong>{topMenuOptions.borderColor}</strong>
            </div>
          </Col>
          <Col xs={3} md={3}>
            <div>
              Pattern: <strong>{topMenuOptions.pattern}</strong>
            </div>
            <div>
              Pattern Color: <strong>{topMenuOptions.patternColor}</strong>
            </div>
            <div>
              Design: <strong>{topMenuOptions.design}</strong>
            </div>
          </Col>
          <Col xs={2} md={2}>
            <div className = "pull-right">
              <Button bsStyle="default" bsSize="xsmall" onClick={this.props.onGoBack()} disabled={!topMenuOptions.canUndo}>
                <Glyphicon glyph="chevron-left" />
              </Button>
              <Button bsStyle="default" bsSize="xsmall" onClick={this.props.onGoForward()} disabled={!topMenuOptions.canRedo}>
                <Glyphicon glyph="chevron-right" />
              </Button>
            </div>
          </Col>
        </Row>
        <p className="fashioncraftStandardInstructions">
          When you are ready, just fill in all your choices in the menus provided on the product page.
        </p>
      </div>
    );
  }
}
