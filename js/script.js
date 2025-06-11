const startButton = document.querySelector(".start__button button");
const infoBox = document.querySelector(".info__box");
const quitButton = infoBox.querySelector(".button__quit");
const continueButton = infoBox.querySelector(".button__restart");
const quizBox = document.querySelector(".quiz__box");
const optionList = document.querySelector(".option__list");
const timeCount = quizBox.querySelector(".timer .timer__sec");

let queCount = 0;
let queNumb = 1;
let counter;
let time = 15;

startButton.onclick = () => {
  infoBox.classList.add("activeInfo");
};

quitButton.onclick = () => {
  infoBox.classList.remove("activeInfo");
};

continueButton.onclick = () => {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.add("activeQuiz");
  showQuestions(queCount);
  queCounter(queNumb);
};

const nextButton = quizBox.querySelector(".next__button");
nextButton.onclick = () => {
  if (queCount < questions.length - 1) {
    queCount++;
    queNumb++;
    showQuestions(queCount);
    queCounter(queNumb);
    startTimer(15);
  } else {
    console.log("Questions completed");
  }
};

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

  optionList.classList.add("answered");
}

function queCounter(index) {
  const bottomQuesCounter = quizBox.querySelector(".total__que");
  let totalQuesCountTag = `<span><p>${index}</p>of<p>${questions.length}</p>Questions</span>`;
  bottomQuesCounter.innerHTML = totalQuesCountTag;
}

function startTimer() {
  clearInterval(counter); // Останавливаем предыдущий таймер
  time = 15; // Сбрасываем время
  timeCount.textContent = time; // Отображаем начальное время

  counter = setInterval(() => {
    time--;
    timeCount.textContent = time;

    if (time < 0) {
      clearInterval(counter); // Останавливаем таймер на 0
      timeCount.textContent = "0";
    }
  }, 1000);
}

// Первый запуск таймера
startTimer();
// При клике на кнопку "Next Question"
continueButton.addEventListener("click", () => {
  startTimer();
});

nextBtn.addEventListener("click", () => {
  startTimer(); // Заново запускаем таймер
  // Здесь можешь вызвать свою функцию, которая показывает следующий вопрос
});
