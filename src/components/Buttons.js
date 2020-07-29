import React from 'react'

const Buttons = props => {
    return (
      <div className="controls_buttons">
        <button className="button" onClick={props.onStartPause}>
          {props.playOrPause}
        </button>
        <button className="button" onClick={props.onRandomize}>Randomize</button>
        <button className="button" onClick={props.onReset}>Reset</button>
      </div>
    );
  };

  export default Buttons