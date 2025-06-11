const startButton = document.querySelector(".start__button button");
const infoBox = document.querySelector(".info__box");
const quitButton = infoBox.querySelector(".button__quit");
const continueButton = infoBox.querySelector(".button__restart");
const quizBox = document.querySelector(".quiz__box");

const optionList = document.querySelector(".option__list");
startButton.onclick = () => {
  infoBox.classList.add("activeInfo");
};

quitButton.onclick = () => {
  infoBox.classList.remove("activeInfo");
};

continueButton.onclick = () => {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.add("activeQuiz");
  showQuestions(0);
  queCounter(1);
};

let queCount = 0;
let queNumb = 1;

const nextButton = quizBox.querySelector(".next__button");
nextButton.onclick = () => {
  if (queCount < questions.length - 1) {
    queCount++;
    queNumb++;
    showQuestions(queCount);
    queCounter(queNumb);
  } else {
    console.log("Questions completed");
  }
};
//getting questions and options from array

function showQuestions(index) {
  const queText = document.querySelector(".que__text");
  const optionList = document.querySelector(".option__list");
  let queTag =
    "<span>" +
    questions[index].numb +
    "." +
    questions[index].question +
    "</span>";
  let optionTag =
    '<div class="option">' +
    questions[index].options[0] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[1] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[2] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[3] +
    "<span></span></div>";
  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;
  const option = optionList.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  let userAns = answer.textContent;
  let correctAns = questions[queCount].answer;
  let allOptions = optionList.children.length;
  if (userAns == correctAns) {
    console.log("Answer is correct");
    answer.classList.add("correct");
  } else {
    answer.classList.add("incorrect");
    console.log("Answer is wrong");

    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAns) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }

    for (let index = 0; index < allOptions; i++) {
      const element = array[index];
      optionList.children[i].classList.add("disabled");
    }
  }
}
function queCounter(index) {
  const bottomQuesCounter = quizBox.querySelector(".total__que");
  let totalQuesCountTag =
    "<span><p>" +
    index +
    "</p>of<p>" +
    questions.length +
    "</p>Questions</span>";
  bottomQuesCounter.innerHTML = totalQuesCountTag;
}
