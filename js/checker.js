'use strict';

function validChar(char) {
  //returns false for non-numbers, NaN's, and infinities
    if (typeof char === ('undefined' || 'Infinity')) {
        return false;
    } else if (isNaN(char) && typeof char === 'number') {
        return false;
    } else {
        return true;
    }
}

function canOverride(char) {
  //whether to replace(true) or add to(false) the screen
    return (justCalculated || $screen.text() === 'Error' || char === 'Error');
}
