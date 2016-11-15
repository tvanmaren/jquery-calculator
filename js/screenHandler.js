'use strict';

function pushToScreen(char) {
    //take the input character and push it onto the calculator screen
    if (!validChar(char)) {
        $screen.text('Error');
    }

    if (canOverride(char)) {
        emptyScreen();
        justCalculated = false;
        $screen.text(char);
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
  $screen.text($screen.text() + char);
  return;
}
