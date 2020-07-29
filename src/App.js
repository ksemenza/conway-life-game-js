import React from 'react';
import './App.css';
import {makeFalsyArray, arrIsFalsy, validateNumber, copyArray, } from './logic/GameLogicHelper'
import Board from './components/Board'
import Info from './components/Info'
import Controls from './components/Controls'
import Message from './components/Message'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      rows: 30,
      cols: 30,
      squareSize: 20,
      squares: makeFalsyArray(30, 30),
      intervalId: null,
      genNumber: 1,
      deathCount: 0,
      tool: "filler",
      message: {
        text: null, //2 timeouts for smooth transition
        timer1: null, //set opacity to 0
        timer2: null //remove from the DOM
      }
    };
    this.isDown = false;
  }

  displayMessage = (text, timer) => {
    //TODO Change speed
    const delay = this.hideMessage() ? 5000 : 0; //remove previous message
    setTimeout(() => {
      this.setState({
        message: {
          text: text,
          timer1: setTimeout(this.hideMessage, timer),
          timer2: null
        }
      });
      console.log(delay)
    }, delay);
  };

  
  hideMessage = () => {
    if (this.state.message.text) {
      clearTimeout(this.state.message.timer1);
      this.setState({
        message: {
          text: this.state.message.text,
          timer1: null,
          timer2: setTimeout(
            () =>
              this.setState({
                message: { text: null, timer1: null, timer2: null }
              }),
            500
          )
        }
      });
      return true;
    }
  };


  /* START of SETTING BUTTONS */
  handleHelpClick = () => {
    const text = `Any live cell with two or three live neighbors survives.
    Any dead cell with three live neighbors becomes a live cell. 
    All other live cells die in the next generation. Similarly, all other dead cells stay dead.`;
    if ((this.state.message.text === text)) return this.hideMessage();
    return this.displayMessage(text, 10000);
  };


  handleSettingClick = () => {
    const text = `Settings Menu`;
    if ((this.state.message.text === text)) return this.hideMessage();
    return this.displayMessage(text, 10000);
  };


  /* END of SETTING BUTTONS */


/** START OF OPTIONS EVENT HANDLERS  */
/** ROW LENGTH, COLUMN LENGTH, SQUARE PX SIZE, CELL FILLER/ERASER */
  handleSizeChange = event => {
    const newSize = validateNumber(event.target.value) || 1;
    this.setState({
      squareSize: newSize
    });
  };
 

  handleRowChange = event => {
    const rows = validateNumber(event.target.value) || 1;
    const newSquares = makeFalsyArray(rows, this.state.cols);
    this.handleReset();
    this.setState({
      rows: rows,
      squares: newSquares
    });
  };

  handleColChange = event => {
    const cols = validateNumber(event.target.value) || 1;
    const newSquares = makeFalsyArray(this.state.rows, cols);
    this.handleReset();
    this.setState({
      cols: cols,
      squares: newSquares
    });
  };

  handleToolChange = (event) => {
    this.setState({
      tool: event.target.value
    })
  }
/** END OF OPTIONS EVENT HANDLERS  */



