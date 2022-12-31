import BoardView from "../view/BoardView.js";
const container = document.querySelector("#app");

export default class colorTileController {
  #boardView = new BoardView(container);

  constructor() {}

  startGame() {
    this.#boardView.printBoard(23, 15);
  }
}
