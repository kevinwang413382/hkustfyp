import React, { Component } from 'react';
import SettingContainer from './SettingContainer.js';
import GraphContainer from './GraphContainer.js';

import './css/Container.css'
class Container extends Component{

    render(){
      return(
        <div>
            <div className = 'setting-container'>
              <SettingContainer/>
            </div>
            <div className = 'graph-container'>
              <GraphContainer/>
            </div>
          </div>
      )
    }
}
export default Container;
