'use strict';

function evaluate(expressionArray) {
  let operation=expressionArray.pop();
  return ([convertToRPN(expressionArray[0]),convertToRPN(expressionArray[1]),operation]);
}

function convertToRPN(expression) {
  let expressionRPN=reduce(expression);
  if (expressionRPN) {
    return evaluate(expressionRPN);
  } else {
    return expression;
  }
}

function reduce(expression) {
  //returns either an array of two expressions and the operation to perform between them, or false
  const symbols = {
      '/': '÷',
      '*': 'x',
      '+': '+',
      '-': '-'
  };
  let operator=containsOperation(expression);
  if (operator) {
    return expression.split(symbols[operator]).push(operator);
  } else {
    return false;
  }
}

function containsOperation(expression) {
    //return either the operator in the expression, or false
    const symbols = {
        '÷': '/',
        'x': '*',
        '+': '+',
        '-': '-'
    };

    for (let symbol in symbols) {
        if (expression.includes(symbol)) {
            return symbol;
        }
        return false;
    }
}
