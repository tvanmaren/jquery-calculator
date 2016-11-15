'use strict';

var $screen;
var justCalculated;

$(function() {

    $screen = $('#screen');
    justCalculated = false;

    $('#buttons-container').click(handleClick);
});

function handleClick(event) {
    var $button = $(event.target);
    if ($button.is('span')) {
        if ($button.attr('class') === 'operator') {
            return perform($button.attr('id') || $button.text()); //perform operation
        } else {
            return pushToScreen($button.text());
        }
    }
}
