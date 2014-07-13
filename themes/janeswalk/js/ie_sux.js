$(document).ready(function(){
  if (window.PIE) {
    (function() {
      var bgUrl = /^url\((['"]?)(.*)\1\)$/.exec($('body.city-page').css('background-image'));
      var img = document.createElement("img");
      bgUrl = bgUrl ? bgUrl[2] : false;
      img.setAttribute("src", bgUrl);
      img.setAttribute("width", "100%");
      img.setAttribute("height", "100%");
      img.setAttribute("style", "position:fixed;top:0;left:0;height:100%;width:100%;z-index:-1");
      document.body.appendChild(img);
    }).call(this);
    $('.backfade').remove();

    $('i[class^=icon-], .u-avatar').each(function() {
      PIE.attach(this);
    });
  }
});

// Array.prototype.forEach()
Array.prototype.forEach||(Array.prototype.forEach=function(e,t){var n,r;if(this==null)throw new TypeError(" this is null or not defined");var i=Object(this),s=i.length>>>0;if(typeof e!="function")throw new TypeError(e+" is not a function");arguments.length>1&&(n=t),r=0;while(r<s){var o;r in i&&(o=i[r],e.call(n,o,r,i)),r++}});

/* classList shim */
;if("document" in self&&!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false;do{r=t[s]+"";var q=g(this,r);if(q!==-1){this.splice(q,1);o=true}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}return !o};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))};

/* addEventListener */
(function(){Event.prototype.preventDefault||(Event.prototype.preventDefault=function(){this.returnValue=!1}),Event.prototype.stopPropagation||(Event.prototype.stopPropagation=function(){this.cancelBubble=!0});if(!Element.prototype.addEventListener){var e=[],t=function(t,n){var r=this,i=function(e){e.target=e.srcElement,e.currentTarget=r,n.handleEvent?n.handleEvent(e):n.call(r,e)};if(t=="DOMContentLoaded"){var s=function(e){document.readyState=="complete"&&i(e)};document.attachEvent("onreadystatechange",s),e.push({object:this,type:t,listener:n,wrapper:s});if(document.readyState=="complete"){var o=new Event;o.srcElement=window,s(o)}}else this.attachEvent("on"+t,i),e.push({object:this,type:t,listener:n,wrapper:i})},n=function(t,n){var r=0;while(r<e.length){var i=e[r];if(i.object==this&&i.type==t&&i.listener==n){t=="DOMContentLoaded"?this.detachEvent("onreadystatechange",i.wrapper):this.detachEvent("on"+t,i.wrapper);break}++r}};Element.prototype.addEventListener=t,Element.prototype.removeEventListener=n,HTMLDocument&&(HTMLDocument.prototype.addEventListener=t,HTMLDocument.prototype.removeEventListener=n),Window&&(Window.prototype.addEventListener=t,Window.prototype.removeEventListener=n)}})();
