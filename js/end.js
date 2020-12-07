const finalScore = document.getElementById("finalScore");
const winImages = Array.from(document.getElementsByClassName("win"));
const loseImage = document.getElementsByClassName("defeat");
const finalMessage = document.getElementById("finalMessage");
var saveScoreBtn = document.getElementById("saveScoreBtn");
var username = document.getElementById("username");
const mostRecentScore = localStorage.getItem("mostRecentScore") * 10;
const highScoresScore = JSON.parse(localStorage.getItem("highScoresScore"));

const easyHighScores = JSON.parse(localStorage.getItem("easyHighScores")) || [];
const mediumHighScores = JSON.parse(localStorage.getItem("mediumHighScores")) || [];
const hardHighScores = JSON.parse(localStorage.getItem("hardHighScores")) || [];

finalScore.innerHTML = `Final score: <span>${mostRecentScore}</span>`;
if (mostRecentScore >= 50) {
  winImages.forEach((image) => {
    finalMessage.innerHTML = "Not bad &#128170";
    image.classList.remove("hidden");
  });
} else {
  loseImage[0].classList.remove("hidden");
  finalMessage.innerHTML = "Better luck next time &#128012";
}

username.addEventListener("keyup", function () {
  saveScoreBtn.disabled = !username.value;
});

// Save high scores
const HIGH_SCORES_MAX = 5;
saveHighScore = (e) => {
  e.preventDefault();
  const score = {
    name: username.value,
    score: mostRecentScore,
  };

  if (highScoresScore.difficulty == "easy") {
    easyHighScores.push(score);
    easyHighScores.sort((a, b) => b.score - a.score);
    easyHighScores.splice(HIGH_SCORES_MAX);
    localStorage.setItem("easyHighScores", JSON.stringify(easyHighScores));
  } else if (highScoresScore.difficulty == "medium") {
    mediumHighScores.push(score);
    mediumHighScores.sort((a, b) => b.score - a.score);
    mediumHighScores.splice(HIGH_SCORES_MAX);
    localStorage.setItem("mediumHighScores", JSON.stringify(mediumHighScores));
  } else if (highScoresScore.difficulty == "hard") {
    hardHighScores.push(score);
    hardHighScores.sort((a, b) => b.score - a.score);
    hardHighScores.splice(HIGH_SCORES_MAX);
    localStorage.setItem("hardHighScores", JSON.stringify(hardHighScores));
  }

  window.location.assign("/index.html");
};
