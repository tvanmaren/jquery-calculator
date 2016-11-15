'use strict';

function numberCrunch(expression = '') {
    console.log('messily crunching numbers', expression, justCalculated);
    //if we are passed an expression, check it for operators
    //return false if expression has operators (will lead to incorrect math)
    //return true if expression has no operators (can be used without error)
    //if we aren't passed an expression, translate the screen into something mathematically parseable, parse it, and push it onto the screen

    if (!expression) {
        expression = $screen.text();
    }

    var args;
    const symbols = {
        '÷': '/',
        'x': '*',
        '+': '+',
        '-': '-'
    };

    for (let symbol in symbols) {
        console.log('searching for', symbol, 'in', expression);
        if (expression.includes(symbol)) {
            console.log(symbol, 'found in', expression);
            args = expression.split(symbol);
            if (symbol === '-' && args[0]===symbol) {
                //EXCEPTION: treat a leading minus-sign as a negative, not an operator
                console.log('replacing', args[1], 'with', args[1] * (-1));
                //convert to negative, and place at front of array
                //move the second argument up one in the array, and cut the array down to only two arguments.
                if (args[1]) {
                    args = [(args[1] * (-1)), args[2]];
                } else {
                    return pushToScreen('Error');
                }
            }
            //Now we've handled leading minus-signs, we check our input//
            console.log('here\'s what joined output looks like:', args.join(''));
            if (typeof args[0] === 'number') {
                //if we converted our first argument to a negative number
                justCalculated = true;
                pushToScreen(evaluate(args, symbols[symbol]));
                return true;
            } else if (expression !== $screen.text()) {
                //if we found an operator, but our expression didn't come from the screen
                return false;
            } else if (args.length === 2 && args[0] && args[1] && numberCrunch(args.join(''))) {
                //if we found an operator, we're looking at the screen, and we have something like valid input
                {
                    justCalculated = true;
                    pushToScreen(evaluate(args, symbols[symbol]));
                    return true;
                }
            } else {
                //if our argument had more than one operator or doesn't match our validity criteria
                pushToScreen('Error');
                return false;
            }
        }
        //if the expression has no operators (is just itself)
        //valid input arrives here with the validity check of the symbol-checking loop
    }
    return true;
}