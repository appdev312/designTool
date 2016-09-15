import './GlasswareComponent.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import { TopMenu, ProductHolder, AccordionPane, ColorOptionPane, TextOptionPane } from '../../components';
import { graphicEntryActions, colorEntryActions, fontEntryActions, glasswareActions } from '../../actions';

class GlasswareComponent extends Component {
  
  static propTypes = {
    apiData: PropTypes.object.isRequired,
    glassware: PropTypes.object.isRequired,

    loadGraphicEntries: PropTypes.func.isRequired,
    loadColorEntries: PropTypes.func.isRequired,
    loadFontEntries: PropTypes.func.isRequired,
    selTopButton: PropTypes.func.isRequired,
    selectColor: PropTypes.func.isRequired,
    selectThumbnail: PropTypes.func.isRequired,
    selectFont: PropTypes.func.isRequired,
    changeText: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      queryParam: this.props.location.query,
      colorList: []
    };

    // Load layout data for Glassware
    this.props.loadGraphicEntries('glassware');
    this.props.loadColorEntries('glassware');
    this.props.loadFontEntries('glassware');
  }

  componentWillReceiveProps() {
  }

  loadingBar() {
    return (
      <div className="progress">
        <div className="progress-bar progress-bar-striped active" role="progressbar"
        aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}> Loading ...
        </div>
      </div>
    );
  }

  render () {
    const { topMenu, topMenuActions, apiData, glassware } = this.props;
    let isFetching = apiData.graphic.isFetching || apiData.color.isFetching || apiData.font.isFetching;

    return (
      <div className = "wrapper">
        {/* Top Menu with buttons */}
        <TopMenu
          buttonList={['Design', 'Color', 'Text', 'Add Ons']}
          selected='Design'
          topMenuOptions={{layout: 'A', backgroundColor: '', borderColor: ''}}
          onGoBack={()=>{}}
          onGoForward={()=>{}}
          onClickButton={this.props.selTopButton}
        />
        {isFetching && this.loadingBar()}
        {!isFetching &&
          <div className="content-wrapper">
            <Row>
              <Col xs={5} md={5}>
                {/* Left panel with options */}
                {
                  glassware.topButton === 'Design' && <AccordionPane
                    title="Design Browser (Step 1 of 4)"
                    thumbsData={apiData.graphic.entries}
                    onClickThumbnail={this.props.selectThumbnail}
                  />
                }
                {
                  glassware.topButton ==='Color' && <ColorOptionPane 
                    title='Color Options (Step 2 of 4)'
                    colorList={apiData.color.entries}
                    selected={glassware.selectedColor}
                    onChooseColor={this.props.selectColor}
                  />
                }
                {
                  glassware.topButton === 'Text' && <TextOptionPane
                    title="Text Options (Step 3 of 4)"
                    fontList={['Arial', 'Avenida', 'Black Cherry', 'Block']}
                    selectedFont={glassware.selectedFont}
                    lineCount={3}
                    value={glassware.enteredText}
                    onChooseFont={this.props.selectFont}
                    onChangeText={this.props.changeText}
                  />
                }
              </Col>
              <Col xs={7} md={7}>
                {/* Drawing canvas */}
                <ProductHolder />
              </Col>
            </Row>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    apiData: state.apiData,
    glassware: state.glassware
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadGraphicEntries: bindActionCreators(graphicEntryActions.loadGraphicEntries, dispatch),
    loadColorEntries: bindActionCreators(colorEntryActions.loadColorEntries, dispatch),
    loadFontEntries: bindActionCreators(fontEntryActions.loadFontEntries, dispatch),

    selTopButton: bindActionCreators(glasswareActions.selTopButton, dispatch),
    selectColor: bindActionCreators(glasswareActions.selectColor, dispatch),
    selectThumbnail: bindActionCreators(glasswareActions.selectThumbnail, dispatch),
    selectFont: bindActionCreators(glasswareActions.selectFont, dispatch),
    changeText: bindActionCreators(glasswareActions.changeText, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlasswareComponent);