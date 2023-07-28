import { setDarkmode } from './darkmode.js';
import { setLanguage } from './language.js';
import { check_swap } from './swap.js';
import { beginExercice } from './exercice.js';

window.onload = function() {
    const lang = document.documentElement.lang;

    // Set the dark mode based on the user's preference
    setDarkmode();

    // Set the language based on the user's preference
    setLanguage();

    // Check if the user wants to swap the languages
    check_swap();

    // Begin an exercice, if the user clicks on the begin button
    beginExercice();
};