/**START OF GAME PLAY BUTTON HANDLERS */
/** RESET, START/PAUSE, RANDOM */
  handleReset = () => {
    const { rows, cols } = this.state;
    const newSquares = makeFalsyArray(rows, cols);
    clearInterval(this.state.intervalId);
    this.setState({
      squares: newSquares,
      genNumber: 1,
      deathCount: 0,
      intervalId: null
    });
  };

  handleStartPause = () => {
    let intervalId;
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
      intervalId = null;
    } else {
      if (arrIsFalsy(this.state.squares))
        return this.displayMessage(
          "There are no live cells, try randomizing or drawing some",
          2000
        );
      intervalId = setInterval(this.makeNextGeneration, 100);
    }
    this.setState({
      intervalId: intervalId
    });

  };

  handleRandomize = () => {
    const randomSquares = [];
    randomSquares.length = this.state.rows;
    for (let i = 0; i < this.state.squares.length; i++) {
      randomSquares[i] = [];
      randomSquares[i].length = this.state.cols;
      for (let j = 0; j < this.state.squares[0].length; j++) {
        randomSquares[i][j] = Math.random() > 0.7;
      }
    }
    this.setState({
      squares: randomSquares
    });
  };

  /**END OF GAME PLAY BUTTON HANDLERS */

  /**START MOUSE EVENT HANDLERS */

  handleMouseMove = (i, j) => {
    if (!this.isDown) return;
    if ((this.state.squares[i][j] && this.state.tool === "filler")||
    (!this.state.squares[i][j] && this.state.tool === "eraser")) return;
    const squares = copyArray(this.state.squares);
    squares[i][j] = this.state.tool ==="filler";
    this.setState({
      squares: squares
    });
  };

  handleClick = (i,j) => {
    this.isDown = true;
    this.handleMouseMove(i,j);
    this.isDown = false

  }

  /**END MOUSE EVENT HANDLERS */


  /** GAME LOGIC INITIATED FROM ./logic/GameLogic.js */
  
  makeNextGeneration = () => {

    //state of squares
    const currentSquares = this.state.squares;

    // checking if board is empty
    if (
      currentSquares.filter(
        row => row.filter(square => square === true).length > 0
      ).length === 0
    ) 
    //Exit Message
    //Stopping program
    {
      this.displayMessage("The last generations " + this.state.genNumber, 2000);
      // return this.handleStartPause();
    }

    //Create temp array to iterate over board
    const nextSquares = makeFalsyArray(this.state.rows, this.state.cols);
    
    // Initiating death count state
    let deathCount = this.state.deathCount;

    //Iterate over the x axis to end
    for (let i = 0; i < currentSquares.length; i++) {
    //Iterate over the y axis to end
      for (let j = 0; j < currentSquares[i].length; j++) {
    //Evaluating the surrounding cells 
        let neighborNum = currentSquares[i][j] ? -1 : 0;
        for (let m = i - 1; m <= i + 1; m++) {
          if (m >= 0 && m < currentSquares.length) {
            for (let n = j - 1; n <= j + 1; n++) {
              if (n >= 0 && n < currentSquares[i].length) {
                if (currentSquares[m][n]) {
                  neighborNum++;
                }
              }
            }
          }
        }

    //Implementing rule life logic of population 
        if (currentSquares[i][j]) {
          if (neighborNum > 1 && neighborNum < 4 ) {
            nextSquares[i][j] = true;
          } else {
            deathCount++;
          }
        } 
        else if (neighborNum === 3) {
          nextSquares[i][j] = true;
        }
      }
    }

    this.setState({
      squares: nextSquares,
      genNumber: this.state.genNumber + 1,
      deathCount: deathCount
    });
  };



  render() {
    return (
      <main className="main">
        <Info
          onHelpClick={this.handleHelpClick}
          onSettingClick={this.handleSettingClick}
          genNumber={this.state.genNumber}
          deathCount={this.state.deathCount}
          squares ={this.state.squareSize}
          intervalId={this.state.intervalId}
          onStartPause={this.handleStartPause}
          onRandomize={this.handleRandomize}
          onReset={this.handleReset}
        />
          <Board
          tool = {this.state.tool}
          squareSize={this.state.squareSize}
          squares={this.state.squares}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          onClick={this.handleClick}
          onMouseDown={this.handleMouseDown}
        />
        <Controls
          rows={this.state.rows}
          cols={this.state.cols}
          intervalId={this.state.intervalId}
          squareSize={this.state.squareSize}
          tool = {this.state.tool}
          onStartPause={this.handleStartPause}
          onRandomize={this.handleRandomize}
          onReset={this.handleReset}
          onRowChange={this.handleRowChange}
          onColChange={this.handleColChange}
          onSizeChange={this.handleSizeChange}
          onToolChange = {this.handleToolChange}
        />

        <Message message={this.state.message} />
     

        
      </main>
    );
  }
}


export default App;
