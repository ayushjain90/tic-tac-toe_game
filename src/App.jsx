import Player from './Component/Player'
import GameBoard from './Component/GameBoard'
import { useState } from 'react'
import Log from './Component/Log'
import { WINNING_COMBINATIONS } from './winning-combinations'
import GameOver from './Component/GameOver'

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYER = {
 X: 'Player 1',
 0: 'Player 2'
}

function deriveActivePlayer(gameTurn) {
  let currentPlayer = 'X'
  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = '0'
  }
  return currentPlayer;
}

function checkWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner
}

function deriveGameBoard(gameTurn) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurn) {
    const { square, player } = turn
    const { row, col } = square
    gameBoard[row][col] = player
  }
  return gameBoard
}

function App() {
  const [players, setPlayers] = useState(PLAYER)
  const [gameTurn, setGameTurn] = useState([])
  const gameBoard = deriveGameBoard(gameTurn)
  const activePlayer = deriveActivePlayer(gameTurn)
  const winner = checkWinner(gameBoard, players)
  const hasDraw = gameTurn.length === 9 && !winner

  function handleSquareClick(rowIndex, colIndex) {
    setGameTurn((prevTurn) => {
      const activePlayer = deriveActivePlayer(prevTurn)
      const updatedTurn = [
        {
          square: { row: rowIndex, col: colIndex },
          player: activePlayer
        },
        ...prevTurn
      ]
      return updatedTurn
    })
  }

  function handelRestart() {
    setGameTurn([])
  }

  function handelPlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handelPlayerNameChange}/>
          <Player initialName="Player 2" symbol="0" isActive={activePlayer === '0'} onChangeName={handelPlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handelRestart}/>}
        <GameBoard onSquareClick={handleSquareClick} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  )
}

export default App
