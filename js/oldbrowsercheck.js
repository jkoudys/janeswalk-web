(function() {
  var browser = (function get_browser() {
    var ua = navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])){
      tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
      return {name:'IE',version:(tem[1]||'')};
    }
    if (M[1]==='Chrome'){
      tem=ua.match(/\bOPR\/(\d+)/)
      if(tem!=null)   {return {name:'Opera', version:tem[1]};}
    }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if ((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
  })();

  var oldBrowser = false;
  if (browser.name === 'Safari' && browser.version < 9) oldBrowser = true;
  if (browser.name === 'MSIE' && browser.version < 11) oldBrowser = true;

  if (oldBrowser) {
    console.log('This is an old browser.');
    $(function() {
      $('body').prepend('<div id="oldbrowser"><p>The browser you\'re running may be too old to properly use this site. If you run into problems, please try installing <a href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a>, or <a href="https://www.google.com/chrome/">Chrome</a> and trying again. If you think this message is in error, please <a href="mailto:josh@qaribou.com">email me</a> and let me know!</p></div>');
    });
  }
})();
