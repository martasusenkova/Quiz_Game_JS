const startButton = document.querySelector(".start__button button");
const infoBox = document.querySelector(".info__box");
const quitButton = infoBox.querySelector(".button__quit");
const continueButton = infoBox.querySelector(".button__restart");
const quizBox = document.querySelector(".quiz__box");
const optionList = document.querySelector(".option__list");
const timeCount = quizBox.querySelector(".timer .timer__sec");
const timerText = quizBox.querySelector(".timer .timer__text");
const timeLine = document.querySelector(".time__line");
const nextButton = quizBox.querySelector(".next__button");
const resultBox = document.querySelector(".result__box");
const restartQuiz = resultBox.querySelector(".button .restart");
const quitQuiz = resultBox.querySelector(".button .quit");
const timeOff = document.querySelector("#timeOff");

let queCount = 0;
let queNumb = 1;
let counter;
let counterLine;
let time = 15;
let widthValue = 0;
let userScore = 0;

startButton.onclick = () => {
  infoBox.classList.add("activeInfo");
};

quitButton.onclick = () => {
  infoBox.classList.remove("activeInfo");
};

quitQuiz.onclick = () => {
  window.location.reload();
};

restartQuiz.onclick = () => {
  quizBox.classList.add("activeQuiz");
  resultBox.classList.remove("activeResult");
  resetQuiz();
};

function resetQuiz() {
  queCount = 0;
  queNumb = 1;
  time = 15;
  widthValue = 0;
  userScore = 0;

  showQuestions(queCount);
  queCounter(queNumb);
  clearInterval(counterLine);
  clearInterval(counter);
  startTimer();
  startTimerLine(0);

  nextButton.style.display = "none";
  timeOff.textContent = "Time left";
}

function showQuestions(index) {
  const queText = document.querySelector(".que__text");
  optionList.classList.remove("answered"); // сброс состояния "отвечено"

  let queTag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
  let optionTag = questions[index].options
    .map((opt) => `<div class="option">${opt}<span></span></div>`)
    .join("");

  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;

  const options = optionList.querySelectorAll(".option");
  options.forEach((option) => {
    option.setAttribute("onclick", "optionSelected(this)");
  });
}

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  const correctAns = questions[queCount].answer;
  const allOptions = optionList.children;
  if (optionList.classList.contains("answered")) return;

  for (let i = 0; i < allOptions.length; i++) {
    const option = allOptions[i];
    option.classList.remove("correct", "incorrect", "disabled");
    const oldIcon = option.querySelector("svg.icon");
    if (oldIcon) oldIcon.remove();
  }

  const tickIcon = `
    <svg class="icon tick" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="green" viewBox="0 0 24 24">
      <path d="M20.285 6.709l-11.285 11.292-5.285-5.292 1.414-1.414 3.871 3.878 9.871-9.878z"/>
    </svg>`;

  const crossIcon = `
    <svg class="icon cross" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#c33" viewBox="0 0 24 24">
      <path d="M18.3 5.71L12 12.01 5.71 5.71 4.29 7.12 10.59 13.41 4.29 19.7 5.71 21.12 12 14.83 18.29 21.12 19.71 19.7 13.41 13.41 19.71 7.12z"/>
    </svg>`;

  const userAns = answer.textContent.trim();

  if (userAns === correctAns) {
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
    userScore += 1;
    console.log(userScore);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    for (let i = 0; i < allOptions.length; i++) {
      const option = allOptions[i];
      if (option.textContent.trim() === correctAns) {
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", tickIcon);
        break;
      }
    }
  }

  for (let i = 0; i < allOptions.length; i++) {
    allOptions[i].classList.add("disabled");
  }
  nextButton.style.display = "block";

  optionList.classList.add("answered");
}

function queCounter(index) {
  const bottomQuesCounter = quizBox.querySelector(".total__que");
  let totalQuesCountTag = `Question ${index} of ${questions.length}`;
  bottomQuesCounter.innerHTML = totalQuesCountTag;
}

function showResultBox() {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");
  const scoreText = resultBox.querySelector(".score__text");
  if (userScore > 3) {
    let scoreTag =
      `  <span>
   Congrats, You got 
        <p>` +
      userScore +
      `</p>
        out of
        <p>` +
      questions.length +
      `</p>
      </span>`;
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      `  <span>
      Congrats, You got 
        <p>` +
      userScore +
      `</p>
        out of
        <p>` +
      questions.length +
      `</p>
      </span>`;
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      `  <span>
      Sorry, You got only
        <p>` +
      userScore +
      `</p>
        out of
        <p>` +
      questions.length +
      `</p>
      </span>`;
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer() {
  clearInterval(counter); // Останавливаем предыдущий таймер
  time = 15; // Сбрасываем время
  timeCount.textContent = time; // Отображаем начальное время

  counter = setInterval(() => {
    time--;
    timeCount.textContent = time;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      clearInterval(counterLine);

      timeCount.textContent = "00";
      timerText.textContent = "Time off";
      const correctAns = questions[queCount].answer;
      const allOptions = optionList.children;

      const tickIcon = `
    <svg class="icon tick" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="green" viewBox="0 0 24 24">
      <path d="M20.285 6.709l-11.285 11.292-5.285-5.292 1.414-1.414 3.871 3.878 9.871-9.878z"/>
    </svg>`;

      for (let i = 0; i < allOptions.length; i++) {
        const option = allOptions[i];
        if (option.textContent.trim() === correctAns) {
          option.classList.add("correct");
          option.insertAdjacentHTML("beforeend", tickIcon);
        }
        option.classList.add("disabled");
      }

      optionList.classList.add("answered");
      nextButton.style.display = "block";
    }
  }, 1000);
}

function startTimerLine(startWidth = 0) {
  clearInterval(counterLine);
  let currentWidth = startWidth;
  const maxWidth = 550;

  timeLine.style.width = "0";

  counterLine = setInterval(() => {
    currentWidth += 1;
    timeLine.style.width = currentWidth + "px";

    if (currentWidth >= maxWidth) {
      clearInterval(counterLine);
    }
  }, 29);
}

// При клике на кнопку "Next Question"
continueButton.onclick = () => {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.add("activeQuiz");
  showQuestions(queCount);
  queCounter(queNumb);
  startTimer(); //  запускаем таймер
  startTimerLine(0); // запускаем полосу времени
};

nextButton.onclick = () => {
  if (queCount < questions.length - 1) {
    queCount++;
    queNumb++;
    showQuestions(queCount);
    queCounter(queNumb);
    startTimer();
    startTimerLine(0);
  } else {
    console.log("Questions completed");
    showResultBox();
  }
};
