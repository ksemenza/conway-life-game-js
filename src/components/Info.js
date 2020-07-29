import React from 'react'
import Buttons from './Buttons'

const Info = props => {

    

    return (
      <section className="info">
        <h1 className="heading info_heading">Conway's Game Of Life</h1>
        <div className="info_section help">
        <div className='ctx-wrap'>
        <div className='setup-btn'>
            <button onClick={props.onHelpClick} className='util-button help_item rules'> Rules </button>
            <button onClick={props.onSettingClick} className='util-button menu-settings'> Settings </button>
          </div>

          </div>
        <div className="info_body">
          <div className="info_section stats">
            <div className="stats_label">
              Generation: <span className="stats_value">{props.genNumber}</span>{" "}
            </div>
            <div className="stats_label">
              Death count:{" "}
              <div className="stats_value">{props.deathCount}</div>{" "}
            </div>
            </div>

            <Buttons
          playOrPause = {props.intervalId ? "Pause" : "Play"}
          onStartPause={props.onStartPause}
          onRandomize={props.onRandomize}
          onReset = {props.onReset}
        />
   </div>
        </div>
      </section>
    );
  };

  export default Info