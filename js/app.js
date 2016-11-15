'use strict';

var $screen;
var readyForMore;

$(function() {

    $screen = $('#screen');
    readyForMore = false;

    $('#buttons-container').click(handleClick);
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
