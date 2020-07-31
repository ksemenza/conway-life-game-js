
import {makeFalsyArray} from './GameLogic'

export const  NewGen = (props) => {

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
      squares: props.nextSquares,
      genNumber: this.state.genNumber + 1,
      deathCount: deathCount
    });
  };
