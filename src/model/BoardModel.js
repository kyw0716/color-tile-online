import tileColors, { backGroundTileColors } from "../static/Colors.js";
import RandomNumberGenerator from "../utils/RandomNumberGenerator.js";
import Tile from "../view/Tile.js";

class BoardModel {
  #board;
  #tileClickCallback;
  #score = 0;

  constructor(row, column, maxScore, tileClickCallback) {
    this.#tileClickCallback = tileClickCallback;

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

        if (tileValue === 0) rowContainer.push(this.#createTile(i, j));
        if (tileValue !== 0)
          rowContainer.push(
            this.#createTile(i, j, RandomNumberGenerator.generate())
          );
      }

      board.push(rowContainer);
    }

    return board;
  }

  #createTile(i, j, colorCode) {
    let color;

    if (colorCode) {
      return new Tile(i, j, tileColors[colorCode - 1], this.#tileClickCallback);
    }

    if (i % 2 === 0) {
      if (j % 2 === 0) color = backGroundTileColors.DARK;
      else color = backGroundTileColors.LIGHT;
    } else {
      if (j % 2 === 0) color = backGroundTileColors.LIGHT;
      else color = backGroundTileColors.DARK;
    }

    return new Tile(i, j, color, this.#tileClickCallback);
  }

  getBoard() {
    return this.#board;
  }

  deleteTile(row, column) {
    this.#board[row][column] = this.#createTile(row, column, 0);
  }

  getScore() {
    return this.#score;
  }

  addScore(plusScore) {
    this.#score += plusScore;
  }

  reset(row, column, maxScore) {
    const emptyOrTile = this.#createEmptyOrTileArray(row, column, maxScore);
    const board = this.#createBoard(row, column, emptyOrTile);

    this.#board = board;
    this.#score = 0;
  }
}

export default BoardModel;
