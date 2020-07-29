import React from 'react'
import Buttons from './Buttons'
import Options from './Options'
import Tools from './Tools'


const Controls = props => {
    return (
      <section className="controls">

        <div className='menu-option'>
        <Options
          rows = {props.rows}
          cols = {props.cols}
          squareSize = {props.squareSize}
          onRowChange={props.onRowChange}
          onColChange={props.onColChange}
          onSizeChange={props.onSizeChange}
        />
        <Tools tool = {props.tool} onToolChange = {props.onToolChange} />
        </div>
      </section>
    );
  };

export default Controls