import React from 'react';
import './Chessboard.css';

const PIECES = {
  'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
  'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
};

const INITIAL_POSITION = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

interface ChessboardProps {
  lightSquareColor?: string;
  darkSquareColor?: string;
}

const Chessboard: React.FC<ChessboardProps> = ({ 
  lightSquareColor = '#f0d9b5', 
  darkSquareColor = '#b58863' 
}) => {
  const [board] = React.useState(INITIAL_POSITION);

  const renderSquare = (piece: string, row: number, col: number) => {
    const isLight = (row + col) % 2 === 0;
    const squareClass = `square ${isLight ? 'light' : 'dark'}`;
    const backgroundColor = isLight ? lightSquareColor : darkSquareColor;
    
    return (
      <div 
        key={`${row}-${col}`} 
        className={squareClass}
        style={{ backgroundColor }}
      >
        {piece && <span className="piece">{PIECES[piece as keyof typeof PIECES]}</span>}
      </div>
    );
  };

  return (
    <div className="chessboard-container">
      <div className="chessboard">
        {board.map((row, rowIndex) => 
          row.map((piece, colIndex) => 
            renderSquare(piece, rowIndex, colIndex)
          )
        )}
      </div>
    </div>
  );
};

export default Chessboard;
