import React from 'react';
import { Chessboard as ReactChessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import './Chessboard.css';

interface ChessboardProps {
  lightSquareColor?: string;
  darkSquareColor?: string;
}

const Chessboard: React.FC<ChessboardProps> = ({ 
  lightSquareColor = '#f0d9b5', 
  darkSquareColor = '#b58863' 
}) => {
  const [game] = React.useState(new Chess());

  return (
    <div className="chessboard-container">
      <ReactChessboard 
        position={game.fen()}
        boardWidth={560}
        customLightSquareStyle={{ backgroundColor: lightSquareColor }}
        customDarkSquareStyle={{ backgroundColor: darkSquareColor }}
      />
    </div>
  );
};

export default Chessboard;
