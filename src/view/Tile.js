import tileColors from "../static/Colors.js";

class Tile {
  #row;
  #column;
  #color;
  #gradientColor;
  #tileClickCallback;

  constructor(row, column, color, tileClickCallback) {
    this.#row = row;
    this.#column = column;
    this.#color = color;
    this.#gradientColor = this.#getGradationColor();
    this.#tileClickCallback = tileClickCallback;
  }

  printTile(container) {
    const Tile = document.createElement("div");

    if (!["rgb(235, 235, 235)", "rgb(246, 246, 246)"].includes(this.#color)) {
      Tile.style = `width: 25px; height: 25px; background: linear-gradient(${
        this.#gradientColor
      }, ${this.#color}, ${
        this.#gradientColor
      }); border-radius: 3px; border: 1px solid ${
        this.#color
      }; box-sizing: border-box;`;
    } else {
      Tile.style = `width: 25px; height: 25px; background-color: ${
        this.#color
      }; border-radius: 3px;`;
    }

    Tile.id = `${this.#row}_${this.#column}`;

    Tile.addEventListener("click", () => {
      const [row, column] = Tile.id.split("_").map(Number);
      this.#tileClickCallback(row, column, tileColors.indexOf(this.#color));
    });

    container.appendChild(Tile);
  }

  #getGradationColor() {
    return this.#color.replace(/rgb/, "rgba").slice(0, -1) + ", 0.6)";
  }

  getColorCode() {
    return tileColors.indexOf(this.#color);
  }
}

export default Tile;
