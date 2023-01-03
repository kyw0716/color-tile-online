import BoardModel from "../model/BoardModel.js";
import BoardView from "../view/BoardView.js";
const container = document.querySelector("#app");

export default class colorTileController {
  #boardModel = new BoardModel(15, 23, 200, this.tileClickCallback.bind(this));
  #boardView = new BoardView(container, this.#boardModel);
  #boardContainer;

  constructor() {}

  startGame() {
    this.#boardContainer = this.#boardView.getContainer();
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

      let colors = nearTile.map((v) => v[2]);
      colors = colors.filter((v, i) => i !== colors.indexOf(v));

      if (colors.length === 0) console.log("틀렸습니다!");

      nearTile.forEach((tile) => {
        if (colors.includes(tile[2])) {
          this.#boardModel.deleteTile(tile[0], tile[1]);
          this.#boardModel.addScore(1);
        }
      });
    }

    container.replaceChildren();
    this.#boardView.renderTileBoard(
      15,
      23,
      this.#boardModel.getScore(),
      this.#boardContainer
    );
  }

  homeButtonCallback() {
    this.#boardModel.reset(15, 23, 200);
    this.startGame();
  }

  #getUpTile(row, column) {
    const board = this.#boardModel.getBoard();

    for (let i = row - 1; i >= 0; i--) {
      const colorCode = board[i][column].getColorCode();

      if (colorCode !== -1) return [i, column, colorCode];
    }
  }

  #getDownTile(row, column) {
    const board = this.#boardModel.getBoard();

    for (let i = row + 1; i < 15; i++) {
      const colorCode = board[i][column].getColorCode();

      if (colorCode !== -1) return [i, column, colorCode];
    }
  }

  #getLeftTile(row, column) {
    const board = this.#boardModel.getBoard();

    for (let i = column - 1; i >= 0; i--) {
      const colorCode = board[row][i].getColorCode();

      if (colorCode !== -1) return [row, i, colorCode];
    }
  }

  #getRightTile(row, column) {
    const board = this.#boardModel.getBoard();

    for (let i = column + 1; i < 23; i++) {
      const colorCode = board[row][i].getColorCode();

      if (colorCode !== -1) return [row, i, colorCode];
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
