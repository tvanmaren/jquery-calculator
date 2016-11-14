'use strict';

var $screen;
var justCalculated;

$(function() {

    $screen = $('#screen');
    justCalculated = false;

    $('#buttons-container').click(handleClick);
});

function emptyScreen() {
    return $screen.empty();
}

function perform(operation) {
  console.log('operation',operation);
    //interprets & follows through on non-number buttons
    justCalculated = false;
    switch (operation) {
        case 'clear':
            return emptyScreen();
        case 'equals':
            justCalculated = numberCrunch();
            return justCalculated;
        default:
        console.log(operation);
            return pushToScreen(operation);
    }
}

function validChar(char) {
    if (typeof char === ('undefined' || 'Infinity')) {
        return false;
    } else if (isNaN(char) && typeof char === 'number') {
        return false;
    } else {
        return true;
    }
}

function canOverride(char) {
    return (justCalculated || $screen.text() === 'Error' || char === 'Error');
}

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
        $screen.text($screen.text() + char);
    }
    return;
}

function handleClick(event) {
    var $button = $(event.target);
    if ($button.is('span')) {
        if ($button.attr('class') === 'operator') {
            return perform($button.attr('id') || $button.text()); //perform operation
        } else {
            return pushToScreen($button.text());
        }
    }
}
