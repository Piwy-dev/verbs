import { setDarkmode } from './darkmode.js';
import { setLanguage } from './language.js';
import { check_swap } from './swap.js';
import { beginExercise, showExercise, showResults } from './exercise.js';

window.onload = function() {
    // Set the dark mode based on the user's preference
    setDarkmode();

    // Set the language based on the user's preference
    setLanguage();

    // Check if the user wants to swap the languages
    check_swap();

    // Begin an exercice, if the user clicks on the begin button
    beginExercise();
    showExercise();

    showResults();
};