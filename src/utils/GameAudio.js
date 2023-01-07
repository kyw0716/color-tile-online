const failSound = document.getElementById("failMp3");
const successSound = document.getElementById("successMp3");
const over150Sound = document.getElementById("over150Mp3");
const under150Sound = document.getElementById("under150Mp3");

const gameAudio = Object.freeze({
  WRONG_TILE_CLICKED: failSound,
  RIGHT_TILE_CLICKED: successSound,
  RESULT_OVER_150: over150Sound,
  RESULT_UNDER_150: under150Sound,
});

export default gameAudio;
