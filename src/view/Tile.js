import tileColors, { backGroundTileColors } from "../static/Colors.js";
import Style, { getTileStyle } from "../static/Style.js";

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
    const backgroundColor = [
      backGroundTileColors.LIGHT,
      backGroundTileColors.DARK,
    ];
    const isBackgroundTile = backgroundColor.includes(this.#color);

    Tile.style = getTileStyle(
      this.#gradientColor,
      this.#color,
      isBackgroundTile
    );

    Tile.id = `${this.#row}_${this.#column}`;

    Tile.addEventListener("click", () => {
      const [row, column] = Tile.id.split("_").map(Number);
      this.#tileClickCallback(row, column, tileColors.indexOf(this.#color));
    });

    container.appendChild(Tile);
  }

  #getGradationColor() {
    return (
      this.#color.replace(/rgb/, "rgba").slice(0, -1) +
      `, ${Style.GRADIENT_PERCENTAGE})`
    );
  }

  getColorCode() {
    return tileColors.indexOf(this.#color);
  }
}

export default Tile;
