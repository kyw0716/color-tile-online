export default class BoardView {
  #container;
  #board;

  constructor(container, board) {
    this.#container = container;
    this.#board = board;
  }

  printBoard(row, column) {
    const newBoard = document.createElement("div");

    newBoard.style =
      "width: 660px; height: 480px; border: 1px solid black; display: flex; flex-direction: column; justify-content: center; align-items: center;";

    this.#fillTile(row, column, newBoard);

    this.#container.appendChild(newBoard);
  }

  #fillTile(row, column, newBoard) {
    for (let i = 0; i < row; i++) {
      const subContainer = this.#createTileRowContainer(i);

      for (let j = 0; j < column; j++) {
        this.#board.getBoard()[i][j].printTile(subContainer);
      }

      newBoard.appendChild(subContainer);
    }
  }

  #createTileRowContainer(i) {
    const subContainer = document.createElement("div");

    subContainer.id = `${i}`;
    subContainer.style = `display: flex;`;

    return subContainer;
  }
}
