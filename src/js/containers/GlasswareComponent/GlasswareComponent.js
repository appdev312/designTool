import './GlasswareComponent.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { TopMenu, GlasswareCanvasComponent, AccordionPane, ColorOptionPane, TextOptionPane, QuantitySubmitter, CompFontOptionPane, CompTextOptionPane } from '../../components';
import { graphicEntryActions, colorEntryActions, fontEntryActions, glasswareActions } from '../../actions';
import { MOBILE_LIMIT } from '../../constants/actionTypes';

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
    changeText: PropTypes.func.isRequired,

    canUndo: PropTypes.bool.isRequired,
    canRedo: PropTypes.bool.isRequired,
    onUndo: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      queryParam: this.props.location.query,
      colorList: [],
      windowWidth: window.innerWidth
    };

    // Load layout data for Glassware
    this.props.loadGraphicEntries('glassware');
    this.props.loadColorEntries('glassware');
    this.props.loadFontEntries('glassware');
  }

  handleResize(e) {
    this.setState({windowWidth: window.innerWidth});
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
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
    const { topMenu, topMenuActions, apiData, glassware, canUndo, canRedo } = this.props;
    let isFetching = apiData.graphic.isFetching || apiData.color.isFetching || apiData.font.isFetching;
    let buttonList = (this.state.windowWidth >= MOBILE_LIMIT) ? glassware.buttonList : glassware.mbButtonList;
   
    return (
      <div className = "wrapper">
        {/* Top Menu with buttons */}
        <TopMenu
          buttonList={buttonList}
          selected={glassware.topButton}
          topMenuOptions={{
            layout: 'A', 
            backgroundColor: glassware.selectedColor.colorName ? glassware.selectedColor.colorName:'', 
            borderColor: '',
            design: glassware.selectedThumbnail.name,
            canUndo: canUndo,
            canRedo: canRedo
          }}
          onGoBack={()=>this.props.onUndo}
          onGoForward={()=>this.props.onRedo}
          onClickButton={this.props.selTopButton}
        />
        {/* Main content */}
        {isFetching && this.loadingBar()}
        {!isFetching &&
          <div className="content-wrapper">
            <Row>
              { 
                this.state.windowWidth >= MOBILE_LIMIT &&
                <Col xs={12} sm={6} md={5}>
                  {/* Left panel with options */}
                  {
                    glassware.topButton === 'Design' && <AccordionPane
                      title="Design Browser (Step 1 of 4)"
                      thumbsData={apiData.graphic.entries}
                      onClickThumbnail={this.props.selectThumbnail}
                      selectedCategory={glassware.selectedCategory}
                      selectedThumbnail={glassware.selectedThumbnail}
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
              }
              { 
                this.state.windowWidth < MOBILE_LIMIT &&
                <Col xs={12} sm={6} md={5}>
                  {/* Left panel with options for mobile view */}
                  {
                    glassware.topButton ==='Text' && <CompTextOptionPane
                      title="Text Options (Step 3 of 6)"
                      lineCount={3}
                      value={glassware.enteredText}
                      onChangeText={this.props.changeText}
                    />
                  }
                  {
                    glassware.topButton ==='Font' && <CompFontOptionPane
                      title="Font Options (Step 4 of 6)"
                      fontList={['Arial', 'Avenida', 'Black Cherry', 'Block']}
                      selectedFont={glassware.selectedFont}
                      onChooseFont={this.props.selectFont}
                    />
                  }
                  {
                    glassware.topButton ==='Quantity' && <QuantitySubmitter
                      title="Quantity (Step 6 of 6)"
                      onSubmit={()=>{}}
                    />
                  }
                </Col>
              }
              <Col xs={12} sm={6} md={7}>
                {/* Drawing canvas */}
                <GlasswareCanvasComponent windowWidth={this.state.windowWidth} />
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
    glassware: state.glassware.present,

    canUndo: state.glassware.past.length > 0,
    canRedo: state.glassware.future.length > 0
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
    changeText: bindActionCreators(glasswareActions.changeText, dispatch),

    onUndo: bindActionCreators(UndoActionCreators.undo, dispatch),
    onRedo: bindActionCreators(UndoActionCreators.redo, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlasswareComponent);