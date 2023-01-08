import BoardModel from "../model/BoardModel.js";
import StaticValues from "../static/StaticValues.js";
import gameAudio from "../utils/GameAudio.js";
import BoardView from "../view/BoardView.js";
const container = document.querySelector("#app");

export default class colorTileController {
  #boardModel = new BoardModel(
    StaticValues.BOARD_ROW,
    StaticValues.BOARD_COLUMN,
    StaticValues.MAX_SCORE,
    this.tileClickCallback.bind(this)
  );
  #boardView = new BoardView(container, this.#boardModel);
  #boardContainer = this.#boardView.getContainer();

  constructor() {}

  startGame() {
    const startButton = this.#boardView.getStartButton(
      this.#boardContainer,
      this.homeButtonCallback.bind(this)
    );
    const practiceModeButton = this.#boardView.getPracticeModeButton(
      this.#boardContainer,
      this.homeButtonCallback.bind(this)
    );

    this.#boardContainer.replaceChildren();
    this.#boardContainer.appendChild(startButton);
    this.#boardContainer.appendChild(practiceModeButton);

    container.appendChild(this.#boardContainer);
  }

  tileClickCallback(row, column, colorCode) {
    if (colorCode === -1) {
      const nearTile = this.#getNearTile(row, column);

      let colors = nearTile.map((v) => v[StaticValues.TILE_INFO_COLOR]);
      colors = colors.filter((v, i) => i !== colors.indexOf(v));

      if (colors.length === 0) gameAudio.WRONG_TILE_CLICKED.play();
      if (colors.length > 0) gameAudio.RIGHT_TILE_CLICKED.play();

      nearTile.forEach((tile) => {
        if (colors.includes(tile[StaticValues.TILE_INFO_COLOR])) {
          this.#boardModel.deleteTile(
            tile[StaticValues.TILE_INFO_ROW],
            tile[StaticValues.TILE_INFO_COLUMN]
          );
          this.#boardModel.addScore(1);
        }
      });
    }

    container.replaceChildren();
    this.#boardView.renderTileBoard(
      StaticValues.BOARD_ROW,
      StaticValues.BOARD_COLUMN,
      this.#boardModel.getScore(),
      this.#boardContainer
    );
  }

  homeButtonCallback() {
    this.#boardModel.reset(
      StaticValues.BOARD_ROW,
      StaticValues.BOARD_COLUMN,
      StaticValues.MAX_SCORE
    );
    this.startGame();
  }

  #getUpTile(row, column) {
    const board = this.#boardModel.getBoard();
    const START_POINT = row - 1;

    for (let i = START_POINT; i >= 0; i--) {
      const colorCode = board[i][column].getColorCode();

      if (colorCode !== StaticValues.NO_COLOR) return [i, column, colorCode];
    }
  }

  #getDownTile(row, column) {
    const board = this.#boardModel.getBoard();
    const START_POINT = row + 1;

    for (let i = START_POINT; i < StaticValues.BOARD_ROW; i++) {
      const colorCode = board[i][column].getColorCode();

      if (colorCode !== StaticValues.NO_COLOR) return [i, column, colorCode];
    }
  }

  #getLeftTile(row, column) {
    const board = this.#boardModel.getBoard();
    const START_POINT = column - 1;

    for (let i = START_POINT; i >= 0; i--) {
      const colorCode = board[row][i].getColorCode();

      if (colorCode !== StaticValues.NO_COLOR) return [row, i, colorCode];
    }
  }

  #getRightTile(row, column) {
    const board = this.#boardModel.getBoard();
    const START_POINT = column + 1;

    for (let i = START_POINT; i < StaticValues.BOARD_COLUMN; i++) {
      const colorCode = board[row][i].getColorCode();

      if (colorCode !== StaticValues.NO_COLOR) return [row, i, colorCode];
    }
  }

  #getNearTile(row, column) {
    const nearTile = [];

    const upTile = this.#getUpTile(row, column);
    const downTile = this.#getDownTile(row, column);
    const leftTile = this.#getLeftTile(row, column);
    const rightTile = this.#getRightTile(row, column);

    if (upTile) nearTile.push(upTile);
    if (downTile) nearTile.push(downTile);
    if (leftTile) nearTile.push(leftTile);
    if (rightTile) nearTile.push(rightTile);

    return nearTile;
  }
}
