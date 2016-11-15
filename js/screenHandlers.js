'use strict';

function pushToScreen(char) {
    //take the input character and push it onto the calculator screen
    if (!isValidChar(char)) {
        setScreen('Error');
    }

    if (shouldReplaceScreen(char)) {
        emptyScreen();
        readyForMore = false;
        setScreen(char);
    } else {
        appendToScreen(char);
    }
    return;
}

function emptyScreen() {
    $screen.empty();
    return;
}

function appendToScreen(char) {
  setScreen(grabScreen() + char);
  return;
}

function grabScreen() {
  return $screen.text();
}

function setScreen(text) {
  $screen.text(text);
  return;
}
