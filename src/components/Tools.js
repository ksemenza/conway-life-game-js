import React from 'react'


const Tools = props => {
    return (
      <div className="tools">
        <h2 className="heading options_heading">Life Status</h2>
        <div className="tool">
          <div className="tool_option">
            <input
              id="filler"
              type="radio"
              name="tool"
              value="filler"
              checked={props.tool==="filler"}
              onChange={props.onToolChange}
            />
            <label htmlFor="filler">Create (filler)</label>
          </div>
          <div className="tool_option">
            <input
              id="eraser"
              type="radio"
              name="tool"
              value="eraser"
              checked={props.tool==="eraser"}
              onChange={props.onToolChange}
            />
            <label htmlFor="eraser">Destroy (eraser)</label>
          </div>
        </div>
      </div>
    );
  };

export default Tools