import React from 'react'

const Options = props => {
    return (
      <section className="menu-options">
      <h2 className="heading options_heading">Dimensions</h2>
        <div className="option">
          <label className="option_label" htmlFor="rowNum">
            Row
          </label>
          <input
            className="option_input"
            id="rowNum"
            type="number"
            name="rows"
            min="1"
            max="100"
            value={props.rows}
            onChange={props.onRowChange}
          />
        </div>
        <div className="option">
          <label className="option_label" htmlFor="colNum">
            Columns
          </label>
          <input
            className="option_input"
            id="colNum"
            type="number"
            name="cols"
            min="1"
            max="100"
            value={props.cols}
            onChange={props.onColChange}
          />
        </div>
      
         <div className="option">
          <label className="option_label" htmlFor="squareSize">
            Cell size (px)
          </label>
          <input
            className="option_input"
            id="squareSize"
            type="number"
            name="size"
            min="1"
            value={props.squareSize}
            onChange={props.onSizeChange}
          />
        </div>
      </section>
    );
  };


  export default Options