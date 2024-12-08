// This is JS code added in part-4 to add functionality to the quiz site.

// VARIABLES

// Array: stored question
// array consisting of many of the same components of a regular array, saved to a local placeholder.
// Used to display the current question.

// test question for rendering the questions menu
let $questionStored = {}

// Array: historyArr
// array that stores completed questions inside localStorage, deleting if reset by the user.
let $historyArr = [{
    category: "games",
    difficulty: "impossible",
    favourite: false,
    correct: false
}]

// Array difficultyArr
// stores all possible difficulties
const difficultyArr = [
    "Easy",
    "Medium",
    "Hard"
]

// retrieve local locations of certain containers
// retrieves location of mainCard element
const mainCard = document.getElementById('mainCard');
// retrieves location of historyCard element
const historyCard = document.getElementById('historyCard');

// retrieve locally stored data if they exist
const historyCorrectLS = JSON.parse(localStorage.getItem('historyCorrect'));
const historyWrongLS = JSON.parse(localStorage.getItem('historyWrong'));

// variables that track the number of correct and incorrect answers if locally stored. If they are not locally stored, then set them to 0.
// const historyCorrect
let historyCorrect = historyCorrectLS || 0;
// const historyWrong
let historyWrong = historyWrongLS || 0;

// FUNCTIONS

// renderDifficulties()
// render the difficulty panel out using the items in difficultyArr
function renderDifficulties() {
    let mainCardHTML = `<h2 class="fw-bold text-white text-center">Select a Difficulty</h2> <div class="form-group bg-secondary fw-bold py-3 rounded-32 d-flex flex-column justify-content-around" id="difficultyCard">`;

    difficultyArr.forEach(difficulty => {
        mainCardHTML += `<button type="button" class="btn btn-custom btn-custom-white d-block mb-2 fw-bold rounded-21 mx-auto diff-button"
        data-value = "${difficulty}"
        >${difficulty}</button>`;
    });

    mainCardHTML += `</div>`;

    mainCard.innerHTML = mainCardHTML;
    let $difficultyCard = document.getElementById("difficultyCard");

    // difficulty.addEventListener
    // upon selection of a difficulty with a button, send that difficulty to the callAPI function. Then, set $questionStored to the first array stored in the returned value. Finally, render the questionCard using the newly acquired question.
    $difficultyCard.addEventListener("click", async function (e) {
        if (e.target.classList.contains("diff-button")) {
            let response = await fetch(`https://quizapi.io/api/v1/questions?apiKey=UCqX477QStxiLPDFgh5E8PupeMhLIKB7HzEvJgxP&difficulty=${e.target.dataset.value}&limit=1`);
            let question = await response.json();
            $questionStored = question[0];
            renderQuestion();
        }
    });
}

renderDifficulties();



// API CALL
// https://quizapi.io/api/v1/questions?apiKey=UCqX477QStxiLPDFgh5E8PupeMhLIKB7HzEvJgxP&difficulty=Medium&limit=1

