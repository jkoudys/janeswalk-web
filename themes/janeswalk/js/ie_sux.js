$(document).ready(function(){
  if (window.PIE) {
    (function() {
      var bgUrl = /^url\((['"]?)(.*)\1\)$/.exec($('body.city-page').css('background-image'));
      var img = document.createElement("img");
      bgUrl = bgUrl ? bgUrl[2] : false;
      img.setAttribute("src", bgUrl);
      img.setAttribute("width", "100%");
      img.setAttribute("height", "100%");
      img.setAttribute("style", "position:fixed;top:0;left:0");
      document.querySelector("body").appendChild(img);
    }).call(this);
    $('.backfade').remove();

    $('i[class^=icon-], .u-avatar').each(function() {
      PIE.attach(this);
    });
  }
});
