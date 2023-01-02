export default class BoardView {
  #container;
  #board;

  constructor(container, board) {
    this.#container = container;
    this.#board = board;
  }

  printBoard(row, column, score) {
    const newBoard = document.createElement("div");
    const scoreDiv = document.createElement("div");

    newBoard.style =
      "width: 660px; height: 480px; border: 1px solid black; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative;";
    scoreDiv.style =
      "font-size: 15px; font-weight: bold; position: absolute; top: 20px; right: 40px";
    scoreDiv.innerHTML = `${score}`;

    newBoard.appendChild(scoreDiv);

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

  printStart() {
    const startButton = document.createElement("button");

    startButton.innerHTML = `START`;

    startButton.addEventListener("click", () => {
      this.#container.replaceChildren();
      this.printBoard(15, 23, this.#board.getScore());

      setTimeout(() => {
        const div = document.createElement("div");

        div.innerHTML = `${this.#board.getScore()}점 입니다!`;
        div.style =
          "display: flex; justify-content: center; align-items: center; flex-direction: column";
        div.appendChild(startButton);

        this.#board.reset(15, 23, 200);

        this.#container.replaceChildren(div);
      }, 120_000);
    });

    this.#container.appendChild(startButton);
  }
}
