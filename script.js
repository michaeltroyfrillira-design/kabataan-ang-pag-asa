// KABATAAN ANG PAG-ASA — INTERACTIONS

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll("#navMenu a").forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Interactive quiz
const questions = [
    {
        question: "What is one way students can help their community?",
        answers: [
            "A. Spread unverified information",
            "B. Join responsible community activities",
            "C. Ignore community problems"
        ],
        correct: 1,
        explanation: "Correct! Responsible community involvement can help address local needs."
    },
    {
        question: "Why is education important for young Filipinos?",
        answers: [
            "A. It develops knowledge and critical thinking",
            "B. It removes the need to learn from others",
            "C. It guarantees that every problem disappears"
        ],
        correct: 0,
        explanation: "Correct! Education helps young people develop skills to understand and solve problems."
    },
    {
        question: "What should you do before sharing a news story online?",
        answers: [
            "A. Share it immediately",
            "B. Trust it because it is popular",
            "C. Check its accuracy using reliable sources"
        ],
        correct: 2,
        explanation: "Correct! Checking reliable sources helps prevent the spread of misinformation."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("quizProgress");
const nextButton = document.getElementById("nextQuestion");
const resultElement = document.getElementById("quizResult");
const restartButton = document.getElementById("restartQuiz");

function showQuestion() {
    answered = false;
    const item = questions[currentQuestion];

    progress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    questionElement.textContent = item.question;
    answerButtons.innerHTML = "";
    feedback.textContent = "";
    resultElement.textContent = "";
    nextButton.hidden = true;
    restartButton.hidden = true;

    item.answers.forEach(function (answer, index) {
        const button = document.createElement("button");
        button.className = "answer-btn";
        button.textContent = answer;
        button.addEventListener("click", function () {
            checkAnswer(index, button);
        });
        answerButtons.appendChild(button);
    });
}

function checkAnswer(selectedIndex, selectedButton) {
    if (answered) return;

    answered = true;
    const item = questions[currentQuestion];
    const buttons = answerButtons.querySelectorAll("button");

    buttons.forEach(function (button) {
        button.disabled = true;
    });

    if (selectedIndex === item.correct) {
        score++;
        selectedButton.classList.add("correct");
        feedback.textContent = item.explanation;
    } else {
        selectedButton.classList.add("incorrect");
        buttons[item.correct].classList.add("correct");
        feedback.textContent = "Not quite. " + item.explanation;
    }

    nextButton.hidden = false;
    nextButton.textContent = currentQuestion === questions.length - 1
        ? "See My Result"
        : "Next Question →";
}

nextButton.addEventListener("click", function () {
    if (!answered) return;

    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    questionElement.textContent = "Quiz Completed! 🇵🇭";
    progress.textContent = "Your final score";
    answerButtons.innerHTML = "";
    feedback.textContent = "";
    nextButton.hidden = true;
    resultElement.textContent = `You scored ${score} out of ${questions.length}! ` +
        (score === questions.length ? "Excellent work!" : "Keep learning and try again!");
    restartButton.hidden = false;
}

restartButton.addEventListener("click", function () {
    currentQuestion = 0;
    score = 0;
    answered = false;
    showQuestion();
});

showQuestion();

// Reflection saved locally in this browser only
const reflectionInput = document.getElementById("reflectionInput");
const saveReflection = document.getElementById("saveReflection");
const reflectionMessage = document.getElementById("reflectionMessage");

try {
    const savedReflection = localStorage.getItem("kabataanReflection");
    if (savedReflection) reflectionInput.value = savedReflection;
} catch (error) {
    console.log("Local storage is unavailable.");
}

saveReflection.addEventListener("click", function () {
    const reflection = reflectionInput.value.trim();

    if (!reflection) {
        reflectionMessage.textContent = "Please write your commitment first.";
        return;
    }

    try {
        localStorage.setItem("kabataanReflection", reflection);
        reflectionMessage.textContent = "Your commitment has been saved on this device! 🇵🇭";
    } catch (error) {
        reflectionMessage.textContent =
            "Your browser could not save the reflection. You can copy it and keep it somewhere safe.";
    }
});
