/**
 * @function beginExercice
 * @description Sends a post request to the server to begin an exercice when the user clicks on the begin button.
 */
export function beginExercice() {
    // Get the page language
    const lang = document.documentElement.lang;

    // Verify if the user is on the translation page excluding the domain name

    if (window.location.pathname !== `/${lang}/translation`) { return; }

    // Get the begin button
    const beginButton = document.getElementById('begin');

    // Get the informations needed to begin the exercice
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
            window.location.href = `/${lang}/exercise`;
        } else {
            console.log("Error while starting the exercice.");
        }
    });
}