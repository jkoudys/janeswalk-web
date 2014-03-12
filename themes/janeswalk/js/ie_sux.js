$(document).ready(function(){
  if (window.PIE) {
    $('body.city-page, i[class^=icon-], .u-avatar').each(function() {
      PIE.attach(this);
    });
    $('.backfade').remove();
  }
});
