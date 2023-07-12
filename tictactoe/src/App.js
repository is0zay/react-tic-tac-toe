import React, { useState } from 'react';

// this function represents each square on the game board
// each square is a button that displays a value once the button is clicked using the function passed in the props "onSquareClick"
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}




// this component represents the board the game is played on
// we pass xIsNext , squares, and onPlay as props of the Board component
function Board({ xIsNext, squares, onPlay }) {  
  
	
  function handleClick(i) {	// this is the function each square executees when clicked
    if(squares[i] || calculateWinner(squares)) {	// if the square is displaying a value or there is a winner, DO NOT alter the square or board
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext) {	// if X is next, the next value passed is X if not the next value played is O
      nextSquares[i] = "X";	
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares);	// play the value stored in nextSquares
  }

  const winner = calculateWinner(squares);	// variable stores the winner of the game from the calculateWinner function
  let status; 	// stores staus of the game
  if(winner) {
    status = "Winner: " + winner;	//if there is a winner, dissplay this
  }else {
    status = "Next player: " + (xIsNext ? "X" : "O")	// if there is no winner, display this
  }

  return (
    <>
    <div className="status">{status}</div>	{/* div to display status */}
    <div className="board-row">	{/* this div calles the square component and passes propes to each square  */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />	
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}



export default function Game() {	// Game component that calls on the Board compnent;
  const [history, setHistory] = useState([Array(9).fill(null)]);	// declares variable to store the state of the board and uses useState to set the default value to an empty array of 9
  const [currentMove, setCurrentMove] = useState(0);	// declares variables to store the state of the board after the most current move, default state to 0
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {	// on each move, perform this function
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    }
  function jumpTo(nextMove) {	//function that allows you to go back to a previous state
    setCurrentMove(nextMove);
  }
  
  const moves = history.map((squares, move) => {	// store the moves on a new array based on history
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div> 
  );
}

// logic for checking for the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 3],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}