// renderQuestion()
// render the question pulled from the API into the space occupied by the difficulty content.
// loop through available answers to create grid of answers.
function renderQuestion() {
    let mainCardHTML = `<h2 class="fw-bold text-white text-center">Question</h2>
    <div class="form-group bg-white fw-bold py-3 rounded-32 d-flex flex-column mx-auto" id="questionCard">
        <div class="text-center fw-bold g-3">
            <h6 class="text-secondary p-1 mx-auto">${$questionStored.difficulty}</h6>
            <h6 class="text-white bg-secondary p-2 rounded-4 mx-auto">${$questionStored.category}</h6>
        </div>
        <h3 class="w-90 text-center mx-auto">${$questionStored.question}</h3>
        <div class="container grid w-90 p-3 overflow-hidden" id="questionContainer">
            <div class="row row-cols-1 row-cols-md-2 g-3 d-flex align-items-stretch">`;

    for (let answer in $questionStored.answers) {
        if ($questionStored.answers[answer]) {
            const correctKey = `${answer}_correct`;
            mainCardHTML += `
                <div class="col d-flex">
                    <button type="button"
                        class="btn btn-custom btn-custom-primary d-block fw-bold rounded-21 fs-6 flex-fill"
                        id="${answer}Btn"
                        data-correct="${$questionStored.correct_answers[correctKey]}">
                        ${$questionStored.answers[answer]}
                    </button>
                </div>`;
        }
    }

    mainCardHTML += `</div>
        </div>
        <button type="submit"
                    class="btn btn-custom-white d-flex flex-row mx-auto d-none questionContinue"  id = "questionContinue">Continue</button>
    </div>`;

    mainCard.innerHTML = mainCardHTML;

    let $questionContainer = document.getElementById("questionContainer");

    // event listener on question buttons to select an answer
    // update history values
    // display 'continue' button. 
    $questionContainer.addEventListener("click", function (e) {
        // Check if a button was clicked
        if (e.target.tagName === "BUTTON") {
            const selectedButton = e.target; // The clicked button
            const questionButtons = $questionContainer.querySelectorAll("button"); // All buttons in the question group

            // Loop through all buttons in the group
            questionButtons.forEach((button) => {
                // Add the 'correct' class to the correct button
                if (button.dataset.correct === "true") {
                    button.classList.add("correct");
                    if (button === selectedButton) {
                        historyCorrect++;
                    }
                } else {
                    // If the button is not the correct one, check if it's the selected button
                    if (button === selectedButton) {
                        // Add the 'wrong' class to the selected wrong button
                        button.classList.add("wrong");
                        historyWrong++;
                    }
                }

                // Add the 'faded' class to buttons that are neither 'correct' nor 'wrong'
                if (!button.classList.contains("correct") && !button.classList.contains("wrong")) {
                    button.classList.add("faded");
                }
            });

            // unhide Continue button to select another difficulty
            const questionContinue = document.getElementById("questionContinue");
            
            if (questionContinue) { // Ensure button exists before interacting with it
                questionContinue.classList.remove('d-none');
                questionContinue.addEventListener('click', function () {
                    renderDifficulties();
                });
            }

            renderHistory();
        }
    });
}

// renderQuestion();


// renderHistory()
// render the history out using the items in historyArr
function renderHistory() {
    let historyCardHTML = `<h2 class="fw-bold text-white text-center">History</h2>
    <!-- Title -->
    <div class="bg-secondary mx-auto p-4 rounded-32">
        <div class="d-none d-md-flex flex-row w-90 mx-auto">
            <h4 class="text-white rounded-4 ms-5 me-2 text-center">Category</h4><!-- H4: [Category] -->
            <h4 class="text-white ms-5 text-center">Difficulty</h4><!-- H4: [Difficulty] -->
        </div>`;

    // render all items from historyArr

    // render counters
    historyCardHTML += `<div class="d-flex flex-row w-75 mx-auto text-center text-white" id="historyCounters">
        <p class="col"><strong>Correct:</strong> ${historyCorrect}</p>
        <p class="col"><strong>Incorrect:</strong> ${historyWrong}</p>
    </div>
    <button class="btn btn-custom-white d-flex flex-row mx-auto" id = "historyReset">
    <img class="icon-27 me-2" src="assets/svg/reset.svg" alt="reset button">
    reset history
    </button>
    </div>
    </div>`;

    historyCard.innerHTML = historyCardHTML;

    writeHistory();

    // retrieve reset button location
    $reset = document.getElementById('historyReset');
    // event listener for reset button in history, sets historyArr to []

    $reset.addEventListener('click', function () {
        $historyArr = [];
        historyCorrect = 0;
        historyWrong = 0;
        renderHistory();
    });
}

renderHistory();

// writeHistory()
// write history values to JSON
function writeHistory(){
    localStorage.setItem('historyCorrect', JSON.stringify(historyCorrect));
    localStorage.setItem('historyWrong', JSON.stringify(historyWrong));
}