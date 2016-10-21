'use strict';

$(function() {

function emptyScreen() {
  return $('#screen').empty();
}

    function evaluate(argArray, opString) {
//called by numberCrunch
//take an array of two number-strings and an operation, and return the mathematical evaluation of the operation performed upon those two numbers
      argArray[0]=parseFloat(argArray[0]);
      argArray[1]=parseFloat(argArray[1]);
      switch (opString) {
        case ('*'):
        return argArray[0]*argArray[1];
        case ('/'):
        return argArray[0]/argArray[1];
        case ('+'):
        return argArray[0]+argArray[1];
        case ('-'):
        return argArray[0]-argArray[1];
      }
    }

    function numberCrunch() {
//translate the screen into something mathematically parseable, parse it, and push it onto the screen
        var args;
        var symbols = {
            '÷': '/',
            'x': '*',
            '+': '+',
            '-': '-'
        };
        var expression = $('#screen').text();
        for (let symbol in symbols) {
            if (expression.includes(symbol)) {
                args = expression.split(symbol);
                if (args.length === 2 && args[0] && args[1] && (symbols[symbol]+args[1]) !== '/0') {
                    emptyScreen();
                    pushToScreen(evaluate(args, symbols[symbol]));
                    break;
                } else {
                    emptyScreen();
                    return pushToScreen('Error');
                }
            }
        }
    }

    function perform(operation) {
      //interprets & follows through on non-number buttons
        switch (operation.attr('id')) {
            case 'clear':
                return emptyScreen();
            case 'equals':
                return numberCrunch();
            default:
                return pushToScreen(operation.text());
        }
    }

    function pushToScreen(char) {
    //take the input character and push it onto the calculator screen
            var $screen = $('#screen');
            if ($screen.text() !== 'Error') {
                return pushToScreen($screen.text().concat(char));
            } else {
                emptyScreen();
                return pushToScreen(char);
            }
        }

    function calculatorBackend(event) {
        var $button = $(event.target);
        if ($button.is('span')) {
            if ($button.attr('class') === 'operator') {
                return perform($button);
            } else {
                return pushToScreen($button.text());
            }
        }
    }

    $('#buttons-container').click(calculatorBackend);
});
