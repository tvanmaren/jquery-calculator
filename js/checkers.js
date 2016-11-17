'use strict';

function inputCheck(expression = '') {

    //returns true if expression includes no operators

    //for lack of an argument, we grab the screen
    if (!expression) {
        expression = grabScreen();
    }

    var argArray;
    const symbols = {
        '÷': '/',
        'x': '*',
        '+': '+',
        '-': '-'
    };

    //search for mathematical operators in the current expression
    for (let symbol in symbols) {
        console.log('searching for', symbol, 'in', expression);

        if (expression.includes(symbol)) {

            if (expression!==grabScreen()) {
                //if we find another operator after already splitting our arguments apart
                return false;
            }

            argArray = splitAtOperator(expression, symbol);

            if (symbol === '-') {
                argArray = convertNegatives(argArray);
            }

            if (isValidInput(argArray)) {
                //if we found an operator, we're looking at the screen, and we have a base case of input
                readyForMore = true;
                pushToScreen(evaluate(argArray, symbols[symbol]));
                return true;
            } else {
                //if our argument wasn't valid
                pushToScreen('Error');
                return false;
            }
        }
    }
    //if no operators found
    return true;
}

function isValidChar(char) {
    //returns false for non-numbers, NaN's, and infinities
    if (typeof char === ('undefined' || 'Infinity')) {
        return false;
    } else if (isNaN(char) && typeof char === 'number') {
        return false;
    } else {
        return true;
    }
}

function shouldReplaceScreen(char) {
    //whether to replace(true) or add to(false) the screen
    return (readyForMore ||
        $screen.val() === 'Error' ||
        char === 'Error');
}

function hasLeadingMinus(argArray) {
    if (argArray[0] === '-') {
        return true;
    } else {
        return false;
    }
}

function isValidInput(argArray) {
    return (argArray.length === 2 &&
        argArray[0] &&
        argArray[1] &&
        inputCheck(argArray.join('')));
}
