const easyHighScoresList = document.getElementById("easyHighScores");
const mediumHighScoresList = document.getElementById("mediumHighScores");
const hardHighScoresList = document.getElementById("hardHighScores");

const easyHighScores = JSON.parse(localStorage.getItem("easyHighScores")) || [];
const mediumHighScores =
  JSON.parse(localStorage.getItem("mediumHighScores")) || [];
const hardHighScores = JSON.parse(localStorage.getItem("hardHighScores")) || [];

easyHighScoresList.innerHTML = easyHighScores
  .map((score) => {
    return `<li class="highscores__item">${score.name}-${score.score}</li>`;
  })
  .join();
mediumHighScoresList.innerHTML = mediumHighScores
  .map((score) => {
    return `<li class="highscores__item highscores__item--yellow">${score.name}-${score.score}</li>`;
  })
  .join();
hardHighScoresList.innerHTML = hardHighScores
  .map((score) => {
    return `<li class="highscores__item highscores__item--red">${score.name}-${score.score}</li>`;
  })
  .join();
