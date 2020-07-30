
import React from 'react'

const Board = props => {
    const squares = props.squares;
    const [rows, cols] = [squares.length, squares[0].length];
    const squareElements = Array(rows * cols);

    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const className =
          "square square_type-" + (squares[i][j] ? "life" : "death");
        squareElements[i * cols + j] = (
          <div
            key={"square" + i + "-" + j}
            className={className}
            style={{ width: props.squareSize, height: props.squareSize }}
            onMouseMove={() => props.onMouseMove(i, j)}
            onClick={() => props.onClick(i, j)}
          />
        );
      }
    }
    return (
      <div
        className={"board " + (props.tool === "eraser" ? "erasing" : "filling")}
        style={{ width: props.squares[0].length * props.squareSize + "px" }}
        onMouseDown={event => {
          event.preventDefault();
          return props.onMouseDown();
        }}
        onMouseUp={props.onMouseUp}
        onMouseLeave={props.onMouseUp}
      >
        {squareElements}
        
      </div>
    );
  };


  export default Board