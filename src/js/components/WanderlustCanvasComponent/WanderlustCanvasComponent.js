import './WanderlustCanvasComponent.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Row, Col } from 'react-bootstrap';
import { wanderlustActions } from '../../actions';
import { MOBILE_LIMIT, BASE_PATH } from '../../constants/actionTypes';

class WanderlustCanvasComponent extends Component {

  static propTypes = {
    wanderlust: PropTypes.object.isRequired,
    selTopButton: PropTypes.func.isRequired,
    windowWidth: PropTypes.number
  };

  constructor(props) {
    super(props);

    // buttonList changes based on mobile/desktop view
    let buttonList = (props.windowWidth >= MOBILE_LIMIT) ? props.wanderlust.buttonList : props.wanderlust.mbButtonList;
    
    this.state = {
      buttonList: buttonList,
      prevEnabled: buttonList.indexOf(props.wanderlust.topButton) === 0, 
      fwdEnabled: buttonList.indexOf(props.wanderlust.topButton) === buttonList.length - 1,
      windowWidth: props.windowWidth
    };
  }

  componentWillReceiveProps(nextProps) {
    // buttonList changes based on mobile/desktop view
    let buttonList = (nextProps.windowWidth >= MOBILE_LIMIT) ? nextProps.wanderlust.buttonList : nextProps.wanderlust.mbButtonList;

    this.setState({
      buttonList: buttonList,
      prevEnabled: buttonList.indexOf(nextProps.wanderlust.topButton) === 0,
      fwdEnabled: buttonList.indexOf(nextProps.wanderlust.topButton) === buttonList.length - 1,
      windowWidth: nextProps.windowWidth
    });
  }

  onClickPrevButton() {
    var buttonList = this.state.buttonList,
        topButton = this.props.wanderlust.topButton;
    this.props.selTopButton(buttonList[buttonList.indexOf(topButton) - 1]);
  }

  onClickFwdButton() {
    var buttonList = this.state.buttonList,
        topButton = this.props.wanderlust.topButton;
    this.props.selTopButton(buttonList[buttonList.indexOf(topButton) + 1]);
  }

  render () {
    let { selectedThumbnail, selectedPattern, selectedColor, selectedFontColor, enteredText, selectedFont } = this.props.wanderlust;
    var lineTexts = [];
    const backgroundImage = BASE_PATH + "/images/wanderlust/background/layout3-overlay-1.png";

    if (selectedColor == "") {
      selectedColor = { colorName: "black" }; // default background color
    }

    if (selectedFontColor == "") {
      selectedFontColor = { colorRGB: "rgb(255,255,255)" }; // default font color
    }

    for (var i = 0; i < enteredText.length; i ++)
      if (enteredText[i] !== '') {
        lineTexts.push(enteredText[i]);
      }

    return (
      <div className="wanderlust-product-container">
        <div className="visible-area" style={{width: '222px'}}>
          {
            this.state.windowWidth < MOBILE_LIMIT &&
            <div className="button-wrapper">
              <Button bsStyle="default" bsSize="small" className="prev-button" 
                disabled={this.state.prevEnabled} onClick={this.onClickPrevButton.bind(this)}>Prev</Button>
              <Button bsStyle="default" bsSize="small" className="next-button" 
                disabled={this.state.fwdEnabled} onClick={this.onClickFwdButton.bind(this)}>Next</Button>
            </div>
          }
          <div className="canvas-wrapper" style={{height: '222px'}}>
            <div className="background-layer">
              {
                selectedPattern.fullPath && (<img id="pattern" src={BASE_PATH + "/" + selectedPattern.fullPath} />)
              }
              <img id="craft-background" src={backgroundImage} style={{backgroundColor: selectedColor.colorRGB}}/>
            </div>
            <div className="craft-layer">
              {
                selectedThumbnail.url && (<img id="clipart" src={BASE_PATH + "/" + selectedThumbnail.graphicFullPath} />)
              }
              
              <p id="text-line1" style={{color: selectedFontColor.colorRGB, fontFamily: selectedFont}}>{lineTexts[0]}</p>
              <p id="text-line2" style={{color: selectedFontColor.colorRGB, fontFamily: selectedFont}}>{lineTexts[1]}</p>
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
    wanderlust: state.wanderlust.present
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selTopButton: bindActionCreators(wanderlustActions.selTopButton, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WanderlustCanvasComponent);