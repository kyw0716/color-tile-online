import StaticValues from "../static/StaticValues.js";
import Style from "../static/Style.js";
import gameAudio from "../utils/GameAudio.js";

export default class BoardView {
  #appDisplay;
  #board;
  #interv;

  constructor(container, board) {
    this.#appDisplay = container;
    this.#board = board;
  }

  getContainer() {
    const newBoard = document.createElement("div");

    newBoard.style = Style.TILE_BOARD;

    return newBoard;
  }

  renderTileBoard(row, column, score, tileBoard) {
    const scoreDiv = document.createElement("div");

    if (tileBoard.childElementCount > 2)
      for (let i = 0; i < row + 1; i++) {
        tileBoard.removeChild(tileBoard.lastChild);
      }

    scoreDiv.style = Style.SCORE_VIEWER;

    scoreDiv.innerHTML = `${score}`;

    tileBoard.appendChild(scoreDiv);

    this.#fillTile(row, column, tileBoard);
    this.#appDisplay.appendChild(tileBoard);
  }

  #fillTile(row, column, tileBoard) {
    for (let i = 0; i < row; i++) {
      const subContainer = this.#createTileRowContainer(i);

      for (let j = 0; j < column; j++) {
        this.#board.getBoard()[i][j].printTile(subContainer);
      }

      tileBoard.appendChild(subContainer);
    }
  }

  #createTileRowContainer(i) {
    const rowContainer = document.createElement("div");

    rowContainer.id = `${i}`;
    rowContainer.style = Style.ROW_CONTAINER;

    return rowContainer;
  }

  getStartButton(tileBoard, callback) {
    const startButton = document.createElement("button");

    startButton.style = Style.START_BUTTON;
    startButton.innerHTML = `시작하기`;

    startButton.addEventListener("click", () => {
      gameAudio.RIGHT_TILE_CLICKED.play();

      tileBoard.replaceChildren();
      this.#renderTimer(tileBoard, callback);
      this.#renderHomeButton(tileBoard, callback, true);
      this.renderTileBoard(
        StaticValues.BOARD_ROW,
        StaticValues.BOARD_COLUMN,
        this.#board.getScore(),
        tileBoard
      );
    });

    return startButton;
  }

  getPracticeModeButton(tileBoard, callback) {
    const practiceModeButton = document.createElement("button");

    practiceModeButton.style = Style.PRACTICE_MODE_BUTTON;
    practiceModeButton.innerHTML = `연습모드`;

    practiceModeButton.addEventListener("click", () => {
      clearInterval(this.#interv);

      gameAudio.RIGHT_TILE_CLICKED.play();

      tileBoard.replaceChildren();

      this.#renderHomeButton(tileBoard, callback, true);

      this.renderTileBoard(
        StaticValues.BOARD_ROW,
        StaticValues.BOARD_COLUMN,
        this.#board.getScore(),
        tileBoard
      );
    });

    return practiceModeButton;
  }

  #renderTimer(tileBoard, callback) {
    const timerContainer = document.createElement("div");
    const timer = document.createElement("progress");
    const timeSpan = document.createElement("span");
    let time = StaticValues.GAME_TIME;

    timerContainer.style = Style.TIMER_CONTAINER;
    timer.style = Style.TIMER;

    timer.max = StaticValues.GAME_TIME;
    timer.value = time;
    timeSpan.innerHTML = time;

    if (this.#interv) clearInterval(this.#interv);

    this.#interv = setInterval(() => {
      time -= 0.1;
      timer.value = time;
      timeSpan.innerHTML = `${Math.floor(time)}`;

      if (time < 0) {
        const div = document.createElement("div");

        if (this.#board.getScore() >= 150) gameAudio.RESULT_OVER_150.play();
        else gameAudio.RESULT_UNDER_150.play();

        div.innerHTML = `${this.#board.getScore()}점 입니다!`;
        div.style = Style.RESULT;

        this.#renderHomeButton(div, callback, false);

        tileBoard.replaceChildren(div);

        this.#board.reset(
          StaticValues.BOARD_ROW,
          StaticValues.BOARD_COLUMN,
          StaticValues.MAX_SCORE
        );

        clearInterval(this.#interv);
      }
    }, 100);

    timerContainer.appendChild(timer);
    timerContainer.appendChild(timeSpan);

    tileBoard.appendChild(timerContainer);
  }

  #renderHomeButton(tileBoard, callback, isPractice) {
    const homeButton = document.createElement("button");

    if (isPractice) homeButton.style = Style.PRACTICE_HOME_BUTTON;
    else homeButton.style = Style.GAME_HOME_BUTTON;
    homeButton.innerHTML = `홈으로`;

    homeButton.addEventListener("click", () => {
      clearInterval(this.#interv);

      gameAudio.RIGHT_TILE_CLICKED.play();

      this.#appDisplay.replaceChildren();
      callback();
    });

    tileBoard.appendChild(homeButton);
  }
}
