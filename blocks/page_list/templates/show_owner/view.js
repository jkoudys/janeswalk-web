/* global jQuery */
(function ($) {
  'use strict';

  $(function() {
    $('.obfuscated').mousedown(function () {
      alert('Copy disabled for this email to confuse spam-bots. Please type email address in by hand');
    });

    $('.ccm-page-list-header a').click(function () {
      var text = $(this).text();
      $('ul', $(this).parent().parent()).slideToggle();
      $(this).text(text === '+ ' ? '- ' : '+ ');
    });
  });
}(jQuery));
