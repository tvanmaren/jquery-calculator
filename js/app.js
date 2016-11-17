'use strict';

var $screen;
var readyForMore;

$(function() {

    $screen = $('#screen');
    readyForMore = false;

    $('#buttons-container').click(handleClick);
    $('#screen').keyup(handleKeyboard);
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

function handleKeyboard(event) {
  var key=event.which;
  console.log(key);
  if (key===13) {
    $('#equals').trigger('click');
  }
  if (key===27 || 0) {
    $('#clear').trigger('click');
  }
}
