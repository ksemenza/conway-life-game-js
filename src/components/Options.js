import React from 'react'

const Options = props => {

    return (
      <section className="menu-options">
      <h2 className="heading options_heading">Current Dimensions</h2>
      <p className='settings-details'> 
     Grid 30 X 30 Cells 20px 

     <br/>
     <span>Row Amount ~ Column Amount ~ Cell Size</span>
      <br/>
    
      </p>
        <div className="option">
        <div className="option-data">
          <label className="option_label" htmlFor="rowNum">
            Row
          </label>
          <input
            className="option_input"
            id="rowNum"
            type="number"
            name="rows"
            min="1"
            max="50"
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
            max="50"
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
            max="80"
            value={props.squareSize}
            onChange={props.onSizeChange}
          />
        </div>
        </div>
      </section>
    );
  };


  export default Options