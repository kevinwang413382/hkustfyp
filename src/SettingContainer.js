import React, { Component } from 'react';
import Cleave from 'cleave.js';
import CheckBox from './CheckBox.js';
import DateInput from './DateInput.js';
import './css/SettingContainer.css';
import ReactDOM from 'react-dom';
const TYPE_CHECK_BOX_ALGO  = 'TYPE_CHECK_BOX_ALGO';
const TYPE_CHECK_BOX_FEATURES  = 'TYPE_CHECK_BOX_FEATURES';
const TYPE_OPTION     = 'TYPE_OPTION';
const TYPE_DATE_INPUT = 'TYPE_DATE_INPUT';
const ID_DATE_INPUT_START = 'date_start';
const ID_DATE_INPUT_END = 'date_end';
const LABEL_DATE_INPUT_START = "Start:";
const LABEL_DATE_INPUT_END =   "End  :";
const STATE_FEATURES = "features";
const STATE_ALGORITHMS = "algorithms";
var keyLock = false;
const algorithms =
    [
        {id:'algo_rf', label: 'Random Forest'},
        {id:'algo_dt', label: 'Decision Tree'},
        {id:'algo_gbt', label: 'GBT'},
        {id:'algo_nn', label: 'Neural Network'}
    ]
const features =
    [
        {id: 'f_market_cap' ,label: 'Market cap'},
        {id: 'f_volume'     ,label: 'Transaction Volume'},
        {id: 'f_hash_rate'    ,label: 'Hash Rate'},
        {id: 'f_block_size'    ,label: 'Block Size'},
        {id: 'f_trans_per_block'    ,label: 'Transaction per Block'},
        {id: 'f_difficulty'    ,label: 'Mining Difficulty'},
        {id: 'f_miner_rev'    ,label: 'Miner Revenue'}

    ]


class SettingContainer extends Component{
    constructor(){
      super();
      this.onChange = this.onChange.bind(this);
      var default_states = {};
      default_states[TYPE_OPTION] = "daily";                  // avoid magic word
      default_states[ID_DATE_INPUT_END] = "";
      default_states[ID_DATE_INPUT_START] = "";
      default_states[STATE_ALGORITHMS] = algorithms;
      default_states[STATE_FEATURES] = features;

      this.state = default_states;

    }

    onChange(e, data){
        var updateState = {}

        switch (e.target.name) {
          case TYPE_OPTION:
            updateState[e.target.id] = e.target.options[e.target.options.selectedIndex].value;
            break;
          case TYPE_CHECK_BOX_FEATURES:
            updateState[STATE_FEATURES] = {};
            updateState[STATE_FEATURES][e.target.id]=data;
            break;
          case TYPE_CHECK_BOX_ALGO:
            updateState[STATE_ALGORITHMS] = {};
            updateState[STATE_ALGORITHMS][e.target.id]=data;

            break;
          case TYPE_DATE_INPUT:
            updateState[e.target.id]=data;
            console.log(":)");
            break;

          default:
        }
        this.setState(updateState, function(){
          console.log(this.state);
        });
    }

    render(){

      return(
        <div>
          <div className = "upper-setting">
            <div className = "upper-left-setting">
              <select name = {TYPE_OPTION} id = {TYPE_OPTION} onChange={this.onChange}>
                <option value='daily'>Daily</option>
                <option value='hourly'>Hourly</option>
              </select>

            </div>
            <div className = "upper-right-setting">
                {
                    algorithms.map(function(obj, index){
                      return(
                        <CheckBox name = {TYPE_CHECK_BOX_ALGO} key = {index} id = {obj.id} label = {obj.label} handler = {this.onChange}/>
                      );
                    }.bind(this))
                }
            </div>
          </div>
          <div className = "clear-both"/>
          <div className = "lower-setting">
          {
              features.map(function(obj, index){
                return(
                  <CheckBox name = {TYPE_CHECK_BOX_FEATURES} key = {index} id = {obj.id} label = {obj.label} handler = {this.onChange}/>
                );
              }.bind(this))
          }
          </div>
          <div>
            <DateInput id = {ID_DATE_INPUT_START} name = {TYPE_DATE_INPUT} label = {LABEL_DATE_INPUT_START}handler = {this.onChange}/>
            <DateInput id = {ID_DATE_INPUT_END}   name = {TYPE_DATE_INPUT} label = {LABEL_DATE_INPUT_END}handler = {this.onChange}/>
          </div>
        </div>
      )
    }
}

export default SettingContainer;
