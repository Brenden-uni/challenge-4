// Quiz Questions
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Paris", "Rome", "Berlin"],
        correctAnswer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        correctAnswer: 0
    },
    {
        question: "What is the chemical symbol for gold?",
        choices: ["Au", "Ag", "Fe", "Cu"],
        correctAnswer: 0
    },
    {
        question: "What is the largest planet in our solar system?",
        choices: ["Mars", "Jupiter", "Saturn", "Earth"],
        correctAnswer: 1
    },
    {
        question: "In which year did World War II end?",
        choices: ["1945", "1939", "1918", "1941"],
        correctAnswer: 0
    },
    {
        question: "What is the tallest mountain in the world?",
        choices: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"],
        correctAnswer: 0
    },
    {
        question: "Who wrote the novel 'Pride and Prejudice'?",
        choices: ["Jane Austen", "Charlotte Bronte", "Emily Bronte", "Virginia Woolf"],
        correctAnswer: 0
    },
    {
        question: "What is the symbol for the element oxygen?",
        choices: ["O", "Om", "Ox", "On"],
        correctAnswer: 0
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        choices: ["China", "Japan", "South Korea", "Thailand"],
        correctAnswer: 1
    },
    {
        question: "Who discovered penicillin?",
        choices: ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Albert Einstein"],
        correctAnswer: 0
    }
];

// Variables
let currentQuestionIndex = 0;
let score = 0;
let time = 60;
let timerInterval;

// Elements
const startButton = document.getElementById("start");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const feedbackElement = document.getElementById("feedback");
const timeRemainingElement = document.getElementById("time-remaining");

// Start the quiz
function startQuiz() {
    startButton.style.display = "none";
    timerInterval = setInterval(updateTime, 1000);
    displayQuestion();
}

// Display the current question and choices
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach((choice, index) => {
        const li = document.createElement("li");
        li.textContent = choice;
        li.setAttribute("data-index", index);
        li.addEventListener("click", checkAnswer);
        choicesElement.appendChild(li);
    });
}

// Check if the selected answer is correct
function checkAnswer(event) {
    const selectedChoice = event.target;
    const selectedAnswerIndex = parseInt(selectedChoice.getAttribute("data-index"));
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswerIndex === currentQuestion.correctAnswer) {
        score++;
        feedbackElement.textContent = "Correct!";
    } else {
        time -= 10;
        feedbackElement.textContent = "Wrong!";
    }

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        displayQuestion();
    }
}

// Update the timer
function updateTime() {
    time--;
    timeRemainingElement.textContent = time;

    if (time <= 0) {
        endQuiz();
    }
}

// End the quiz
function endQuiz() {
    clearInterval(timerInterval);

    // Display final score and save initials
    const initials = prompt("Enter your initials:");
    saveScore(initials, score);
    alert(`Quiz over! Your score is ${score}`);

    // Redirect to high scores page
    window.location.href = "highscores.html";
}

// Save the score to local storage
function saveScore(initials, score) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials, score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Event Listener
startButton.addEventListener("click", startQuiz);


