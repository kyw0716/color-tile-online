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

    this.fillTile(width, height, newBoard);

    this.#container.appendChild(newBoard);
  }

  fillTile(width, height, newBoard) {
    for (let i = 0; i < height; i++) {
      const subContainer = this.createTileRowContainer(i);

      for (let j = 0; j < width; j++) {
        const newTile = this.createTile(i, j);

        newTile.printTile(subContainer);
      }

      newBoard.appendChild(subContainer);
    }
  }

  createTileRowContainer(i) {
    const subContainer = document.createElement("div");

    subContainer.id = `${i}`;
    subContainer.style = `display: flex;`;

    return subContainer;
  }

  createTile(i, j) {
    let color;

    if (i % 2 === 0) {
      if (j % 2 === 0) color = "rgb(235, 235, 235)";
      else color = "rgb(246, 246, 246)";
    } else {
      if (j % 2 === 0) color = "rgb(246, 246, 246)";
      else color = "rgb(235, 235, 235)";
    }

    return new Tile(i, j, color);
  }
}
