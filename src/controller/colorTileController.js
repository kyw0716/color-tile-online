import BoardModel from "../model/BoardModel.js";
import BoardView from "../view/BoardView.js";
const container = document.querySelector("#app");

export default class colorTileController {
  #boardModel = new BoardModel(15, 23, 200);
  #boardView = new BoardView(container, this.#boardModel.getBoard());

  constructor() {}

  startGame() {
    this.#boardView.printBoard(15, 23);
    console.log(this.#boardModel.getBoard());
  }
}
