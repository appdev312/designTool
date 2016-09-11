import './GlasswareComponent.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import { TopMenu, ProductHolder, ColorOptionPane } from '../../components';
import { graphicEntryActions } from '../../actions';

class GlasswareComponent extends Component {
  
  static propTypes = {
    loadGraphicEntries: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      queryParam: this.props.location.query
    };
  }

  componentWillMount() {
    this.props.loadGraphicEntries('glassware');
  }

  render () {
    const { topMenu, topMenuActions } = this.props;

    return (
      <div className = "wrapper">
        {/* Top Menu with buttons */}
        <TopMenu
          buttonList={['Design', 'Color', 'Text', 'Add Ons']}
          selected='Design'
          topMenuOptions={{layout: 'A', backgroundColor: '', borderColor: ''}}
          onGoBack={()=>{}}
          onGoForward={()=>{}}
        />
        <div className="content-wrapper">
          <Row>
            <Col xs={5} md={5}>
              {/* Left panel with options */}
              <ColorOptionPane 
                title='Color Options (Step 2 of 4)'
                colorList={['rgb(0,0,0)', 'rgb(255,255,255)', 'rgb(255,209,0)']}
                selected='rgb(0,0,0)'
              />
            </Col>
            <Col xs={7} md={7}>
              {/* Drawing canvas */}
              <ProductHolder />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadGraphicEntries: bindActionCreators(graphicEntryActions.loadGraphicEntries, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlasswareComponent);