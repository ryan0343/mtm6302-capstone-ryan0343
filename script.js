// This is JS code added in part-4 to add functionality to the quiz site.

// VARIABLES

// Array: stored question
// array consisting of many of the same components of a regular array, saved to a local placeholder.
// Used to display the current question.

// test question for rendering the questions menu
const questionStored = {
    id: 2693,
    question: "How do you use a serializer to validate data before saving it to the database in DRF?",
    description: "Validating data before saving ensures that only correct data is stored in the database.",
    answers: {
        "answer_a": "Call the is_valid() method before calling save()",
        "answer_b": "Directly call the save() method",
        "answer_c": "Use the @validate_data decorator",
        "answer_d": "Override the perform_create() method",
        "answer_e": null,
        "answer_f": null
    },
    multiple_correct_answers: "false",
    correct_answers: {
        "answer_a_correct": "true",
        "answer_b_correct": "false",
        "answer_c_correct": "false",
        "answer_d_correct": "false",
        "answer_e_correct": "false",
        "answer_f_correct": "false"
    },
    correct_answer: null,
    explanation: "To validate data before saving it to the database, call the is_valid() method on the serializer to ensure that the data meets the validation requirements.",
    tip: null,
    tags: [{
        "name": "Django"
    }],
    category: "Django",
    difficulty: "Medium"
}

// Array: historyArr
// array that stores completed questions inside localStorage, deleting if reset by the user.
const historyArr = [{
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
    let mainCardHTML = `<h2 class="fw-bold text-white text-center">Select a Difficulty</h2> <div class="form-group bg-secondary fw-bold py-3 rounded-32 d-flex flex-column justify-content-around">`;

    difficultyArr.forEach(difficulty => {
        mainCardHTML += `<button type="button" class="btn btn-custom btn-custom-white d-block mb-2 fw-bold rounded-21 mx-auto"
        data-value = "${difficulty}"
        >${difficulty}</button>`;
    });

    mainCardHTML += `</div>`;

    mainCard.innerHTML = mainCardHTML;
}

// renderDifficulties();

// difficulty.addEventListener
// upon selection of a difficulty with a button, send that difficulty to the callAPI function

// API CALL
// https://quizapi.io/api/v1/questions?apiKey=UCqX477QStxiLPDFgh5E8PupeMhLIKB7HzEvJgxP&difficulty=Medium&limit=1

// renderQuestion()
// render the question pulled from the API into the space occupied by the difficulty content.
// loop through available answers to create grid of answers.
// Display "submit"
function renderQuestion() {
    let mainCardHTML = `<h2 class="fw-bold text-white text-center">Question</h2>
    <div class="form-group bg-white fw-bold py-3 rounded-32 d-flex flex-column mx-auto">
    <div class="text-center fw-bold g-3">
        <h6 class="text-secondary p-1 mx-auto">${questionStored.difficulty}</h6><!-- H4: [Difficulty] -->
        <h6 class="text-white bg-secondary p-2 rounded-4 mx-auto">${questionStored.category}</h6><!-- H4: [Category] -->
    </div>
    <h3 class="w-90 text-center mx-auto">${questionStored.question}</h3>
    <div class="container grid w-90 p-3 overflow-hidden">
    <div class="row row-cols-6">`;

    for (let answer in questionStored.answers) {
        if (questionStored.answers[answer]) {
            mainCardHTML += ` <div class="col-12 col-md-6 mb-3">
            <button type="button"
                class="btn btn-custom btn-custom-primary d-block fw-bold rounded-21 fs-6 w-100"
                id="${answer}Btn">${questionStored.answers[answer]}</button>
        </div>`;
        }
    };

    mainCardHTML += `</div>
            </div>
        </div>`;
    
    mainCard.innerHTML = mainCardHTML;
}

renderQuestion();

// event listener on question buttons to select an answer

// event listener on submit button to submit answer, show correct answer, compare to selected answer and save to historyArr as a new question along with whether the question was selected properly or not.

// renderHistory()
// render the history out using the items in historyArr
function renderHistory(){
    historyCardHTML = `<h2 class="fw-bold text-white text-center">History</h2>
    <!-- Title -->
    <div class="bg-secondary mx-auto p-4 rounded-32">
        <div class="d-none d-md-flex flex-row w-90 mx-auto">
            <h4 class="text-white rounded-4 ms-5 me-2 text-center">Category</h4><!-- H4: [Category] -->
            <h4 class="text-white ms-5 text-center">Difficulty</h4><!-- H4: [Difficulty] -->
        </div>`;

    historyCardHTML += `<div class="d-flex flex-row w-75 mx-auto text-center text-white">
        <p class="col"><strong>Correct:</strong> ${historyCorrect}</p>
        <p class="col"><strong>Incorrect:</strong> ${historyWrong}</p>
    </div>
    <button class="btn btn-custom-white d-flex flex-row mx-auto">
    <img class="icon-27 me-2" src="assets/svg/reset.svg" alt="reset button">
    reset history
    </button>
    </div>
    </div>`;

    historyCard.innerHTML = historyCardHTML;
}

renderHistory();
// event listener for reset button in history, sets historyArr to []