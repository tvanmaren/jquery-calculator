'use strict';

$(function() {

const $screen = $('#screen');
var justCalculated = false;

function emptyScreen() {
  console.log('emptying screen', justCalculated);
  return $screen.empty();
}

function evaluate(argArray, opString) {
  console.log('evaluating', argArray, opString, justCalculated);
  //called by numberCrunch
  //take an array of two number-strings and an operation, and return the mathematical evaluation of the operation performed upon those two numbers
  argArray[0] = parseFloat(argArray[0]);
  argArray[1] = parseFloat(argArray[1]);
  switch (opString) {
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
          return "There are no other cases. What calculator are you even using? Weirdo.";
  }
}

function numberCrunch(expression = '') {
  console.log('messily crunching numbers',expression,justCalculated);
  //if we are passed an expression, check it for operators
  //return false if expression has operators (will lead to incorrect math)
  //return true if expression has no operators (can be used without error)
  //if we aren't passed an expression, translate the screen into something mathematically parseable, parse it, and push it onto the screen

  if (!expression) {
      expression = $screen.text();
  }
  var args;
  var symbols = {
      '÷': '/',
      'x': '*',
      '+': '+',
      '-': '-'
  };

  for (let symbol in symbols) {
    console.log('searching for',symbol,'in',expression);
      if (expression.includes(symbol)) {
        console.log(symbol,'found in',expression);
        args = expression.split(symbol);
        if (symbol==='-' && !args[0]){
          //EXCEPTION: treat a first minus-sign as a negative, not a minus-sign
          console.log('replacing',args[1],'with',args[1]*(-1));
          //convert to negative, and place at front of array
          //move the second argument up one in the array, and cut the array down to only two arguments.
          if (args[1]) {
          args=[(args[1]*(-1)),args[2]];
        } else {
          return pushToScreen('Error');
        }}
//Now we've handled leading minus-signs, we check our input//
console.log('here\'s what joined output looks like:',args.join(''));
          if (typeof args[0]==='number') {
            //if we converted our first argument to a negative number
            justCalculated=true;
            pushToScreen(evaluate(args,symbols[symbol]));
            return true;
          } else if (expression !== $screen.text()) {
              //if we found an operator, but our expression didn't come from the screen
              return false;
          } else if (args.length===2 && args[0] && args[1] && numberCrunch(args.join(''))) {
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

  function perform(operation) {
      console.log('performing', operation, justCalculated);
      //interprets & follows through on non-number buttons
      justCalculated = false;
      switch (operation.attr('id')) {
          case 'clear':
              return emptyScreen();
          case 'equals':
              justCalculated = numberCrunch();
              return justCalculated;
          default:
              return pushToScreen(operation.text());
      }
  }

  function pushToScreen(char) {
    console.log(char);
      console.log('pushing to screen', char, justCalculated);
      //take the input character and push it onto the calculator screen
      if (typeof char==='undefined' || (isNaN(char) && typeof char==='number') || char==='Infinity') {
        return pushToScreen('Error');
      }
      if (justCalculated || $screen.text() === 'Error' || char === 'Error') {
          emptyScreen();
          justCalculated = false;
          return $screen.text(char);
      } else {
          return $screen.text($screen.text() + char);
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
