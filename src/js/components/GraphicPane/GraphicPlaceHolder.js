import './GraphicPane.scss';

import React, { Component } from 'react';
import { Thumbnail } from 'react-bootstrap';
import { BASE_PATH } from '../../constants/actionTypes';

export default class GraphicPlaceHolder extends Component {

  render () {
    return (
        <Thumbnail 
          href="#" 
          className='design-thumbnail' 
          src={BASE_PATH + '/images/ajax-loader-blue.gif'} 
        />
    );
  }
}