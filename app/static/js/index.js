import { setDarkmode } from './darkmode.js';
import { setLanguage } from './language.js';
import { check_swap } from './swap.js';

window.onload = function() {
    // Set the dark mode based on the user's preference
    setDarkmode();

    // Set the language based on the user's preference
    setLanguage();

    // Check if the swap button is clicked
    check_swap();
};