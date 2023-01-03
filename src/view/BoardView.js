export default class BoardView {
  #appDisplay;
  #board;

  constructor(container, board) {
    this.#appDisplay = container;
    this.#board = board;
  }

  getContainer() {
    const newBoard = document.createElement("div");

    newBoard.style =
      "width: 660px; height: 480px; border: 1px solid lightgrey; border-radius: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative;";

    return newBoard;
  }

  renderTileBoard(row, column, score, tileBoard) {
    if (tileBoard.childElementCount > 1)
      for (let i = 0; i < row + 1; i++) {
        tileBoard.removeChild(tileBoard.lastChild);
      }

    const scoreDiv = document.createElement("div");

    scoreDiv.style =
      "font-size: 15px; font-weight: bold; position: absolute; top: 20px; right: 40px";
    scoreDiv.innerHTML = `${score}`;

    tileBoard.appendChild(scoreDiv);

    this.#fillTile(row, column, tileBoard);
    this.#appDisplay.appendChild(tileBoard);
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

  getStartButton(tileBoard) {
    const startButton = document.createElement("button");

    startButton.style = `width: 150px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 10px; font-size: 20px; font-weight: bold; background-color: white; border: 1px solid rgb(255, 74, 74); cursor: pointer; color: rgb(255, 74, 74);`;
    startButton.innerHTML = `START`;

    startButton.addEventListener("click", () => {
      tileBoard.replaceChildren();
      this.#renderTimer(tileBoard);
      this.renderTileBoard(15, 23, this.#board.getScore(), tileBoard);

      setTimeout(() => {
        const div = document.createElement("div");

        div.innerHTML = `${this.#board.getScore()}점 입니다!`;
        div.style =
          "display: flex; justify-content: center; align-items: center; flex-direction: column; font-size: 40px; font-weight: bold;";
        div.appendChild(startButton);

        this.#board.reset(15, 23, 200);

        tileBoard.replaceChildren(div);
      }, 120_000);
    });

    return startButton;
  }

  getPracticeModeButton(tileBoard, callback) {
    const practiceModeButton = document.createElement("button");

    practiceModeButton.style = `width: 150px; height: 40px; margin-top: 10px; display: flex; align-items: center; justify-content: center; border-radius: 10px; font-size: 20px; font-weight: bold; background-color: white; border: 1px solid rgb(74, 190, 255); cursor: pointer; color: rgb(74, 190, 255);`;
    practiceModeButton.innerHTML = `PRACTICE`;

    practiceModeButton.addEventListener("click", () => {
      tileBoard.replaceChildren();

      this.#renderHomeButton(tileBoard, callback);

      this.renderTileBoard(15, 23, this.#board.getScore(), tileBoard);
    });

    return practiceModeButton;
  }

  #renderTimer(tileBoard) {
    const timerContainer = document.createElement("div");
    const timer = document.createElement("progress");
    const timeSpan = document.createElement("span");
    let time = 120;

    timerContainer.style = `position: absolute; top: 20px; left: 40px; display: flex; align-items: center; gap: 5px; font-weight: bold; font-size: 12px`;
    timer.style = `width: 400px; height: 20px`;

    timer.max = 120;
    timer.value = time;
    timeSpan.innerHTML = time;

    setInterval(() => {
      time -= 0.1;
      timer.value = time;
      timeSpan.innerHTML = `${Math.floor(time)}`;
    }, 100);

    timerContainer.appendChild(timer);
    timerContainer.appendChild(timeSpan);

    tileBoard.appendChild(timerContainer);
  }

  #renderHomeButton(tileBoard, callback) {
    const homeButton = document.createElement("button");

    homeButton.style = `position: absolute; top: 20px; left: 40px; display: flex; align-items: center; gap: 5px; font-weight: bold; font-size: 12px`;
    homeButton.innerHTML = `HOME`;

    homeButton.addEventListener("click", () => {
      this.#appDisplay.replaceChildren();

      callback();
    });

    tileBoard.appendChild(homeButton);
  }
}
