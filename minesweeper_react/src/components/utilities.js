// Utility functions for use on game board

//create the initial array of data for all cells in the grid
export const createEmptyArray = (height, width) => {
    let data = [];
    for (let i = 0; i < height; i++) { //loop vertically
      data.push([]);
      for (let j = 0; j < width; j++) { //loop horizontally
        //set properties for each cell at point x,y in the grid
        data[i][j] = {
          y: i,
          x: j,
          isMine: false,
          neighbor: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    return data;
};

//Get a grid of all cells around the current cell (see illustration)
export const traverseBoard = (y, x, data, height, width) => {
    const el = [];

    if (x > 0) el.push(data[y][x - 1]); // left
//      _____________
//      |___|___|___|
//      |_X_|_O_|___|
//      |___|___|___|

    if (y < height - 1 && x > 0) el.push(data[y + 1][x - 1]); // diagonal top left
//      _____________
//      |_X_|___|___|
//      |___|_O_|___|
//      |___|___|___|

    if (y < height - 1) el.push(data[y + 1][x]); // top
//      _____________
//      |___|_X_|___|
//      |___|_O_|___|
//      |___|___|___|

    if (y < height - 1 && x < width - 1) el.push(data[y + 1][x + 1]); // diagonal top right
//      _____________
//      |___|___|_X_|
//      |___|_O_|___|
//      |___|___|___|

    if (x < width - 1) el.push(data[y][x + 1]); // right
//      _____________
//      |___|___|___|
//      |___|_O_|_X_|
//      |___|___|___|

    if (y > 0 && x < width - 1) el.push(data[y - 1][x + 1]); // diagonal bottom right
//      _____________
//      |___|___|___|
//      |___|_O_|___|
//      |___|___|_X_|

    if (y > 0) el.push(data[y - 1][x]); // bottom
//      _____________
//      |___|___|___|
//      |___|_O_|___|
//      |___|_X_|___|

if (y > 0 && x > 0) el.push(data[y - 1][x - 1]); // diagonal bottom left
//      _____________
//      |___|___|___|
//      |___|_O_|___|
//      |_X_|___|___|

    return el;
};

//Get a random number on the vertical/horizontal axis
export const getRandomNumber = (dimension) => {
    return Math.floor((Math.random() * 1000) + 1) % dimension;
};

//Plant mines in random cells in the grid
export const plantMines = (data, height, width, mines) => {
    let randomx, randomy, minesPlanted = 0;
    while (minesPlanted < mines) {
        randomx = getRandomNumber(width);
        randomy = getRandomNumber(height);
        if (!data[randomy][randomx].isMine) {
        data[randomy][randomx].isMine = true;
        minesPlanted++;
        }
    }
    return data;
};

//Get the count of mines in cells bordering the current cell
export const getNeighborMines = (data, height, width) => {
    let updatedData = data;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
        if (!data[i][j].isMine) {
            let mine = 0;
            const area = traverseBoard(data[i][j].y, data[i][j].x, data, height, width);
            area.forEach(value => {
            if (value.isMine) {
                mine++;
            }
            });
            if (mine === 0) {
            updatedData[i][j].isEmpty = true;
            }
            updatedData[i][j].neighbor = mine;
        }
        }
    }
    return updatedData;
};

//loop through the game board and mark the current appearance of the cells - flag? mine? revealed?
export const filterBoard = (data, checkType) => {
    let resultArray = [];
    data.forEach(datarow => {
        datarow.forEach(dataitem => {
        if (checkType(dataitem)) {
            resultArray.push(dataitem);
        }
        });
    });
    return resultArray;
};
