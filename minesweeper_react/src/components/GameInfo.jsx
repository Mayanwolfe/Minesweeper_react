//Set game status text above the board
const GameInfo = ({ mineCount, gameStatus}) => {
  const getStatusClass = () => { 
    //set tag for styling
    if (gameStatus === "You Win!") return "win";
    if (gameStatus === "You Lost.") return "lose";
    return "";
  };

  return (
    <div className={`game-info ${getStatusClass()}`}>
      <span className="info">Mines remaining: {mineCount}</span>
      <h1 className="info">{gameStatus}</h1>
    </div>
  );
};

export default GameInfo;