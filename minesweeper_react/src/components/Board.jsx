import Cell from './Cell';

// Render grid of cells
const Board = ({ data, handleCellClick, handleContextMenu }) => {
  return (
    <div className="board">
      {data.map(datarow =>
        datarow.map(dataitem =>
          //React requires a unique key for each item when iterating through a list
          <div key={`${dataitem.y}-${dataitem.x}`}> 
            <Cell
              //handle left click
              onClick={() => handleCellClick(dataitem.y, dataitem.x)}
              //handle right click
              cMenu={(e) => handleContextMenu(e, dataitem.y, dataitem.x)}
              value={dataitem}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Board;
