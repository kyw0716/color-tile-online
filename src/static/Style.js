const Style = Object.freeze({
  TILE_BOARD:
    "width: 660px; height: 480px; border: 1px solid lightgrey; border-radius: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative;",
  SCORE_VIEWER:
    "font-size: 15px; font-weight: bold; position: absolute; top: 20px; right: 40px",
  ROW_CONTAINER: "display: flex;",
  START_BUTTON:
    "width: 150px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 10px; font-size: 20px; font-weight: bold; background-color: white; border: 1px solid rgb(255, 74, 74); cursor: pointer; color: rgb(255, 74, 74);",
  PRACTICE_MODE_BUTTON:
    "width: 150px; height: 40px; margin-top: 10px; display: flex; align-items: center; justify-content: center; border-radius: 10px; font-size: 20px; font-weight: bold; background-color: white; border: 1px solid rgb(74, 190, 255); cursor: pointer; color: rgb(74, 190, 255);",
  TIMER_CONTAINER:
    "position: absolute; top: 20px; left: 100px; display: flex; align-items: center; gap: 5px; font-weight: bold; font-size: 12px",
  TIMER: "width: 400px; height: 20px",
  RESULT:
    "display: flex; justify-content: center; align-items: center; flex-direction: column; font-size: 40px; font-weight: bold;",
  PRACTICE_HOME_BUTTON:
    "position: absolute; top: 20px; left: 40px; display: flex; align-items: center; gap: 5px; font-weight: bold; font-size: 12px",
  GAME_HOME_BUTTON:
    "width: 150px; height: 40px; margin-top: 10px; display: flex; align-items: center; justify-content: center; border-radius: 10px; font-size: 20px; font-weight: bold; background-color: white; border: 1px solid rgb(125, 221, 65); cursor: pointer; color: rgb(125, 221, 65);",
  GRADIENT_PERCENTAGE: 0.6,
});

export const getTileStyle = (graidentColor, color, isBackground) => {
  if (isBackground)
    return `width: 25px; height: 25px; background-color: ${color}; border-radius: 3px;`;
  return `width: 25px; height: 25px; background: linear-gradient(${graidentColor}, ${color}, ${graidentColor}); border-radius: 3px; border: 1px solid ${color}; box-sizing: border-box;`;
};

export default Style;
