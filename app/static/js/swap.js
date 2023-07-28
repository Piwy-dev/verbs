/**
 * @function swap
 * @description Swaps the two elements in the DOM (swaps their positions)
 * @param {HTMLElement} element1
 * @param {HTMLElement} element2
 */
function swap(element1, element2) {
    const parent1 = element1.parentNode;
    const parent2 = element2.parentNode;

    const nextSibling1 = element1.nextSibling;
    const nextSibling2 = element2.nextSibling;

    parent2.insertBefore(element1, nextSibling2);
    parent1.insertBefore(element2, nextSibling1);
}

/**
 * @function check_swap
 * @description Checks if the swap button is clicked and calls the swap function
 */
export function check_swap() {
    // Get the page language
    const lang = document.documentElement.lang;

    // Verify if the user is on the translation page
    if (window.location.pathname !== `/${lang}/translation`) { return; }

    const swapButton = document.getElementById('swap-button');
    const element1 = document.getElementById('element1');
    const element2 = document.getElementById('element2');

    // Keep track of the swaps
    const swapKeeper = document.getElementById('swap-keeper');
    let swaped = false;

    swapButton.addEventListener('click', () => {
        swap(element1, element2);
        swaped = !swaped;
        if (swaped) {
            swapKeeper.classList.add('swaped');
        } else {
            swapKeeper.classList.remove('swaped');
        }
    });
}