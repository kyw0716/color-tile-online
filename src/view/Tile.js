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

    Tile.style = `width: 25px; height: 25px; background-color: ${
      this.#color
    }; border-radius: 3px`;
    Tile.id = `${this.#row}_${this.#column}`;

    container.appendChild(Tile);
  }
}

export default Tile;
