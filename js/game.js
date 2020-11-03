var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("card__answer"));
const scoreTracker = document.getElementById("score");
const questionTracker = document.getElementById("questionTracker");
const gameOverlay = document.getElementById("gameOverlay");
const questionLoader = document.getElementById("loader");
const mainPage = document.getElementById("mainPage");
const gamePage = document.getElementById("gamePage");
const launchGame = document.getElementById("startGame");
const mainLoader = document.getElementById("loaderMain");
const difficulty = document.getElementById("selectDiff");
const selectErrorMessage = document.getElementById("selectErrorMessage");
let gameUrl = "https://opentdb.com/api.php?amount=10&type=multiple";
let score = 0;
let questionCounter = 0;
let currentQuestion = {};
let availableQuestions = [];
let questions = [];

launchGame.addEventListener("click", () => {
  selectErrorMessage.innerText = "";
  if (difficulty.value.length == 0) {
    selectErrorMessage.innerText = "Please select difficulty!";

    return;
  }
  gameUrl += `&difficulty=${difficulty.value}`;
  fetch(gameUrl)
    .then((res) => res.json())
    .then((data) => {
      var resultsArr = Array.from(data.results);
      // Reformatting the question to display answer in a random spot
      questions = resultsArr.map((loadedQuestion) => {
        const finalQuestion = {
          question: loadedQuestion.question,
        };
        const answerChoices = [...loadedQuestion.incorrect_answers];
        finalQuestion.answer = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(
          finalQuestion.answer - 1,
          0,
          loadedQuestion.correct_answer
        );

        answerChoices.forEach((item, index) => {
          finalQuestion[index + 1] = item;
        });
        return finalQuestion;
      });
      mainPage.classList.add("hidden");
      mainLoader.classList.remove("hidden");
      setTimeout(() => {
        gamePage.classList.remove("hidden");
        mainLoader.classList.add("hidden");
        startGame();
      }, 1000);
    })
    .catch((err) => {
      console.error(err);
    });

  startGame = () => {
    score = 0;
    availableQuestions = [...questions];
    questionCounter = 0;
    getQuestion();
  };
});

const MAX_QUESTIONS = 10;
const CORRECT_BONUS = 10;
getQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // recent score naudoju paskutiniam display o hhscore perduot difficulty
    gamePage.classList.add("hidden");
    mainLoader.classList.remove("hidden");
    mostRecentScore = score;
    const highScoresScore = {
      difficulty: difficulty.value,
      score: score,
    };

    localStorage.setItem("highScoresScore", JSON.stringify(highScoresScore));
    localStorage.setItem("mostRecentScore", mostRecentScore);
    return window.location.assign("/end.html");
  }
  questionCounter++;
  questionTracker.style.width = questionCounter * 10 + "%";

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question || {};
  choices.forEach((answer) => {
    const number = answer.dataset["answer"];
    answer.innerText = currentQuestion[number];
  });
  availableQuestions.splice(questionIndex, 1);
};
choices.forEach((item) => {
  item.addEventListener("click", (e) => {
    const answerIndex = e.target.dataset["answer"];

    const classToApply =
      answerIndex == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply == "correct") {
      score++;
      const currentScore = score * CORRECT_BONUS;
      scoreTracker.innerText = currentScore;
    }
    e.target.classList.add(classToApply);

    setTimeout(() => {
      gameOverlay.classList.add("hidden");
      questionLoader.classList.remove("hidden");
    }, 350);
    setTimeout(() => {
      e.target.classList.remove(classToApply);
      gameOverlay.classList.remove("hidden");
      questionLoader.classList.add("hidden");
      getQuestion();
    }, 1500);
  });
});
