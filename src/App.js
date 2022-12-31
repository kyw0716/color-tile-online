import colorTileController from "./controller/colorTileController.js";

class App {
  #colorTileController = new colorTileController();

  play() {
    this.#colorTileController.startGame();
  }
}

new App().play();
