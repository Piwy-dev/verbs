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
    const swapButton = document.getElementById('swap-button');
    const element1 = document.getElementById('element1');
    const element2 = document.getElementById('element2');

    swapButton.addEventListener('click', () => {
        swap(element1, element2);
    });
}