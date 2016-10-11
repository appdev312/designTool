import './GlasswareCanvasComponent.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Row, Col } from 'react-bootstrap';
import { glasswareActions } from '../../actions';
import { MOBILE_LIMIT, BASE_PATH } from '../../constants/actionTypes';

class GlasswareCanvasComponent extends Component {

  static propTypes = {
    glassware: PropTypes.object.isRequired,
    selTopButton: PropTypes.func.isRequired,
    windowWidth: PropTypes.number
  };

  constructor(props) {
    super(props);

    // buttonList changes based on mobile/desktop view
    let buttonList = (props.windowWidth >= MOBILE_LIMIT) ? props.glassware.buttonList : props.glassware.mbButtonList;
    
    this.state = {
      buttonList: buttonList,
      prevEnabled: buttonList.indexOf(props.glassware.topButton) === 0, 
      fwdEnabled: buttonList.indexOf(props.glassware.topButton) === buttonList.length - 1,
      windowWidth: props.windowWidth
    };
  }

  componentWillReceiveProps(nextProps) {
    // buttonList changes based on mobile/desktop view
    let buttonList = (nextProps.windowWidth >= MOBILE_LIMIT) ? nextProps.glassware.buttonList : nextProps.glassware.mbButtonList;

    this.setState({
      buttonList: buttonList,
      prevEnabled: buttonList.indexOf(nextProps.glassware.topButton) === 0,
      fwdEnabled: buttonList.indexOf(nextProps.glassware.topButton) === buttonList.length - 1,
      windowWidth: nextProps.windowWidth
    });
  }

  onClickPrevButton() {
    var buttonList = this.state.buttonList,
        topButton = this.props.glassware.topButton;
    this.props.selTopButton(buttonList[buttonList.indexOf(topButton) - 1]);
  }

  onClickFwdButton() {
    var buttonList = this.state.buttonList,
        topButton = this.props.glassware.topButton;
    this.props.selTopButton(buttonList[buttonList.indexOf(topButton) + 1]);
  }

  render () {
    var { selectedThumbnail, selectedColor, enteredText, selectedFont } = this.props.glassware;
    var lineTexts = [];
    var clipartURL = BASE_PATH + "/images/glassware/graphics/layoutA/";
    const backgroundImage = BASE_PATH + "/images/glassware/background/3421.jpg";

    // default color is black
    if (selectedColor == "") {
      selectedColor = { colorName: "black" };
    }

    // if selected a design
    if (selectedThumbnail.url) {
      if (selectedColor.colorName) {
        clipartURL = clipartURL + selectedColor.colorName.replace(/\s+/g, '-').toLowerCase() + '/' + selectedThumbnail.graphicFullPath;
      } else {
        clipartURL = clipartURL + 'black/' + selectedThumbnail.graphicFullPath;
      }
    }

    for (var i = 0; i < enteredText.length; i ++)
      if (enteredText[i] !== '') {
        lineTexts.push(enteredText[i]);
      }

    return (
      <div className="product-container">
        <div className="visible-area" style={{width: '392px'}}>
          {
            this.state.windowWidth < MOBILE_LIMIT &&
            <div className="button-wrapper">
              <Button bsStyle="default" bsSize="small" className="prev-button" 
                disabled={this.state.prevEnabled} onClick={this.onClickPrevButton.bind(this)}>Prev</Button>
              <Button bsStyle="default" bsSize="small" className="next-button" 
                disabled={this.state.fwdEnabled} onClick={this.onClickFwdButton.bind(this)}>Next</Button>
            </div>
          }
          <div className="canvas-wrapper" style={{height: '542px'}}>
            <div className="background-layer">
              <img id="craft-background" src={backgroundImage} />
            </div>
            <div className="craft-layer">
              {
                selectedThumbnail.url && (<img id="clipart" src={clipartURL} />)
              }
              <p id="text-line1" style={{color: selectedColor.colorRGB, fontFamily: selectedFont}}>{lineTexts[0]}</p>
              <p id="text-line2" style={{color: selectedColor.colorRGB, fontFamily: selectedFont}}>{lineTexts[1]}</p>
              <p id="text-line3" style={{color: selectedColor.colorRGB, fontFamily: selectedFont}}>{lineTexts[2]}</p>
            </div>
          </div>
          {
            this.state.windowWidth >= MOBILE_LIMIT &&
            <div className="button-wrapper">
              <Button bsStyle="default" bsSize="small" className="prev-button" 
                disabled={this.state.prevEnabled} onClick={this.onClickPrevButton.bind(this)}>Prev</Button>
              <Button bsStyle="default" bsSize="small" className="next-button" 
                disabled={this.state.fwdEnabled} onClick={this.onClickFwdButton.bind(this)}>Next</Button>
            </div>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    glassware: state.glassware.present
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selTopButton: bindActionCreators(glasswareActions.selTopButton, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlasswareCanvasComponent);