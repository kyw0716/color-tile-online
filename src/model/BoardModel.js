import RandomNumberGenerator from "../utils/RandomNumberGenerator.js";

class BoardModel {
  #row;
  #column;
  #board;

  constructor(row, column, maxScore) {
    this.#row = row;
    this.#column = column;

    const emptyOrTile = this.#createEmptyOrTileArray(row, column, maxScore);
    const board = this.#createBoard(row, column, emptyOrTile);

    this.#board = board;
  }

  #createEmptyOrTileArray(row, column, maxScore) {
    const emptyOrTile = [];

    for (let i = 0; i < row * column; i++) {
      if (i < maxScore) emptyOrTile.push(1);
      if (i >= maxScore) emptyOrTile.push(0);
    }

    emptyOrTile.sort(() => Math.random() - 0.5);

    return emptyOrTile;
  }

  #createBoard(row, column, emptyOrTile) {
    const board = [];

    for (let i = 0; i < row; i++) {
      const rowContainer = [];

      for (let j = 0; j < column; j++) {
        const tileValue = emptyOrTile.pop();

        if (tileValue === 0) rowContainer.push(tileValue);
        if (tileValue !== 0)
          rowContainer.push(RandomNumberGenerator.generate());
      }

      board.push(rowContainer);
    }

    return board;
  }

  getBoard() {
    return this.#board;
  }
}

export default BoardModel;
