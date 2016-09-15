import './AccordionPane.scss';

import React, { Component } from 'react';
import { Thumbnail } from 'react-bootstrap';

export default class AccordionPlaceHolder extends Component {

  render () {
    return (
        <li>
          <Thumbnail 
            href="#" 
            className='design-thumbnail' 
            src={require('./images/ajax-loader-blue.gif')}
          />
        </li>
    );
  }
}