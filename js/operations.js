'use strict';

function perform(operation) {
    console.log('operation', operation);
    //interprets & follows through on non-number buttons
    readyForMore = true;
    switch (operation) {
        case 'clear':
            emptyScreen();
            break;
        case 'equals':
            readyForMore = inputCheck();
            break;
        default:
            console.log(operation);
            pushToScreen(operation);
    }
    return;
}

function evaluate(argArray, opString) {
    argArray[0] = parseFloat(argArray[0]);
    argArray[1] = parseFloat(argArray[1]);

    switch (opString) { //do the math here//
        case ('*'):
            return argArray[0] * argArray[1];
        case ('/'):
            return argArray[0] / argArray[1];
        case ('+'):
            return argArray[0] + argArray[1];
        case ('-'):
            return argArray[0] - argArray[1];
        default:
            return "ERROR! Invalid Operator!";
    }
}

function splitAtOperator(expression, operator) {
    var argPieces = expression.split(operator);
    return argPieces;
}

function convertNegatives(argArray) {
    if (hasLeadingMinus(argArray)) {
        argArray.splice(0, 1); //remove subtraction operator
        argArray[0] *= (-1); //convert
    }
    return argArray;
}
