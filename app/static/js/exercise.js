/**
 * @function beginExercise
 * @description Sends a post request to the server to begin an exercise when the user clicks on the begin button.
 */
export function beginExercise() {
    // Verify if the user is on the translation page excluding the domain name
    const lang = document.documentElement.lang;
    if (window.location.pathname !== `/${lang}/translation`) { return; }

    // Get the begin button
    const beginButton = document.getElementById('begin');

    // Get the informations needed to begin the exercise
    const languageSelector = document.getElementById('element1');
    const swapKeeper = document.getElementById('swap-keeper');

    // Check if the begin button is clicked
    beginButton.addEventListener("click", async () => {
        const response = await fetch(`/${lang}/exercise`, {
            method: "POST",
            headers: {
                startlang: swapKeeper.classList.contains('swaped') ? "fr" : languageSelector.value,
                endlang: swapKeeper.classList.contains('swaped') ? languageSelector.value : "fr",
                tense: 0
            }
        });
        
        if (response.ok) {
            const verbs_list = await response.json();
            localStorage.setItem('verbs_list', JSON.stringify(verbs_list));

            window.location.href = `/${lang}/exercise`;
        } else {
            console.log("Error while starting the exercise.");
        }
    });
}

let good_answers = 0;
let question_number = 0;

/**
 * @function showExercise
 * @description Shows the exercise to the user.
 */
export function showExercise() {
    // Verify if the user is on the exercise page excluding the domain name
    const lang = document.documentElement.lang;
    if (window.location.pathname !== `/${lang}/exercise`) { return; }

    // Get the verbs list
    const verbs_list = JSON.parse(localStorage.getItem('verbs_list'));

    // Show the verb
    const verb = document.getElementById('verb');
    verb.innerHTML = verbs_list[question_number][0];

    console.log(verbs_list[question_number][0]);

    const sumbitAnswer = document.getElementById('submit-answer');
    sumbitAnswer.addEventListener("submit", (event) => {
        event.preventDefault();
        verifyAnswer();
    });
}


/**
 * @function verifyAnswer
 * @description Verifies if the answer is correct.
 */
function verifyAnswer() {
    const lang = document.documentElement.lang;
    let translations = {
        "good_answer": {
            "fr": "Bonne réponse !",
            "en": "Good answer !",
            "nl": "Goed antwoord !"
        },
        "bad_answer": {
            "fr": "Mauvaise réponse ! La réponse était : ",
            "en": "Bad answer ! The answer was : ",
            "nl": "Fout antwoord ! Het antwoord was : "
        },
        "question": {
            "fr": "Question : ",
            "en": "Question : ",
            "nl": "Vraag : "
        },
    }

    // Get the verbs list
    const verbs_list = JSON.parse(localStorage.getItem('verbs_list'));

    const answer = document.getElementById('answer').value;
    const correct_answers = verbs_list[question_number][1].split(", ");

    const result = document.getElementById('result');
    const qstCount = document.getElementById('qst-count');
    const score = document.getElementById('score');

    if (correct_answers.includes(answer)) {
        good_answers++;
        result.innerHTML = translations["good_answer"][lang];
        result.style.color = "green";
        qstCount.innerHTML = `${translations["question"][lang]} ${question_number + 1}/20.`;
        score.innerHTML = `Score : ${good_answers}`;
    } else {
        result.innerHTML = `${translations["bad_answer"][lang]} ${verbs_list[question_number][1]}`;
        result.style.color = "red";
        qstCount.innerHTML = `${translations["question"][lang]} ${question_number}/20.`;
    }

    question_number++;

    if (question_number > 19) {
        const lang = document.documentElement.lang;
        window.location.href = `/${lang}/results`;
    } else {
        document.getElementById('answer').value = "";
        document.getElementById('answer').focus();

        // Show the next verb
        const verb = document.getElementById('verb');
        verb.innerHTML = verbs_list[question_number][0];
    }
}
