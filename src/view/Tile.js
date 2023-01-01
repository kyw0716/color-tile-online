class Tile {
  #row;
  #column;
  #color;

  constructor(row, column, color) {
    this.#row = row;
    this.#column = column;
    this.#color = color;
  }

  printTile(container) {
    const Tile = document.createElement("div");

    if (!["rgb(235, 235, 235)", "rgb(246, 246, 246)"].includes(this.#color)) {
      Tile.style = `width: 25px; height: 25px; background-color: ${
        this.#color
      }; border-radius: 3px; box-shadow: inset 0 0 5px white; border: 1px solid ${
        this.#color
      }; box-sizing: border-box;`;
    } else {
      Tile.style = `width: 25px; height: 25px; background-color: ${
        this.#color
      }; border-radius: 3px;`;
    }

    Tile.id = `${this.#row}_${this.#column}`;

    container.appendChild(Tile);
  }
}

export default Tile;
