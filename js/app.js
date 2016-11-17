'use strict';

var $screen;
var readyForMore;
var shiftKeyDown = false;
const keyVals = {
  'ffescape': 0,
  'backspace': 8,
  'enter': 13,
  'shift': 16,
  'escape': 27,
  'times': 88,
  'plus': 187,
  'minus': 189,
  'divideby': 191,
  'arrows': [37, 38, 39, 40],
  'numbers': [48, 49, 50, 51, 52, 53, 54, 55, 56, 57],
}

$(function () {

  $screen = $('#screen');
  readyForMore = true;

  $('#buttons-container').click(handleClick);
  $('#screen').keydown(handleKeyDown);
  $('#screen').keyup(shiftOff);

});

function handleClick(event) {
  var $button = $(event.target);
  if ($button.is('span')) {
    if ($button.attr('class') === 'operator') {
      //perform operation
      perform($button.attr('id') || $button.text());
    } else {
      pushToScreen($button.text());
    }
  }
  return;
}

function handleKeyDown(event) {
  var key = event.which;

  if (key === keyVals.shift) {
    shiftKeyDown = true;
    return true;
  }

  if (!isValidKey(key)) {
    event.preventDefault();
    return false;
  }

  if (isActionKey(key)) {
    if (keyVals.arrows.includes(key)) {
      return true;
    } else {
      switch (key) {
      case (keyVals.backspace):
        return true;
      case (keyVals.enter):
        $('#equals').trigger('click');
        return;
      case (keyVals.escape):
        $('#clear').trigger('click');
        return;
      case (keyVals.ffescape): //fix for firefox, where ESC registers as 0
        $('#clear').trigger('click');
        return;
      }
    }
  }

  if (isOperatorKey(key)) {
    return true;
  }

  else {
    console.log(key);
    event.preventDefault();
    let char = String.fromCharCode(key);
    pushToScreen(char);
    return false;
  }
}

function shiftOff(event) {
  var key = event.which;
  if (key === keyVals.shift) {
    shiftKeyDown = false;
  }
  return;
}
