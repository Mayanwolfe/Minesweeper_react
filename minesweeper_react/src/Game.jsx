import './Game.css';
import { useState, useEffect } from 'react';
import GameInfo from './components/GameInfo';
import Board from './components/Board';
import {
  filterBoard,
  traverseBoard,
  createEmptyArray,
  plantMines,
  getNeighborMines
} from './components/utilities';

const Game = () => {
  //set fixed state values, these could be made into options later
  const [height] = useState(8);
  const [width] = useState(8);
  const [mines] = useState(10);
  //set updateable state values
  const [gameData, setGameData] = useState([]);
  const [gameStatus, setGameStatus] = useState("Game in Progress");
  const [mineCount, setMineCount] = useState(mines);
  //key value is used to force the game board to reset
  const [key, setKey] = useState(false); 

  //render game board on load and trigger reset
  useEffect(() => {
    setGameData(initgameData(height, width, mines));
  }, [height, width, mines, key]);

  //populate data properties for all cells in grid
  const initgameData = (height, width, mines) => {
    let data = createEmptyArray(height, width);
    data = plantMines(data, height, width, mines);
    data = getNeighborMines(data, height, width);
    return data;
  };

  //reveal board at end of game
  const revealBoard = () => {
    let updatedData = gameData.map(row => row.map(item => ({ ...item, isRevealed: true })));
    setGameData(updatedData);
  };

  //Reveal an empty cell and cascade cells with no adjacent mines
  const revealEmpty = (y, x, data) => {
    //get the grid around the input cell
    let area = traverseBoard(y, x, data, height, width);
    area.forEach(value => {
      //if cell is not flagged AND not revealed AND is either empty OR not a mine
      if (!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
        data[value.y][value.x].isRevealed = true;
        if (value.isEmpty) {
          //if cell is blank then call function recursively
          revealEmpty(value.y, value.x, data);
        }
      }
    });
    return data;
  };

  //handle left click
  const handleCellClick = (y, x) => {
    //do nothing if already clicked or flagged
    if (gameData[y][x].isRevealed || gameData[y][x].isFlagged) return;
    //lose game if mine
    if (gameData[y][x].isMine) {
      setGameStatus("You Lost.");
      revealBoard();
      return;
    }
    //otherwise, reveal cell
    let updatedData = [...gameData];
    updatedData[y][x].isFlagged = false;
    updatedData[y][x].isRevealed = true;
    if (updatedData[y][x].isEmpty) {
      updatedData = revealEmpty(y, x, updatedData);
    }
    //if unclicked cell grid = mine grid then win
    if (filterBoard(updatedData, dataitem => !dataitem.isRevealed).length === mines) {
      setMineCount(0);
      setGameStatus("You Win!");
      revealBoard();
      return;
    }
    setGameData(updatedData);
    //set remaining mine count = mines - flags
    setMineCount(mines - filterBoard(updatedData, dataitem => dataitem.isFlagged).length);
  };

  //handle right click
  const handleContextMenu = (e, y, x) => {
    //don't show right click menu
    e.preventDefault();
    //do nothing if already revealed
    if (gameData[y][x].isRevealed) return;
    let updatedData = [...gameData];
    let mines = mineCount;
    //unflag if currently flagged
    if (updatedData[y][x].isFlagged) {
      updatedData[y][x].isFlagged = false;
      mines++;
    } else {
      //else add flag
      updatedData[y][x].isFlagged = true;
      mines--;
    }
    if (mines === 0) {
      const mineArray = filterBoard(updatedData, dataitem => dataitem.isMine);
      const flagArray = filterBoard(updatedData, dataitem => dataitem.isFlagged);
      //check if flagged cells = cells with mines, if true then win
      if (JSON.stringify(mineArray) === JSON.stringify(flagArray)) {
        setGameStatus("You Win!");
        setMineCount(0);
        revealBoard();
        return;
      }
    }
    setGameData(updatedData);
    setMineCount(mines);
  };

  //reset game on button click, trigger useEffect with key and reset status text
  const resetGame = () => {
    setGameStatus("Game in progress");
    setKey(!key);
    setMineCount(mines);
  };

  return (
    <div className='game'>
      <GameInfo mineCount={mineCount} gameStatus={gameStatus}/>
      <Board data={gameData} handleCellClick={handleCellClick} handleContextMenu={handleContextMenu} />
      <button className="reset-button" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default Game;
