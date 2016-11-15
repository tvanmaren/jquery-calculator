'use strict';

function perform(operation) {
    console.log('operation', operation);
    //interprets & follows through on non-number buttons
    justCalculated = false;
    switch (operation) {
        case 'clear':
            emptyScreen();
            return;
        case 'equals':
            justCalculated = numberCrunch();
            return justCalculated;
        default:
            console.log(operation);
            pushToScreen(operation);
            return;
    }
}

function evaluate(argArray, opString) {
    console.log('evaluating', argArray, opString, justCalculated);
    //called by numberCrunch
    //take an array of two number-strings and an operation, and return the mathematical evaluation of the operation performed upon those two numbers
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
            //we never get here that I know of, but for fun...
            return "That's not a valid mathematical symbol! What are you doing?";
    }
}
