import React from 'react';
import './App.css';
import {makeFalsyArray, arrIsFalsy, validateNumber, copyArray, } from './logic/GameLogic'
import Board from './components/Board'
import Info from './components/Info'
import Controls from './components/Controls'
import Message from './components/Message'
import Options from './components/Options';

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
      lifeCount:0,
      deathCount: 0,
      speed:0,
      tool: "filler",
      message: {
        text: null, //2 timeouts for smooth messages
        timer1: null, //set opacity to 0
        timer2: null //remove from the DOM
      }
    };
    this.isDown = false;
  }

  displayMessage = (text, timer) => {
    const delay = this.hideMessage() ? 500 : 0; //remove previous message
    setTimeout(() => {
      this.setState({
        message: {
          text: text,
          timer1: setTimeout(this.hideMessage, timer),
          timer2: null
        }
      });
      
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

  handleSizeChange = event => {
    const newSize = validateNumber(event.target.value) || 1;
    this.setState({
      squareSize: newSize
    });
  };
 

  handleHelpClick = () => {
    const text = `Any live cell with two or three live neighbors survives.
    Any dead cell with three live neighbors becomes a live cell. 
    All other live cells die in the next generation. Similarly, all other dead cells stay dead.`;
    if ((this.state.message.text === text)) return this.hideMessage();
    return this.displayMessage(text, 10000);
  };


  handleSpeedChange = (e) => {
    clearInterval(this.state.intervalId);

    this.setState({
      speed: e.target.value
    })
  }

  handleSettingClick = () => {
    const text =     
    <Options
    rows = {this.rows}
    cols = {this.cols}
    squareSize={this.squareSize}
    onRowChange={this.handleRowChange}
    onColChange={this.handleColChange}
    onSizeChange={this.handleSizeChange}
  />
    if ((this.state.message.text === text)) return this.hideMessage();
    
    return this.displayMessage(text, 100000);
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



  handleToolChange = (event) => {
    this.setState({
      tool: event.target.value
    })
  }

  //Tools Handles Filled and Empty Tools
  handleMouseMove = (i, j) => {
    if (!this.isDown) return;
    if ((this.state.squares[i][j] && this.state.tool === "filler")||
    (!this.state.squares[i][j] && this.state.tool === "eraser")) return;
    
    const squares = copyArray(this.state.squares);
    squares[i][j] = this.state.tool ==="filler"
    
    this.setState({
      squares: squares
    });
  };

  
  handleClick = (i,j) => {
    this.isDown = true;
    this.handleMouseMove(i,j);
    this.isDown = false

  }
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





  handleMouseDown = () => {
    this.isDown = true;
  };

  handleMouseUp = () => {
    this.isDown = false;
  };

  makeNextGeneration = () => {

    //declaring state of existing squares
    const currentSquares = this.state.squares;

    //filter looking while running for filled square 
    if (
      currentSquares.filter(
        row => row.filter(square => square === true).length > 0
      ).length === 0
    ) 
    //If board no longer contain alive cells message returning generation number
    {
      this.displayMessage("The last generations " + this.state.genNumber, 2000);
      return this.handleStartPause();
    }

    //Create temp array to iterate over board
    const nextSquares = makeFalsyArray(this.state.rows, this.state.cols);
    
    // Initiating death count state
    let deathCount = this.state.deathCount;

    //Iterate over the x axis to end
    for (let i = 0; i < currentSquares.length; i++) {
    //Iterate over the y axis to end
      for (let j = 0; j < currentSquares[i].length; j++) {
    //Continue iterate if end then start at 0
        let neighborNum = currentSquares[i][j] ? -1 : 0;
      //Second value to swap
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

        console.log(nextSquares)

    //Implementing rule logic of population 
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

          <Board
          tool = {this.state.tool}
          squareSize={this.state.squareSize}
          squares={this.state.squares}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          onClick={this.handleClick}
          onMouseDown={this.handleMouseDown}
        />
        <Message message={this.state.message} />
     
        <p className='copyright'> Developer: Kim Semenza © Guin Dev Productions </p>

        
      </main>
    );
  }
}


export default App;
