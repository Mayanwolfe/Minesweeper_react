
const Cell = ({ value, onClick, cMenu }) => { //value = properties of cell, onClick = left click, cMenu = right click
  const getValue = () => {
    if (!value.isRevealed) {
      return value.isFlagged ? "🚩" : null; //if not revealed, then flagged or nothing
    }
    if (value.isMine) {
      return "💣";
    }
    if (value.neighbor === 0) { //if no neighboring mines, then blank (and revealed)
      return null;
    }
    return value.neighbor; //else return number of neighboring mines
  };

  //chain class names together for display
  let className = "cell" +
  (value.isRevealed ? "" : " hidden") +
  (value.isMine ? " is-mine" : "") +
  (value.isFlagged ? " is-flag" : "") +
  (() => {
    switch(value.neighbor) {
      case 1: return " blue";
      case 2: return " green";
      case 3: return " red";
      case 4: return " blue";
      default: return " purple";
    }
  })();

//return cell as a div with behavior and appearance
  return ( 
    <div onClick={onClick} className={className} onContextMenu={cMenu}>
      {getValue()}
    </div>
  );
};

export default Cell;
