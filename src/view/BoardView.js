import Tile from "./Tile.js";

export default class BoardView {
  #container;

  constructor(container) {
    this.#container = container;
  }

  printBoard(width, height) {
    const newBoard = document.createElement("div");

    newBoard.style =
      "width: 660px; height: 480px; border: 1px solid black; display: flex; flex-direction: column; justify-content: center; align-items: center;";

    for (let i = 0; i < height; i++) {
      const subContainer = document.createElement("div");
      subContainer.id = `${i}`;
      subContainer.style = `display: flex;`;

      for (let j = 0; j < width; j++) {
        if (i % 2 === 0) {
          if (j % 2 === 0)
            new Tile(i, j, "rgb(235, 235, 235)").printTile(subContainer);
          else new Tile(i, j, "rgb(246, 246, 246)").printTile(subContainer);
        } else {
          if (j % 2 === 0)
            new Tile(i, j, "rgb(246, 246, 246)").printTile(subContainer);
          else new Tile(i, j, "rgb(235, 235, 235)").printTile(subContainer);
        }
      }

      newBoard.appendChild(subContainer);
    }

    this.#container.appendChild(newBoard);
  }
}
