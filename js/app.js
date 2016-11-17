'use strict';

var $screen;
var readyForMore;
var shiftKeyDown = false;

$(function () {

  $screen = $('#screen');
  readyForMore = false;

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
  console.log(key);

  if (key === 16) {
    shiftKeyDown = true;
    return true;
  }

  if (!isValidKey(key)) {
    event.preventDefault();
    return false;
  }

  if (isOperationKey(key)) {
    switch (key) {
    case (13):
      $('#equals').trigger('click');
      return;
    case (27):
      $('#clear').trigger('click');
      return;
    case (0): //fix for firefox, where ESC registers as 0
      $('#clear').trigger('click');
      return;
    }
  }
  return true;
}

function shiftOff(event) {
  var key = event.which;
  if (key === 16) {
    shiftKeyDown = false;
  }
  return;
}

function isOperationKey(key) {
  return ((key===13) || (key===27));
}
