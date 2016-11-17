'use strict';

function pushToScreen(char) {
    //take the input character and push it onto the calculator screen
    if (!isValidChar(char)) {
        setScreen('Error');
    }

    if (shouldReplaceScreen(char)) {
        emptyScreen();
        readyForMore = true;
        setScreen(char);
    } else {
        appendToScreen(char);
    }
    return;
}

function emptyScreen() {
    $screen.val('');
    readyForMore=true;
    return;
}

function appendToScreen(char) {
  setScreen(grabScreen() + char);
  return;
}

function grabScreen() {
  return $screen.val();
}

function setScreen(text) {
  $screen.val(text);
  return;
}
