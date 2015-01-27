(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Initialization code goes here. This is not to be a dumping ground for
 * miscellaneous functions, and especially not a place to stick new global
 * variables.
 */

// Page Views
var PageViews = {
  PageView: require('./views/Page.jsx'),
  CityPageView: require('./views/pages/City.jsx'),
  HomePageView: require('./views/pages/Home.jsx'),
  ProfilePageView: require('./views/pages/Profile.jsx'),
  WalkPageView: require('./views/pages/Walk.jsx')
};
var ReactViews = {
  CreateWalkView: require('./views/CreateWalk.jsx')
};

// Shims
// Used for Intl.DateTimeFormat
require('intl/Intl.min');

document.addEventListener('DOMContentLoaded', function() {
  var pageViewName =
    document.body.getAttribute('data-pageViewName') ||
    'PageView';
  var ReactView = ReactViews[pageViewName];

  try {
    // Hybrid-routing. First check if there's a React view (which will render
    // nearly all the DOM), or a POJO view (which manipulates PHP-built HTML)
    if (ReactView) {
      switch (pageViewName) {
        case 'CreateWalkView':
          React.render(
            React.createElement(ReactView, {
              locale: JanesWalk.locale, 
              data: JanesWalk.walk.data, 
              city: JanesWalk.city, 
              user: JanesWalk.user, 
              url: JanesWalk.walk.url, 
              valt: JanesWalk.form.valt}
            ),
            document.getElementById('createwalk')
          );
          break;
      }
    } else {
      // FIXME: I'm not in-love with such a heavy jQuery reliance
      new PageViews[pageViewName]($(document.body));
    }
  } catch(e) {
    console.error('Error instantiating page view ' + pageViewName + ': ' + e.stack);
  }

  // Init keyboard shortcuts
  var toolbar = document.getElementById('ccm-toolbar');
  if (toolbar) {
    window.addEventListener('keyup', function(ev) {
      /* Don't capture inputs going into a form */
      if(ev.target.tagName !== "INPUT") {
        ev.preventDefault();
        switch(
          String(
            ev.key ||
            (ev.keyCode && String.fromCharCode(ev.keyCode)) ||
            ev.char)
            .toUpperCase()
        ){
          case "M":
            if (toolbar.style.display === 'block' || !toolbar.style.display) {
              toolbar.style.display = 'none';
            } else {
              toolbar.style.display = 'block';
            }
            break;
          default:
            break;
        }
      }
    });
  }
});

},{"./views/CreateWalk.jsx":4,"./views/Page.jsx":6,"./views/pages/City.jsx":19,"./views/pages/Home.jsx":20,"./views/pages/Profile.jsx":21,"./views/pages/Walk.jsx":22,"intl/Intl.min":2}],2:[function(require,module,exports){
(function (global){
/**
 * @license Copyright 2013 Andy Earnshaw, MIT License
 *
 * Implements the ECMAScript Internationalization API in ES5-compatible environments,
 * following the ECMA-402 specification as closely as possible
 *
 * ECMA-402: http://ecma-international.org/ecma-402/1.0/
 *
 * CLDR format locale data should be provided using IntlPolyfill.__addLocaleData().
 */
!function(a,b){var c=b();"function"==typeof define&&define.amd&&define(c),"object"==typeof exports&&(module.exports=c),a.Intl||(a.Intl=c,c.__applyLocaleSensitivePrototypes()),a.IntlPolyfill=c}("undefined"!=typeof global?global:this,function(){"use strict";function a(a){return P.test(a)?R.test(a)?!1:S.test(a)?!1:!0:!1}function b(a){var b,c;a=a.toLowerCase(),c=a.split("-");for(var d=1,e=c.length;e>d;d++)if(2===c[d].length)c[d]=c[d].toUpperCase();else if(4===c[d].length)c[d]=c[d].charAt(0).toUpperCase()+c[d].slice(1);else if(1===c[d].length&&"x"!=c[d])break;a=bb.call(c,"-"),(b=a.match(Q))&&b.length>1&&(b.sort(),a=a.replace(RegExp("(?:"+Q.source+")+","i"),bb.call(b,""))),W.call(lb.tags,a)&&(a=lb.tags[a]),c=a.split("-");for(var d=1,e=c.length;e>d;d++)W.call(lb.subtags,c[d])?c[d]=lb.subtags[c[d]]:W.call(lb.extLang,c[d])&&(c[d]=lb.extLang[c[d]][0],1===d&&lb.extLang[c[1]][1]===c[0]&&(c=$.call(c,d++),e-=1));return bb.call(c,"-")}function c(){return O}function d(a){var b=String(a),c=L(b);return jb.test(c)===!1?!1:!0}function e(c){if(void 0===c)return new J;for(var d=new J,c="string"==typeof c?[c]:c,e=M(c),f=e.length,g=0;f>g;){var h=String(g),i=h in e;if(i){var j=e[h];if(null==j||"string"!=typeof j&&"object"!=typeof j)throw new TypeError("String or Object type expected");var k=String(j);if(!a(k))throw new RangeError("'"+k+"' is not a structurally valid language tag");k=b(k),-1===Y.call(d,k)&&ab.call(d,k)}g++}return d}function f(a,b){for(var c=b;;){if(Y.call(a,c)>-1)return c;var d=c.lastIndexOf("-");if(0>d)return;d>=2&&"-"==c.charAt(d-2)&&(d-=2),c=c.substring(0,d)}}function g(a,b){for(var d,e=0,g=b.length;g>e&&!d;){var h=b[e],i=String(h).replace(kb,""),d=f(a,i);e++}var j=new I;if(void 0!==d){if(j["[[locale]]"]=d,String(h)!==String(i)){var k=h.match(kb)[0],l=h.indexOf("-u-");j["[[extension]]"]=k,j["[[extensionIndex]]"]=l}}else j["[[locale]]"]=c();return j}function h(a,b){return g(a,b)}function i(a,b,c,d,e){if(0===a.length)throw new ReferenceError("No locale data has been provided for this object yet.");var f=c["[[localeMatcher]]"];if("lookup"===f)var i=g(a,b);else var i=h(a,b);var j=i["[[locale]]"];if(W.call(i,"[[extension]]"))var k=i["[[extension]]"],l=i["[[extensionIndex]]"],m=String.prototype.split,n=m.call(k,"-"),o=n.length;var p=new I;p["[[dataLocale]]"]=j;for(var q="-u",r=0,s=d.length;s>r;){var t=d[r],u=e[j],v=u[t],w=v["0"],x="",y=Y;if(void 0!==n){var z=y.call(n,t);if(-1!==z)if(o>z+1&&n[z+1].length>2){var A=n[z+1],B=y.call(v,A);if(-1!==B)var w=A,x="-"+t+"-"+w}else{var B=y(v,"true");if(-1!==B)var w="true"}}if(W.call(c,"[["+t+"]]")){var C=c["[["+t+"]]"];-1!==y.call(v,C)&&C!==w&&(w=C,x="")}p["[["+t+"]]"]=w,q+=x,r++}if(q.length>2)var D=j.substring(0,l),E=j.substring(l),j=D+q+E;return p["[[locale]]"]=j,p}function j(a,b){for(var c=b.length,d=new J,e=0;c>e;){var g=b[e],h=String(g).replace(kb,""),i=f(a,h);void 0!==i&&ab.call(d,g),e++}var j=$.call(d);return j}function k(a,b){return j(a,b)}function l(a,b,c){if(void 0!==c){var c=new I(M(c)),d=c.localeMatcher;if(void 0!==d&&(d=String(d),"lookup"!==d&&"best fit"!==d))throw new RangeError('matcher should be "lookup" or "best fit"')}if(void 0===d||"best fit"===d)var e=k(a,b);else var e=j(a,b);for(var f in e)W.call(e,f)&&X(e,f,{writable:!1,configurable:!1,value:e[f]});return X(e,"length",{writable:!1}),e}function m(a,b,c,d,e){var f=a[b];if(void 0!==f){if(f="boolean"===c?Boolean(f):"string"===c?String(f):f,void 0!==d&&-1===Y.call(d,f))throw new RangeError("'"+f+"' is not an allowed value for `"+b+"`");return f}return e}function n(a,b,c,d,e){var f=a[b];if(void 0!==f){if(f=Number(f),isNaN(f)||c>f||f>d)throw new RangeError("Value is not a number or outside accepted range");return Math.floor(f)}return e}function o(){var a=arguments[0],b=arguments[1];return this&&this!==T?p(M(this),a,b):new T.NumberFormat(a,b)}function p(a,b,c){var f=N(a),g=K();if(f["[[initializedIntlObject]]"]===!0)throw new TypeError("`this` object has already been initialized as an Intl object");X(a,"__getInternalProperties",{value:function(){return arguments[0]===fb?f:void 0}}),f["[[initializedIntlObject]]"]=!0;var h=e(b);c=void 0===c?{}:M(c);var j=new I,k=m(c,"localeMatcher","string",new J("lookup","best fit"),"best fit");j["[[localeMatcher]]"]=k;var l=eb.NumberFormat["[[localeData]]"],o=i(eb.NumberFormat["[[availableLocales]]"],h,j,eb.NumberFormat["[[relevantExtensionKeys]]"],l);f["[[locale]]"]=o["[[locale]]"],f["[[numberingSystem]]"]=o["[[nu]]"],f["[[dataLocale]]"]=o["[[dataLocale]]"];var p=o["[[dataLocale]]"],s=m(c,"style","string",new J("decimal","percent","currency"),"decimal");f["[[style]]"]=s;var t=m(c,"currency","string");if(void 0!==t&&!d(t))throw new RangeError("'"+t+"' is not a valid currency code");if("currency"===s&&void 0===t)throw new TypeError("Currency code is required when style is currency");if("currency"===s){t=t.toUpperCase(),f["[[currency]]"]=t;var u=q(t)}var v=m(c,"currencyDisplay","string",new J("code","symbol","name"),"symbol");"currency"===s&&(f["[[currencyDisplay]]"]=v);var w=n(c,"minimumIntegerDigits",1,21,1);f["[[minimumIntegerDigits]]"]=w;var x="currency"===s?u:0,y=n(c,"minimumFractionDigits",0,20,x);f["[[minimumFractionDigits]]"]=y;var z="currency"===s?Math.max(y,u):"percent"===s?Math.max(y,0):Math.max(y,3),A=n(c,"maximumFractionDigits",y,20,z);f["[[maximumFractionDigits]]"]=A;var B=c.minimumSignificantDigits,C=c.maximumSignificantDigits;(void 0!==B||void 0!==C)&&(B=n(c,"minimumSignificantDigits",1,21,1),C=n(c,"maximumSignificantDigits",B,21,21),f["[[minimumSignificantDigits]]"]=B,f["[[maximumSignificantDigits]]"]=C);var D=m(c,"useGrouping","boolean",void 0,!0);f["[[useGrouping]]"]=D;var E=l[p],F=E.patterns,G=F[s];return f["[[positivePattern]]"]=G.positivePattern,f["[[negativePattern]]"]=G.negativePattern,f["[[boundFormat]]"]=void 0,f["[[initializedNumberFormat]]"]=!0,V&&(a.format=r.call(a)),g.exp.test(g.input),a}function q(a){return void 0!==mb[a]?mb[a]:2}function r(){var a=null!=this&&"object"==typeof this&&N(this);if(!a||!a["[[initializedNumberFormat]]"])throw new TypeError("`this` value for format() is not an initialized Intl.NumberFormat object.");if(void 0===a["[[boundFormat]]"]){var b=function(a){return s(this,Number(a))},c=db.call(b,this);a["[[boundFormat]]"]=c}return a["[[boundFormat]]"]}function s(a,b){var c,d=K(),e=N(a),f=e["[[dataLocale]]"],g=e["[[numberingSystem]]"],h=eb.NumberFormat["[[localeData]]"][f],i=h.symbols[g]||h.symbols.latn,j=!1;if(isFinite(b)===!1)isNaN(b)?c=i.nan:(c=i.infinity,0>b&&(j=!0));else{if(0>b&&(j=!0,b=-b),"percent"===e["[[style]]"]&&(b*=100),c=W.call(e,"[[minimumSignificantDigits]]")&&W.call(e,"[[maximumSignificantDigits]]")?t(b,e["[[minimumSignificantDigits]]"],e["[[maximumSignificantDigits]]"]):u(b,e["[[minimumIntegerDigits]]"],e["[[minimumFractionDigits]]"],e["[[maximumFractionDigits]]"]),nb[g]){var k=nb[e["[[numberingSystem]]"]];c=String(c).replace(/\d/g,function(a){return k[a]})}else c=String(c);if(c=c.replace(/\./g,i.decimal),e["[[useGrouping]]"]===!0){var l=c.split(i.decimal),m=l[0],n=h.patterns.primaryGroupSize||3,o=h.patterns.secondaryGroupSize||n;if(m.length>n){var p=new J,q=m.length-n,r=q%o,s=m.slice(0,r);for(s.length&&ab.call(p,s);q>r;)ab.call(p,m.slice(r,r+o)),r+=o;ab.call(p,m.slice(q)),l[0]=bb.call(p,i.group)}c=bb.call(l,i.decimal)}}var v=e[j===!0?"[[negativePattern]]":"[[positivePattern]]"];if(v=v.replace("{number}",c),"currency"===e["[[style]]"]){var w,x=e["[[currency]]"],y=h.currencies[x];switch(e["[[currencyDisplay]]"]){case"symbol":w=y||x;break;default:case"code":case"name":w=x}v=v.replace("{currency}",w)}return d.exp.test(d.input),v}function t(a,b,c){var d=c;if(0===a)var e=bb.call(Array(d+1),"0"),f=0;else var f=F(Math.abs(a)),g=Math.round(Math.exp(Math.abs(f-d+1)*Math.LN10)),e=String(Math.round(0>f-d+1?a*g:a/g));if(f>=d)return e+bb.call(Array(f-d+1+1),"0");if(f===d-1)return e;if(f>=0?e=e.slice(0,f+1)+"."+e.slice(f+1):0>f&&(e="0."+bb.call(Array(-(f+1)+1),"0")+e),e.indexOf(".")>=0&&c>b){for(var h=c-b;h>0&&"0"===e.charAt(e.length-1);)e=e.slice(0,-1),h--;"."===e.charAt(e.length-1)&&(e=e.slice(0,-1))}return e}function u(a,b,c,d){var e,f=Number.prototype.toFixed.call(a,d),g=f.split(".")[0].length,h=d-c,i=(e=f.indexOf("e"))>-1?f.slice(e+1):0;for(i&&(f=f.slice(0,e).replace(".",""),f+=bb.call(Array(i-(f.length-1)+1),"0")+"."+bb.call(Array(d+1),"0"),g=f.length);h>0&&"0"===f.slice(-1);)f=f.slice(0,-1),h--;if("."===f.slice(-1)&&(f=f.slice(0,-1)),b>g)var j=bb.call(Array(b-g+1),"0");return(j?j:"")+f}function v(){var a=arguments[0],b=arguments[1];return this&&this!==T?w(M(this),a,b):new T.DateTimeFormat(a,b)}function w(a,b,c){var d=N(a),f=K();if(d["[[initializedIntlObject]]"]===!0)throw new TypeError("`this` object has already been initialized as an Intl object");X(a,"__getInternalProperties",{value:function(){return arguments[0]===fb?d:void 0}}),d["[[initializedIntlObject]]"]=!0;var g=e(b),c=x(c,"any","date"),h=new I;u=m(c,"localeMatcher","string",new J("lookup","best fit"),"best fit"),h["[[localeMatcher]]"]=u;var j=eb.DateTimeFormat,k=j["[[localeData]]"],l=i(j["[[availableLocales]]"],g,h,j["[[relevantExtensionKeys]]"],k);d["[[locale]]"]=l["[[locale]]"],d["[[calendar]]"]=l["[[ca]]"],d["[[numberingSystem]]"]=l["[[nu]]"],d["[[dataLocale]]"]=l["[[dataLocale]]"];var n=l["[[dataLocale]]"],o=c.timeZone;if(void 0!==o&&(o=L(o),"UTC"!==o))throw new RangeError("timeZone is not supported.");d["[[timeZone]]"]=o,h=new I;for(var p in ob)if(W.call(ob,p)){var q=m(c,p,"string",ob[p]);h["[["+p+"]]"]=q}var r,s=k[n],t=s.formats,u=m(c,"formatMatcher","string",new J("basic","best fit"),"best fit");r="basic"===u?y(h,t):A(h,t);for(var p in ob)if(W.call(ob,p)&&W.call(r,p)){var v=r[p];d["[["+p+"]]"]=v}var w,z=m(c,"hour12","boolean");if(d["[[hour]]"])if(z=void 0===z?s.hour12:z,d["[[hour12]]"]=z,z===!0){var C=s.hourNo0;d["[[hourNo0]]"]=C,w=r.pattern12}else w=r.pattern;else w=r.pattern;return d["[[pattern]]"]=w,d["[[boundFormat]]"]=void 0,d["[[initializedDateTimeFormat]]"]=!0,V&&(a.format=B.call(a)),f.exp.test(f.input),a}function x(a,b,c){if(void 0===a)a=null;else{var d=M(a);a=new I;for(var e in d)a[e]=d[e]}var f=Z,a=f(a),g=!0;return("date"===b||"any"===b)&&(void 0!==a.weekday||void 0!==a.year||void 0!==a.month||void 0!==a.day)&&(g=!1),("time"===b||"any"===b)&&(void 0!==a.hour||void 0!==a.minute||void 0!==a.second)&&(g=!1),!g||"date"!==c&&"all"!==c||(a.year=a.month=a.day="numeric"),!g||"time"!==c&&"all"!==c||(a.hour=a.minute=a.second="numeric"),a}function y(a,b){return z(a,b)}function z(a,b,c){for(var d,e=8,f=120,g=20,h=8,i=6,j=6,k=3,l=-1/0,m=0,n=b.length;n>m;){var o=b[m],p=0;for(var q in ob)if(W.call(ob,q)){var r=a["[["+q+"]]"],s=W.call(o,q)?o[q]:void 0;if(void 0===r&&void 0!==s)p-=g;else if(void 0!==r&&void 0===s)p-=f;else{var t=["2-digit","numeric","narrow","short","long"],u=Y.call(t,r),v=Y.call(t,s),w=Math.max(Math.min(v-u,2),-2);!c||("numeric"!==r&&"2-digit"!==r||"numeric"===s||"2-digit"===s)&&("numeric"===r||"2-digit"===r||"2-digit"!==s&&"numeric"!==s)||(p-=e),2===w?p-=i:1===w?p-=k:-1===w?p-=j:-2===w&&(p-=h)}}p>l&&(l=p,d=o),m++}return d}function A(a,b){return z(a,b,!0)}function B(){var a=null!=this&&"object"==typeof this&&N(this);if(!a||!a["[[initializedDateTimeFormat]]"])throw new TypeError("`this` value for format() is not an initialized Intl.DateTimeFormat object.");if(void 0===a["[[boundFormat]]"]){var b=function(){var a=Number(0===arguments.length?Date.now():arguments[0]);return C(this,a)},c=db.call(b,this);a["[[boundFormat]]"]=c}return a["[[boundFormat]]"]}function C(a,b){if(!isFinite(b))throw new RangeError("Invalid valid date passed to format");var c=a.__getInternalProperties(fb),d=K(),e=c["[[locale]]"],f=new T.NumberFormat([e],{useGrouping:!1}),g=new T.NumberFormat([e],{minimumIntegerDigits:2,useGrouping:!1}),h=D(b,c["[[calendar]]"],c["[[timeZone]]"]),i=c["[[pattern]]"],j=c["[[dataLocale]]"],k=eb.DateTimeFormat["[[localeData]]"][j].calendars,l=c["[[calendar]]"];for(var m in ob)if(W.call(c,"[["+m+"]]")){var n,o,p=c["[["+m+"]]"],q=h["[["+m+"]]"];if("year"===m&&0>=q?q=1-q:"month"===m?q++:"hour"===m&&c["[[hour12]]"]===!0&&(q%=12,n=q!==h["[["+m+"]]"],0===q&&c["[[hourNo0]]"]===!0&&(q=12)),"numeric"===p)o=s(f,q);else if("2-digit"===p)o=s(g,q),o.length>2&&(o=o.slice(-2));else if(p in gb)switch(m){case"month":o=H(k,l,"months",p,h["[["+m+"]]"]);break;case"weekday":try{o=H(k,l,"days",p,h["[["+m+"]]"])}catch(r){throw new Error("Could not find weekday data for locale "+e)}break;case"timeZoneName":o="";break;default:o=h["[["+m+"]]"]}i=i.replace("{"+m+"}",o)}return c["[[hour12]]"]===!0&&(o=H(k,l,"dayPeriods",n?"pm":"am"),i=i.replace("{ampm}",o)),d.exp.test(d.input),i}function D(a,b,c){var d=new Date(a),e="get"+(c||"");return new I({"[[weekday]]":d[e+"Day"](),"[[era]]":+(d[e+"FullYear"]()>=0),"[[year]]":d[e+"FullYear"](),"[[month]]":d[e+"Month"](),"[[day]]":d[e+"Date"](),"[[hour]]":d[e+"Hours"](),"[[minute]]":d[e+"Minutes"](),"[[second]]":d[e+"Seconds"](),"[[inDST]]":!1})}function E(a,b){if(!a.number)throw new Error("Object passed doesn't contain locale data for Intl.NumberFormat");var c,d=[b],e=b.split("-");for(e.length>2&&4==e[1].length&&ab.call(d,e[0]+"-"+e[2]);c=cb.call(d);)ab.call(eb.NumberFormat["[[availableLocales]]"],c),eb.NumberFormat["[[localeData]]"][c]=a.number,a.date&&(a.date.nu=a.number.nu,ab.call(eb.DateTimeFormat["[[availableLocales]]"],c),eb.DateTimeFormat["[[localeData]]"][c]=a.date);void 0===O&&(O=b),hb||(p(T.NumberFormat.prototype),hb=!0),a.date&&!ib&&(w(T.DateTimeFormat.prototype),ib=!0)}function F(a){if("function"==typeof Math.log10)return Math.floor(Math.log10(a));var b=Math.round(Math.log(a)*Math.LOG10E);return b-(Number("1e"+b)>a)}function G(a){if(!W.call(this,"[[availableLocales]]"))throw new TypeError("supportedLocalesOf() is not a constructor");var b=K(),c=arguments[1],d=this["[[availableLocales]]"],f=e(a);return b.exp.test(b.input),l(d,f,c)}function H(a,b,c,d,e){var f=a[b]&&a[b][c]?a[b][c]:a.gregory[c],g={narrow:["short","long"],"short":["long","narrow"],"long":["short","narrow"]},h=W.call(f,d)?f[d]:W.call(f,g[d][0])?f[g[d][0]]:f[g[d][1]];return null!=e?h[e]:h}function I(a){for(var b in a)(a instanceof I||W.call(a,b))&&X(this,b,{value:a[b],enumerable:!0,writable:!0,configurable:!0})}function J(){X(this,"length",{writable:!0,value:0}),arguments.length&&ab.apply(this,$.call(arguments))}function K(){for(var a=/[.?*+^$[\]\\(){}|-]/g,b=RegExp.lastMatch,c=RegExp.multiline?"m":"",d={input:RegExp.input},e=new J,f=!1,g={},h=1;9>=h;h++)f=(g["$"+h]=RegExp["$"+h])||f;if(b=b.replace(a,"\\$&"),f)for(var h=1;9>=h;h++){var i=g["$"+h];i?(i=i.replace(a,"\\$&"),b=b.replace(i,"("+i+")")):b="()"+b,ab.call(e,b.slice(0,b.indexOf("(")+1)),b=b.slice(b.indexOf("(")+1)}return d.exp=new RegExp(bb.call(e,"")+b,c),d}function L(a){for(var b=a.length;b--;){var c=a.charAt(b);c>="a"&&"z">=c&&(a=a.slice(0,b)+c.toUpperCase()+a.slice(b+1))}return a}function M(a){if(null==a)throw new TypeError("Cannot convert null or undefined to object");return Object(a)}function N(a){return W.call(a,"__getInternalProperties")?a.__getInternalProperties(fb):Z(null)}var O,P,Q,R,S,T={},U=function(){try{return!!Object.defineProperty({},"a",{})}catch(a){return!1}}(),V=!U&&!Object.prototype.__defineGetter__,W=Object.prototype.hasOwnProperty,X=U?Object.defineProperty:function(a,b,c){"get"in c&&a.__defineGetter__?a.__defineGetter__(b,c.get):(!W.call(a,b)||"value"in c)&&(a[b]=c.value)},Y=Array.prototype.indexOf||function(a){var b=this;if(!b.length)return-1;for(var c=arguments[1]||0,d=b.length;d>c;c++)if(b[c]===a)return c;return-1},Z=Object.create||function(a,b){function c(){}var d;c.prototype=a,d=new c;for(var e in b)W.call(b,e)&&X(d,e,b[e]);return d},$=Array.prototype.slice,_=Array.prototype.concat,ab=Array.prototype.push,bb=Array.prototype.join,cb=Array.prototype.shift,db=(Array.prototype.unshift,Function.prototype.bind||function(a){var b=this,c=$.call(arguments,1);return 1===b.length?function(){return b.apply(a,_.call(c,$.call(arguments)))}:function(){return b.apply(a,_.call(c,$.call(arguments)))}}),eb=Z(null),fb=Math.random(),gb=Z(null,{narrow:{},"short":{},"long":{}}),hb=!1,ib=!1,jb=/^[A-Z]{3}$/,kb=/-u(?:-[0-9a-z]{2,8})+/gi,lb={tags:{"art-lojban":"jbo","i-ami":"ami","i-bnn":"bnn","i-hak":"hak","i-klingon":"tlh","i-lux":"lb","i-navajo":"nv","i-pwn":"pwn","i-tao":"tao","i-tay":"tay","i-tsu":"tsu","no-bok":"nb","no-nyn":"nn","sgn-BE-FR":"sfb","sgn-BE-NL":"vgt","sgn-CH-DE":"sgg","zh-guoyu":"cmn","zh-hakka":"hak","zh-min-nan":"nan","zh-xiang":"hsn","sgn-BR":"bzs","sgn-CO":"csn","sgn-DE":"gsg","sgn-DK":"dsl","sgn-ES":"ssp","sgn-FR":"fsl","sgn-GB":"bfi","sgn-GR":"gss","sgn-IE":"isg","sgn-IT":"ise","sgn-JP":"jsl","sgn-MX":"mfs","sgn-NI":"ncs","sgn-NL":"dse","sgn-NO":"nsl","sgn-PT":"psr","sgn-SE":"swl","sgn-US":"ase","sgn-ZA":"sfs","zh-cmn":"cmn","zh-cmn-Hans":"cmn-Hans","zh-cmn-Hant":"cmn-Hant","zh-gan":"gan","zh-wuu":"wuu","zh-yue":"yue"},subtags:{BU:"MM",DD:"DE",FX:"FR",TP:"TL",YD:"YE",ZR:"CD",heploc:"alalc97","in":"id",iw:"he",ji:"yi",jw:"jv",mo:"ro",ayx:"nun",bjd:"drl",ccq:"rki",cjr:"mom",cka:"cmr",cmk:"xch",drh:"khk",drw:"prs",gav:"dev",hrr:"jal",ibi:"opa",kgh:"kml",lcq:"ppr",mst:"mry",myt:"mry",sca:"hle",tie:"ras",tkk:"twm",tlw:"weo",tnf:"prs",ybd:"rki",yma:"lrr"},extLang:{aao:["aao","ar"],abh:["abh","ar"],abv:["abv","ar"],acm:["acm","ar"],acq:["acq","ar"],acw:["acw","ar"],acx:["acx","ar"],acy:["acy","ar"],adf:["adf","ar"],ads:["ads","sgn"],aeb:["aeb","ar"],aec:["aec","ar"],aed:["aed","sgn"],aen:["aen","sgn"],afb:["afb","ar"],afg:["afg","sgn"],ajp:["ajp","ar"],apc:["apc","ar"],apd:["apd","ar"],arb:["arb","ar"],arq:["arq","ar"],ars:["ars","ar"],ary:["ary","ar"],arz:["arz","ar"],ase:["ase","sgn"],asf:["asf","sgn"],asp:["asp","sgn"],asq:["asq","sgn"],asw:["asw","sgn"],auz:["auz","ar"],avl:["avl","ar"],ayh:["ayh","ar"],ayl:["ayl","ar"],ayn:["ayn","ar"],ayp:["ayp","ar"],bbz:["bbz","ar"],bfi:["bfi","sgn"],bfk:["bfk","sgn"],bjn:["bjn","ms"],bog:["bog","sgn"],bqn:["bqn","sgn"],bqy:["bqy","sgn"],btj:["btj","ms"],bve:["bve","ms"],bvl:["bvl","sgn"],bvu:["bvu","ms"],bzs:["bzs","sgn"],cdo:["cdo","zh"],cds:["cds","sgn"],cjy:["cjy","zh"],cmn:["cmn","zh"],coa:["coa","ms"],cpx:["cpx","zh"],csc:["csc","sgn"],csd:["csd","sgn"],cse:["cse","sgn"],csf:["csf","sgn"],csg:["csg","sgn"],csl:["csl","sgn"],csn:["csn","sgn"],csq:["csq","sgn"],csr:["csr","sgn"],czh:["czh","zh"],czo:["czo","zh"],doq:["doq","sgn"],dse:["dse","sgn"],dsl:["dsl","sgn"],dup:["dup","ms"],ecs:["ecs","sgn"],esl:["esl","sgn"],esn:["esn","sgn"],eso:["eso","sgn"],eth:["eth","sgn"],fcs:["fcs","sgn"],fse:["fse","sgn"],fsl:["fsl","sgn"],fss:["fss","sgn"],gan:["gan","zh"],gds:["gds","sgn"],gom:["gom","kok"],gse:["gse","sgn"],gsg:["gsg","sgn"],gsm:["gsm","sgn"],gss:["gss","sgn"],gus:["gus","sgn"],hab:["hab","sgn"],haf:["haf","sgn"],hak:["hak","zh"],hds:["hds","sgn"],hji:["hji","ms"],hks:["hks","sgn"],hos:["hos","sgn"],hps:["hps","sgn"],hsh:["hsh","sgn"],hsl:["hsl","sgn"],hsn:["hsn","zh"],icl:["icl","sgn"],ils:["ils","sgn"],inl:["inl","sgn"],ins:["ins","sgn"],ise:["ise","sgn"],isg:["isg","sgn"],isr:["isr","sgn"],jak:["jak","ms"],jax:["jax","ms"],jcs:["jcs","sgn"],jhs:["jhs","sgn"],jls:["jls","sgn"],jos:["jos","sgn"],jsl:["jsl","sgn"],jus:["jus","sgn"],kgi:["kgi","sgn"],knn:["knn","kok"],kvb:["kvb","ms"],kvk:["kvk","sgn"],kvr:["kvr","ms"],kxd:["kxd","ms"],lbs:["lbs","sgn"],lce:["lce","ms"],lcf:["lcf","ms"],liw:["liw","ms"],lls:["lls","sgn"],lsg:["lsg","sgn"],lsl:["lsl","sgn"],lso:["lso","sgn"],lsp:["lsp","sgn"],lst:["lst","sgn"],lsy:["lsy","sgn"],ltg:["ltg","lv"],lvs:["lvs","lv"],lzh:["lzh","zh"],max:["max","ms"],mdl:["mdl","sgn"],meo:["meo","ms"],mfa:["mfa","ms"],mfb:["mfb","ms"],mfs:["mfs","sgn"],min:["min","ms"],mnp:["mnp","zh"],mqg:["mqg","ms"],mre:["mre","sgn"],msd:["msd","sgn"],msi:["msi","ms"],msr:["msr","sgn"],mui:["mui","ms"],mzc:["mzc","sgn"],mzg:["mzg","sgn"],mzy:["mzy","sgn"],nan:["nan","zh"],nbs:["nbs","sgn"],ncs:["ncs","sgn"],nsi:["nsi","sgn"],nsl:["nsl","sgn"],nsp:["nsp","sgn"],nsr:["nsr","sgn"],nzs:["nzs","sgn"],okl:["okl","sgn"],orn:["orn","ms"],ors:["ors","ms"],pel:["pel","ms"],pga:["pga","ar"],pks:["pks","sgn"],prl:["prl","sgn"],prz:["prz","sgn"],psc:["psc","sgn"],psd:["psd","sgn"],pse:["pse","ms"],psg:["psg","sgn"],psl:["psl","sgn"],pso:["pso","sgn"],psp:["psp","sgn"],psr:["psr","sgn"],pys:["pys","sgn"],rms:["rms","sgn"],rsi:["rsi","sgn"],rsl:["rsl","sgn"],sdl:["sdl","sgn"],sfb:["sfb","sgn"],sfs:["sfs","sgn"],sgg:["sgg","sgn"],sgx:["sgx","sgn"],shu:["shu","ar"],slf:["slf","sgn"],sls:["sls","sgn"],sqk:["sqk","sgn"],sqs:["sqs","sgn"],ssh:["ssh","ar"],ssp:["ssp","sgn"],ssr:["ssr","sgn"],svk:["svk","sgn"],swc:["swc","sw"],swh:["swh","sw"],swl:["swl","sgn"],syy:["syy","sgn"],tmw:["tmw","ms"],tse:["tse","sgn"],tsm:["tsm","sgn"],tsq:["tsq","sgn"],tss:["tss","sgn"],tsy:["tsy","sgn"],tza:["tza","sgn"],ugn:["ugn","sgn"],ugy:["ugy","sgn"],ukl:["ukl","sgn"],uks:["uks","sgn"],urk:["urk","ms"],uzn:["uzn","uz"],uzs:["uzs","uz"],vgt:["vgt","sgn"],vkk:["vkk","ms"],vkt:["vkt","ms"],vsi:["vsi","sgn"],vsl:["vsl","sgn"],vsv:["vsv","sgn"],wuu:["wuu","zh"],xki:["xki","sgn"],xml:["xml","sgn"],xmm:["xmm","ms"],xms:["xms","sgn"],yds:["yds","sgn"],ysl:["ysl","sgn"],yue:["yue","zh"],zib:["zib","sgn"],zlm:["zlm","ms"],zmi:["zmi","ms"],zsl:["zsl","sgn"],zsm:["zsm","ms"]}},mb={BHD:3,BYR:0,XOF:0,BIF:0,XAF:0,CLF:0,CLP:0,KMF:0,DJF:0,XPF:0,GNF:0,ISK:0,IQD:3,JPY:0,JOD:3,KRW:0,KWD:3,LYD:3,OMR:3,PYG:0,RWF:0,TND:3,UGX:0,UYI:0,VUV:0,VND:0};!function(){var a="[a-z]{3}(?:-[a-z]{3}){0,2}",b="(?:[a-z]{2,3}(?:-"+a+")?|[a-z]{4}|[a-z]{5,8})",c="[a-z]{4}",d="(?:[a-z]{2}|\\d{3})",e="(?:[a-z0-9]{5,8}|\\d[a-z0-9]{3})",f="[0-9a-wy-z]",g=f+"(?:-[a-z0-9]{2,8})+",h="x(?:-[a-z0-9]{1,8})+",i="(?:en-GB-oed|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|tao|tay|tsu)|sgn-(?:BE-FR|BE-NL|CH-DE))",j="(?:art-lojban|cel-gaulish|no-bok|no-nyn|zh-(?:guoyu|hakka|min|min-nan|xiang))",k="(?:"+i+"|"+j+")",l=b+"(?:-"+c+")?(?:-"+d+")?(?:-"+e+")*(?:-"+g+")*(?:-"+h+")?";P=RegExp("^(?:"+l+"|"+h+"|"+k+")$","i"),R=RegExp("^(?!x).*?-("+e+")-(?:\\w{4,8}-(?!x-))*\\1\\b","i"),S=RegExp("^(?!x).*?-("+f+")-(?:\\w+-(?!x-))*\\1\\b","i"),Q=RegExp("-"+g,"ig")}(),X(T,"NumberFormat",{configurable:!0,writable:!0,value:o}),X(T.NumberFormat,"prototype",{writable:!1}),eb.NumberFormat={"[[availableLocales]]":[],"[[relevantExtensionKeys]]":["nu"],"[[localeData]]":{}},X(T.NumberFormat,"supportedLocalesOf",{configurable:!0,writable:!0,value:db.call(G,eb.NumberFormat)}),X(T.NumberFormat.prototype,"format",{configurable:!0,get:r});var nb={arab:["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"],arabext:["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"],bali:["᭐","᭑","᭒","᭓","᭔","᭕","᭖","᭗","᭘","᭙"],beng:["০","১","২","৩","৪","৫","৬","৭","৮","৯"],deva:["०","१","२","३","४","५","६","७","८","९"],fullwide:["０","１","２","３","４","５","６","７","８","９"],gujr:["૦","૧","૨","૩","૪","૫","૬","૭","૮","૯"],guru:["੦","੧","੨","੩","੪","੫","੬","੭","੮","੯"],hanidec:["〇","一","二","三","四","五","六","七","八","九"],khmr:["០","១","២","៣","៤","៥","៦","៧","៨","៩"],knda:["೦","೧","೨","೩","೪","೫","೬","೭","೮","೯"],laoo:["໐","໑","໒","໓","໔","໕","໖","໗","໘","໙"],latn:["0","1","2","3","4","5","6","7","8","9"],limb:["᥆","᥇","᥈","᥉","᥊","᥋","᥌","᥍","᥎","᥏"],mlym:["൦","൧","൨","൩","൪","൫","൬","൭","൮","൯"],mong:["᠐","᠑","᠒","᠓","᠔","᠕","᠖","᠗","᠘","᠙"],mymr:["၀","၁","၂","၃","၄","၅","၆","၇","၈","၉"],orya:["୦","୧","୨","୩","୪","୫","୬","୭","୮","୯"],tamldec:["௦","௧","௨","௩","௪","௫","௬","௭","௮","௯"],telu:["౦","౧","౨","౩","౪","౫","౬","౭","౮","౯"],thai:["๐","๑","๒","๓","๔","๕","๖","๗","๘","๙"],tibt:["༠","༡","༢","༣","༤","༥","༦","༧","༨","༩"]};X(T.NumberFormat.prototype,"resolvedOptions",{configurable:!0,writable:!0,value:function(){var a,b=new I,c=["locale","numberingSystem","style","currency","currencyDisplay","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits","useGrouping"],d=null!=this&&"object"==typeof this&&N(this);if(!d||!d["[[initializedNumberFormat]]"])throw new TypeError("`this` value for resolvedOptions() is not an initialized Intl.NumberFormat object.");for(var e=0,f=c.length;f>e;e++)W.call(d,a="[["+c[e]+"]]")&&(b[c[e]]={value:d[a],writable:!0,configurable:!0,enumerable:!0});return Z({},b)}}),X(T,"DateTimeFormat",{configurable:!0,writable:!0,value:v}),X(v,"prototype",{writable:!1});var ob={weekday:["narrow","short","long"],era:["narrow","short","long"],year:["2-digit","numeric"],month:["2-digit","numeric","narrow","short","long"],day:["2-digit","numeric"],hour:["2-digit","numeric"],minute:["2-digit","numeric"],second:["2-digit","numeric"],timeZoneName:["short","long"]};eb.DateTimeFormat={"[[availableLocales]]":[],"[[relevantExtensionKeys]]":["ca","nu"],"[[localeData]]":{}},X(T.DateTimeFormat,"supportedLocalesOf",{configurable:!0,writable:!0,value:db.call(G,eb.DateTimeFormat)}),X(T.DateTimeFormat.prototype,"format",{configurable:!0,get:B}),X(T.DateTimeFormat.prototype,"resolvedOptions",{writable:!0,configurable:!0,value:function(){var a,b=new I,c=["locale","calendar","numberingSystem","timeZone","hour12","weekday","era","year","month","day","hour","minute","second","timeZoneName"],d=null!=this&&"object"==typeof this&&N(this);if(!d||!d["[[initializedDateTimeFormat]]"])throw new TypeError("`this` value for resolvedOptions() is not an initialized Intl.DateTimeFormat object.");for(var e=0,f=c.length;f>e;e++)W.call(d,a="[["+c[e]+"]]")&&(b[c[e]]={value:d[a],writable:!0,configurable:!0,enumerable:!0});return Z({},b)}});var pb=T.__localeSensitiveProtos={Number:{},Date:{}};return pb.Number.toLocaleString=function(){if("[object Number]"!==Object.prototype.toString.call(this))throw new TypeError("`this` value must be a number for Number.prototype.toLocaleString()");return s(new o(arguments[0],arguments[1]),this)},pb.Date.toLocaleString=function(){if("[object Date]"!==Object.prototype.toString.call(this))throw new TypeError("`this` value must be a Date instance for Date.prototype.toLocaleString()");var a=+this;if(isNaN(a))return"Invalid Date";var b=arguments[0],c=arguments[1],c=x(c,"any","all"),d=new v(b,c);return C(d,a)},pb.Date.toLocaleDateString=function(){if("[object Date]"!==Object.prototype.toString.call(this))throw new TypeError("`this` value must be a Date instance for Date.prototype.toLocaleDateString()");var a=+this;if(isNaN(a))return"Invalid Date";var b=arguments[0],c=arguments[1],c=x(c,"date","date"),d=new v(b,c);return C(d,a)},pb.Date.toLocaleTimeString=function(){if("[object Date]"!==Object.prototype.toString.call(this))throw new TypeError("`this` value must be a Date instance for Date.prototype.toLocaleTimeString()");var a=+this;if(isNaN(a))return"Invalid Date";var b=arguments[0],c=arguments[1],c=x(c,"time","time"),d=new v(b,c);return C(d,a)},X(T,"__applyLocaleSensitivePrototypes",{writable:!0,configurable:!0,value:function(){X(Number.prototype,"toLocaleString",{writable:!0,configurable:!0,value:pb.Number.toLocaleString});for(var a in pb.Date)W.call(pb.Date,a)&&X(Date.prototype,a,{writable:!0,configurable:!0,value:pb.Date[a]})}}),X(T,"__addLocaleData",{value:function(b){if(!a(b.locale))throw new Error("Object passed doesn't identify itself with a valid language tag");E(b,b.locale)}}),I.prototype=Z(null),J.prototype=Z(null),T});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
/* jshint ignore:start */
// Shims, polyfills, etc.
// dataset
Function.prototype.bind||(Function.prototype.bind=function(e){"use strict";if(typeof this!="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&e?this:e,t.concat(Array.prototype.slice.call(arguments)))};return r.prototype=this.prototype,i.prototype=new r,i}),function(){"use strict";var e=Object.prototype,t=e.__defineGetter__,n=e.__defineSetter__,r=e.__lookupGetter__,i=e.__lookupSetter__,s=e.hasOwnProperty;t&&n&&r&&i&&(Object.defineProperty||(Object.defineProperty=function(e,o,u){if(arguments.length<3)throw new TypeError("Arguments not optional");o+="";if(s.call(u,"value")){!r.call(e,o)&&!i.call(e,o)&&(e[o]=u.value);if(s.call(u,"get")||s.call(u,"set"))throw new TypeError("Cannot specify an accessor and a value")}if(!(u.writable&&u.enumerable&&u.configurable))throw new TypeError("This implementation of Object.defineProperty does not support false for configurable, enumerable, or writable.");return u.get&&t.call(e,o,u.get),u.set&&n.call(e,o,u.set),e}),Object.getOwnPropertyDescriptor||(Object.getOwnPropertyDescriptor=function(e,t){if(arguments.length<2)throw new TypeError("Arguments not optional.");t+="";var n={configurable:!0,enumerable:!0,writable:!0},o=r.call(e,t),u=i.call(e,t);return s.call(e,t)?!o&&!u?(n.value=e[t],n):(delete n.writable,n.get=n.set=undefined,o&&(n.get=o),u&&(n.set=u),n):n}),Object.defineProperties||(Object.defineProperties=function(e,t){var n;for(n in t)s.call(t,n)&&Object.defineProperty(e,n,t[n])}))}();if(!document.documentElement.dataset&&(!Object.getOwnPropertyDescriptor(Element.prototype,"dataset")||!Object.getOwnPropertyDescriptor(Element.prototype,"dataset").get)){var propDescriptor={enumerable:!0,get:function(){"use strict";var e,t=this,n,r,i,s,o,u=this.attributes,a=u.length,f=function(e){return e.charAt(1).toUpperCase()},l=function(){return this},c=function(e,t){return typeof t!="undefined"?this.setAttribute(e,t):this.removeAttribute(e)};try{(({})).__defineGetter__("test",function(){}),n={}}catch(h){n=document.createElement("div")}for(e=0;e<a;e++){o=u[e];if(o&&o.name&&/^data-\w[\w\-]*$/.test(o.name)){r=o.value,i=o.name,s=i.substr(5).replace(/-./g,f);try{Object.defineProperty(n,s,{enumerable:this.enumerable,get:l.bind(r||""),set:c.bind(t,i)})}catch(p){n[s]=r}}}return n}};try{Object.defineProperty(Element.prototype,"dataset",propDescriptor)}catch(e){propDescriptor.enumerable=!1,Object.defineProperty(Element.prototype,"dataset",propDescriptor)}};

// Object.assign, useful for merging objects
if (!Object.assign) {
  Object.defineProperty(Object, "assign", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target, firstSource) {
      "use strict";
      if (target === undefined || target === null)
        throw new TypeError("Cannot convert first argument to object");

      var to = Object(target);

      var hasPendingException = false;
      var pendingException;

      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null)
          continue;

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          try {
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable)
              to[nextKey] = nextSource[nextKey];
          } catch (e) {
            if (!hasPendingException) {
              hasPendingException = true;
              pendingException = e;
            }
          }
        }

        if (hasPendingException)
          throw pendingException;
      }
      return to;
    }
  });
}
/* jshint ignore:end */

},{}],4:[function(require,module,exports){
'use strict';
// Create a Walk
// 
// Form for creating new walks. Includes a map builder, team builder, scheduler
//

// Load create-a-walk View components
var CAWImageUpload = require('./elements/CAWImageUpload.jsx');
var CAWThemeSelect = require('./elements/CAWThemeSelect.jsx');
var CAWMapBuilder = require('./elements/CAWMapBuilder.jsx');
var CAWDateSelect = require('./elements/CAWDateSelect.jsx');
var CAWWardSelect = require('./elements/CAWWardSelect.jsx');
var CAWAccessibleSelect = require('./elements/CAWAccessibleSelect.jsx');
var CAWTeamBuilder = require('./elements/CAWTeamBuilder.jsx');

// Libs
var I18nTranslate = require('./functions/translate.js');
var Helper = require('./functions/helpers.jsx');

var CreateWalk = React.createClass({displayName: 'CreateWalk',
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    var data = this.props.data;
    // TODO: move this into its own model js
    var walk = {
      title: '',
      shortdescription: '',
      longdescription: '',
      'accessible-info': '',
      'accessible-transit': '',
      'accessible-parking': '',
      'accessible-find': '',
      gmap: {
        markers: [],
        route: []
      },
      team: [{
        user_id: -1,
        type: 'you',
        "name-first": '',
        "name-last": '',
        role: 'walk-leader',
        primary: 'on',
        bio: '',
        twitter: '',
        facebook: '',
        website: '',
        email: '',
        phone: ''
      }],
      time: {type: '', slots: []},
      thumbnails: [],
      wards: '',
      checkboxes: {},
      notifications: [],
      url: this.props.url
    };

    // Convert old {0: marker, 1: marker} indexing to a proper array
    if (data) {
      // Convert markers
      if (data.gmap && !Array.isArray(data.gmap.markers)) {
        data.gmap.markers = Helper.objectToArray(data.gmap.markers);
      }
      // Convert routes
      if (data.gmap && !Array.isArray(data.gmap.route)) {
        data.gmap.route = Helper.objectToArray(data.gmap.route);
      }
      // Convert time slots
      if (data.time && !Array.isArray(data.time.slots)) {
        data.time.slots = Helper.objectToArray(data.time.slots);
      }
      // Turn all 'false' values into empty strings
      for (var i in data) {
        if (data[i] === false) data[i] = '';
      }

      // Init the leader as creator, if none set
      data.team = data.team || []
      if (data.team.length === 0) {
        var user = this.props.user;
        data.team = [{
          user_id: user.id,
          type: 'you',
          "name-first": user.firstName,
          "name-last": user.lastName,
          role: 'walk-leader',
          primary: 'on',
          bio: user.bio,
          twitter: user.twitter,
          facebook: user.facebook,
          website: user.website,
          email: user.email,
          phone: '' 
        }];
      }
      Object.assign(walk, data);
    }
    return walk;
  },

  saveWalk: function(options, cb) {
    // TODO: separate the notifications logic
    /* Send in the updated walk to save, but keep working */
    var notifications = this.state.notifications.slice();
    var removeNotice = function() {
      var notifications = this.state.notifications.slice();
      this.setState({notifications: notifications.slice(1)});
    }.bind(this);

    var defaultOptions = {
      messageTimeout: 1200
    };
    options = options || {};
    
    notifications.push({type: 'info', name: 'Saving walk'});

    // Build a simplified map from the Google objects
    this.setState({
      gmap: this.refs.mapBuilder.getStateSimple(),
      notifications: notifications
    }, function() {
      $.ajax({
        url: this.state.url,
        type: options.publish ? 'PUT' : 'POST',
        data: {json: JSON.stringify(this.state)},
        dataType: 'json',
        success: function(data) {
          var notifications = this.state.notifications.slice();
          notifications.push({type: 'success', name: 'Walk saved'});
          this.setState(
            {notifications: notifications, url: (data.url || this.state.url)},
            function() {
              if (cb && cb instanceof Function) {
                // The 'this' in each callback should be the <CreateWalk>
                cb.call(this);
              }
            }
          );
          setTimeout(removeNotice, 1200);
          }.bind(this),
        error: function(xhr, status, err) {
          var notifications = this.state.notifications.slice();
          notifications.push({type: 'danger', name: 'Walk failed to save', message: 'Keep this window open and contact Jane\'s Walk for assistance'});
          this.setState({notifications: notifications});
          setTimeout(removeNotice, 6000);
          console.error(this.url, status, err.toString());
        }.bind(this)
      });
    }.bind(this));
    setTimeout(removeNotice, 1200);
  },

  handleNext: function() {
    // Bootstrap's managing the tabs, so trigger a jQuery click on the next
    var next = $('#progress-panel > .nav > li.active + li > a');
    window.scrollTo(0, 0);
    if (next.length) {
      this.saveWalk();
      next.trigger('click');
    } else {
      // If no 'next' tab, next step is to publish
      $(this.refs.publish.getDOMNode()).trigger('click');
    }
  },
 
  handleSave: function() {
    this.saveWalk();
  },

  handlePublish: function() {
    this.saveWalk({publish: true}, function() {
      console.log('Walk published');
    });
  },
 
  handlePreview: function(e) {
    var _this = this;
    this.saveWalk({}, function() {
      _this.setState({preview: true});
    });
  },

  componentWillMount: function() {
    var locale = this.props.locale;
    var _this = this;

    // Start loading the translations file as early as possible
    if (locale.translation) {
      $.ajax({
        url: locale.translation,
        dataType: 'json',
        success: function(data) {
          try {
            _this.state.i18n.constructor(data.translations['']);
            _this.setState({});
          } catch (e) {
            console.error('Failed to load i18n translations JSON: ' + e.stack);
          }
        }
      });
    }

    this.setState({i18n: new I18nTranslate()});
  },

  render: function() {
    var i18n = this.state.i18n;
    var t = i18n.translate.bind(i18n);
    var t2 = i18n.translatePlural.bind(i18n);

    return (
      React.createElement("main", {id: "create-walk"}, 
        React.createElement("section", null, 
          React.createElement("nav", {id: "progress-panel"}, 
            React.createElement("ul", {className: "nav nav-tabs"}, 
              React.createElement("li", {className: "active"}, React.createElement("a", {'data-toggle': "tab", className: "description", href: "#description"}, React.createElement("i", {className: "fa fa-list-ol"}),  t('Describe Your Walk') )), 
              React.createElement("li", null, React.createElement("a", {'data-toggle': "tab", className: "route", href: "#route"}, React.createElement("i", {className: "fa fa-map-marker"}),  t('Share Your Route') )), 
              React.createElement("li", null, React.createElement("a", {'data-toggle': "tab", className: "time-and-date", href: "#time-and-date"}, React.createElement("i", {className: "fa fa-calendar"}),  t('Set the Time & Date') )), 
              React.createElement("li", null, React.createElement("a", {'data-toggle': "tab", className: "accessibility", href: "#accessibility"}, React.createElement("i", {className: "fa fa-flag"}),  t('Make it Accessible') )), 
              React.createElement("li", null, React.createElement("a", {'data-toggle': "tab", className: "team", href: "#team"}, React.createElement("i", {className: "fa fa-users"}),  t('Build Your Team') ))
            ), 
            React.createElement("section", {id: "button-group"}, 
              React.createElement("button", {className: "btn btn-info btn-preview", id: "preview-walk", title: "Preview what you have so far.", onClick: this.handlePreview},  t('Preview Walk') ), 
              React.createElement("button", {className: "btn btn-info btn-submit", id: "btn-submit", title: "Publishing will make your visible to all.", onClick: function() {this.setState({publish: true})}.bind(this), ref: "publish"},  t('Publish Walk') ), 
              React.createElement("button", {className: "btn btn-info save", title: "Save", id: "btn-save", onClick: this.handleSave},  t('Save') )
            )
          ), 
          React.createElement("div", {id: "main-panel", role: "main"}, 
            React.createElement("div", {className: "tab-content"}, 
              React.createElement("div", {className: "tab-pane active", id: "description"}, 
                React.createElement("div", {className: "walk-submit lead clearfix"}, 
                  React.createElement("div", {className: "col-md-4"}, 
                    React.createElement("img", {id: "convo-marker", src: CCM_THEME_PATH + '/img/jw-intro-graphic.svg', alt: "Jane's Walks are walking conversations."})
                  ), 
                  React.createElement("div", {className: "col-md-8"}, 
                    React.createElement("h1", null,  t('Hey there, %s!', this.props.user.firstName) ), 
                    React.createElement("p", null,  t('Jane’s Walks are walking conversations about neighbourhoods. You can return to this form at any time, so there\'s no need to finish everything at once.') )
                  )
                ), 
                React.createElement("div", {className: "page-header", 'data-section': "description"}, 
                  React.createElement("h1", null,  t('Describe Your Walk') )
                ), 
                React.createElement("form", null, 
                  React.createElement("fieldset", null, 
                    React.createElement("div", {className: "item required"}, 
                      React.createElement("label", {htmlFor: "title"},  t('Walk Title') ), 
                      React.createElement("div", {className: "alert alert-info"},  t('Something short and memorable.') ), 
                      React.createElement("input", {type: "text", valueLink: this.linkState('title')})
                    )
                  )
                ), 
                React.createElement(CAWImageUpload, {i18n: i18n, valueLink: this.linkState('thumbnails'), valt: this.props.valt}), 
                React.createElement("form", null, 
                  React.createElement("hr", null), 
                  React.createElement("fieldset", null, 
                    React.createElement("div", {className: "item required"}, 
                      React.createElement("label", {htmlFor: "shortdescription"},  t('Your Walk in a Nutshell') ), 
                      React.createElement("div", {className: "alert alert-info"},  t('Build intrigue! This is what people see when browsing our walk listings.') ), 
                      React.createElement("textarea", {id: "shortdescription", name: "shortdescription", rows: "6", maxLength: "140", valueLink: this.linkState('shortdescription'), required: true})
                    ), 
                    React.createElement("hr", null), 
                    React.createElement("div", {className: "item required"}, 
                      React.createElement("label", {htmlFor: "longdescription", id: "longwalkdescription"},  t('Walk Description') ), 
                      React.createElement("div", {className: "alert alert-info"}, 
                        t('Help jump start the conversation on your walk by giving readers an idea of the discussions you\'ll be having on the walk together. We suggest including a couple of questions to get people thinking about how they can contribute to the dialog on the walk. To keep this engaging, we recommend keeping your description to 200 words.')
                      ), 
                      React.createElement("textarea", {id: "longdescription", name: "longdescription", rows: "14", valueLink: this.linkState('longdescription')})
                    )
                  ), 
                  React.createElement(CAWThemeSelect, {i18n: i18n, valueLink: this.linkState('checkboxes')}), 
                  React.createElement(CAWWardSelect, {i18n: i18n, wards: this.props.city.wards, valueLink: this.linkState('wards')}), 
                  React.createElement("hr", null)
                )
              ), 
              React.createElement(CAWMapBuilder, {ref: "mapBuilder", i18n: i18n, valueLink: this.linkState('gmap'), city: this.props.city}), 
              React.createElement(CAWDateSelect, {i18n: i18n, valueLink: this.linkState('time')}), 
              React.createElement("div", {className: "tab-pane", id: "accessibility"}, 
                React.createElement("div", {className: "page-header", 'data-section': "accessibility"}, 
                  React.createElement("h1", null,  t('Make it Accessible') )
                ), 
                React.createElement("div", {className: "item"}, 
                  React.createElement(CAWAccessibleSelect, {i18n: i18n, valueLink: this.linkState('checkboxes')})
                ), 

                React.createElement("div", {className: "item"}, 
                  React.createElement("fieldset", null, 
                    React.createElement("legend", null,  t('What else do people need to know about the accessibility of this walk?'), " (",  t('Optional'), ")"), 
                    React.createElement("textarea", {name: "accessible-info", rows: "3", maxLength: "140", valueLink: this.linkState('accessible-info')})
                  )
                ), 

                React.createElement("div", {className: "item"}, 
                  React.createElement("fieldset", null, 
                    React.createElement("legend", {id: "transit"},  t('How can someone get to the meeting spot by public transit?'), " (",  t('Optional'), ")"), 
                    React.createElement("div", {className: "alert alert-info"}, 
                       t('Nearest subway stop, closest bus or streetcar lines, etc.')
                    ), 
                    React.createElement("textarea", {rows: "3", name: "accessible-transit", valueLink: this.linkState('accessible-transit')})
                  )
                ), 

                React.createElement("div", {className: "item"}, 
                  React.createElement("fieldset", null, 
                    React.createElement("legend", null,  t('Where are the nearest places to park?'), " (",  t('Optional'), ")"), 
                    React.createElement("textarea", {rows: "3", name: "accessible-parking", valueLink: this.linkState('accessible-parking')})
                  )
                ), 

                React.createElement("div", {className: "item"}, 
                  React.createElement("fieldset", null, 
                    React.createElement("legend", {className: "required-legend"},  t('How will people find you?') ), 
                    React.createElement("div", {className: "alert alert-info"}, 
                       t('Perhaps you will be holding a sign, wearing a special t-shirt or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.')
                    ), 
                    React.createElement("textarea", {rows: "3", name: "accessible-find", valueLink: this.linkState('accessible-find')})
                  )
                ), 
                React.createElement("hr", null), 
                React.createElement("br", null)
              ), 
              React.createElement(CAWTeamBuilder, {i18n: i18n, valueLink: this.linkState('team')})
            ), 
            React.createElement("button", {type: "button", onClick: this.handleNext, className: "btn"}, "Next")
          ), 
          React.createElement("aside", {id: "tips-panel", role: "complementary"}, 
            React.createElement("div", {className: "popover right", id: "city-organizer", style: {display: 'block'}}, 
              React.createElement("h3", {className: "popover-title", 'data-toggle': "collapse", 'data-target': "#popover-content"}, React.createElement("i", {className: "fa fa-envelope"}),  t('Contact City Organizer for help') ), 
              React.createElement("div", {className: "popover-content collapse in", id: "popover-content"}, 
                React.createElement("div", {className: "u-avatar", style: {backgroundImage: 'url(' + this.props.city.cityOrganizer.photo + ')'}}), 
                React.createElement("p", null, 
                   t('Hi! I\'m %s, the City Organizer for Jane\'s Walk %s. I\'m here to help, so if you have any questions, please', this.props.city.cityOrganizer.firstName, this.props.city.name), " ", React.createElement("strong", null, React.createElement("a", {href: 'mailto:' + this.props.city.cityOrganizer.email},  t('email me'), "!")))
              )
            )
          )
        ), 
        this.state.publish ? React.createElement(WalkPublish, {i18n: i18n, url: this.state.url, saveWalk: this.saveWalk.bind(this), close: this.setState.bind(this, {publish: false})}) : null, 
        this.state.preview ? React.createElement(WalkPreview, {i18n: i18n, url: this.state.url, close: this.setState.bind(this, {preview: false})}) : null, 
        React.createElement("aside", {id: "notifications"}, 
          this.state.notifications.map(function(notification) {
            return (
              React.createElement("div", {key: notification.message, className: 'alert alert-' + notification.type}, 
                React.createElement("strong", null, notification.name || '', ": "), 
                notification.message || ''
              )
              );
          })
        )
      )
    );
  }
});

var WalkPreview = React.createClass({displayName: 'WalkPreview',
  componentDidMount: function() {
    var _this = this;
    // Bootstrap Modal
    $(this.getDOMNode()).modal();
    // Close the modal when modal closes
    $(this.getDOMNode()).bind('hidden.bs.modal', function() {
      _this.props.close();
    });
  },
  render: function() {
    var i18n = this.props.i18n;
    var t = i18n.translate.bind(i18n);

    return (
      React.createElement("dialog", {id: "preview-modal"}, 
        React.createElement("div", null, 
          React.createElement("article", null, 
            React.createElement("header", null, 
              React.createElement("button", {type: "button", className: "close", 'aria-hidden': "true", 'data-dismiss': "modal"}, "×"), 
              React.createElement("h3", null,  t('Preview of your Walk') )
            ), 
            React.createElement("div", {className: "modal-body"}, 
              React.createElement("iframe", {src: this.props.url, frameBorder: "0"})
            )
          )
        )
      )
    );
  }
});

var WalkPublish = React.createClass({displayName: 'WalkPublish',
  componentDidMount: function() {
    var _this = this;
    // Bootstrap Modal
    $(this.getDOMNode()).modal();
    // Close the modal when modal closes
    $(this.getDOMNode()).bind('hidden.bs.modal', function() {
      _this.props.close();
    });
  },
  render: function() {
    var i18n = this.props.i18n;
    var t = i18n.translate.bind(i18n);
    var close = function() { this.props.close() }.bind(this);
    var publish = function() {
      this.props.saveWalk({publish: true}, function() {
        // This function's meant for callbacks, so it grabs the URL from the caller's state
        window.location = this.state.url;
      });
    }.bind(this);

    return (
      React.createElement("dialog", {id: "publish-warning"}, 
        React.createElement("div", null, 
          React.createElement("article", null, 
            React.createElement("header", null, 
              React.createElement("button", {type: "button", className: "close", 'data-dismiss': "modal", 'aria-hidden': "true"}, "×"), 
              React.createElement("h3", null,  t('Okay, You\'re Ready to Publish') )
            ), 
            React.createElement("div", {className: "modal-body"}, 
              React.createElement("p", null,  t('Just one more thing! Once you hit publish your walk will be live on Jane\'s Walk right away. You can return at any time to make changes.') )
            ), 
            React.createElement("footer", null, 
              React.createElement("div", {className: "pull-left"}, 
                React.createElement("a", {className: "walkthrough close", 'data-dismiss': "modal", onClick: close}, " ",  t('Bring me back to edit') )
              ), 
              React.createElement("a", null, 
                React.createElement("button", {className: "btn btn-primary walkthrough", 'data-step': "publish-confirmation", onClick: publish},  t('Publish') )
              )
            )
          )
        )
      )
    );
    /*
    return (
      <dialog id="publish-confirmation">
        <header>
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h3>Your Walk Has Been Published!</h3>
        </header>
        <div className="modal-body">
          <p>Congratulations! Your walk is now available for all to peruse.</p>
          <h2 className="lead">{t('Don\'t forget to share your walk!')}</h2>
          <label>Your Walk Web Address:</label>
          <input type="text" className="clone js-url-field" value={this.props.url} readOnly />
          <hr />
          <button className="btn facebook"><i className="fa fa-facebook-sign" /> Share on Facebook</button>
          <button className="btn twitter"><i className="fa fa-twitter-sign" /> Share on Twitter</button>
        </div>
        <footer>
          <button className="btn btn-primary walkthrough">Close</button>
        </footer>
      </dialog>
    );
    */
  }
});

module.exports = CreateWalk;

/*
example json:
{"title":"The Beltline and Beyond: The Midtown Trail Loop","shortdescription":"Imagine a 16km off road trail in the heart of Toronto's Midtown. Bring your bike to ride it all!","longdescription":"<span>Did\nyou know that you can cycle a loop that is almost entirely off road right in\nthe middle of Toronto? The trail and ravine systems consisting of the Kay\nGardner Beltline Trail, Park Reservation Trail, David Balfour Park, Yellow\nCreek, Nordheimer Ravine and Cedarvale Park together form a 16 kilometer loop\nseparated by only 1 km of city side streets. These trails story some of\nToronto\u2019s most important urban history, as well as reveal our rich natural\nhistory and watersheds.&nbsp; We'll also be\nriding on top of three of Toronto's 'lost rivers'. Join us as we ride and\nexplore this unique Toronto treasure.<\/span>","accessible-info":"Accessibility and conditions: This is a cycling, not a walking tour - approximately 16km of mostly light riding and one quite steep hill. You do need a bicycle in reasonable shape. Although the ride is almost entirely on trails, they are generally smooth and rideable by most bikes. The most challenging part will be the hill leading out of the Yellow Creek trail up to Avoca. The section between Avoca and Russell Hill Road is the only section on city side streets, and riders are expected to follow the rules of the road. Participants can decide to complete only a limited part of the loop. If you only wish to do half the ride, that's OK too.","accessible-transit":"Ben Nobleman Park is across the road from Eglinton West Subway Station","accessible-parking":"Nearby on street parking though due to the LRT construction, parking is extremely limited.","gmap":{"markers":{"0":{"title":"Ben Nobleman Parkette","description":"The huge picnic table in the middle of the park.","style":"meeting","lat":43.6983887613,"lng":-79.4351971008},"1":{"title":"The missing link","description":"What's preventing the east and west sections connecting.","questions":"","style":"stop","lat":43.7022773798,"lng":-79.4381117538},"2":{"title":"The Beltline","description":"Where the beltline starts, and how it started.","questions":"","style":"stop","lat":43.7027834146,"lng":-79.4365668015},"3":{"title":"Yonge Street","description":"About what we do and why Yonge is so key.","questions":"","style":"stop","lat":43.6956768652,"lng":-79.396036821},"4":{"title":"Entering the Carolinian Forest","description":"We enter some more rugged terrain","questions":"","style":"stop","lat":43.6947866633,"lng":-79.3805872971},"5":{"title":"Park Drive Reservation trail","description":"What they were thinking of 60 years ago.","questions":"","style":"stop","lat":43.6786308037,"lng":-79.3706309372},"6":{"title":"Poplar Plains Road","description":"Toronto's first bike lane! ","questions":"","style":"stop","lat":43.6838883716,"lng":-79.4029891068},"7":{"title":"Nordheimer Ravine","description":"How a river was buried","questions":"","style":"stop","lat":43.682255979,"lng":-79.4093405777},"8":{"title":"Cedarvale ","description":"The ravine with everything","questions":"","style":"stop","lat":43.6868305028,"lng":-79.4163786942},"9":{"title":"Underground rivers","description":"Our first of 3 underground rivers. ","questions":"","style":"stop","lat":43.7026068983,"lng":-79.4181990341}},"route":{"0":{"lat":43.6986241931,"lng":-79.4352058321,"title":"#undefined"},"1":{"lat":43.698593166,"lng":-79.4362572581,"title":"#undefined"},"2":{"lat":43.6987483014,"lng":-79.4368580729,"title":"#undefined"},"3":{"lat":43.7018198988,"lng":-79.4377378374,"title":"#undefined"},"4":{"lat":43.7028282172,"lng":-79.4382742792,"title":"#undefined"},"5":{"lat":43.7030919285,"lng":-79.4369868189,"title":"#undefined"},"6":{"lat":43.7027351424,"lng":-79.436654225,"title":"#undefined"},"7":{"lat":43.7047982673,"lng":-79.4265369326,"title":"#undefined"},"8":{"lat":43.7044880275,"lng":-79.4233397394,"title":"#undefined"},"9":{"lat":43.7037744698,"lng":-79.4209364802,"title":"#undefined"},"10":{"lat":43.7014631052,"lng":-79.4157222658,"title":"#undefined"},"11":{"lat":43.7014631052,"lng":-79.4157222658,"title":"#undefined"},"12":{"lat":43.6981277575,"lng":-79.4061521441,"title":"#undefined"},"13":{"lat":43.695598975,"lng":-79.3970540911,"title":"#undefined"},"14":{"lat":43.6957075752,"lng":-79.3958524615,"title":"#undefined"},"15":{"lat":43.6975382349,"lng":-79.3865183741,"title":"#undefined"},"16":{"lat":43.6973830964,"lng":-79.3864325434,"title":"#undefined"},"17":{"lat":43.6973986103,"lng":-79.3858746439,"title":"#undefined"},"18":{"lat":43.6970728183,"lng":-79.3845013529,"title":"#undefined"},"19":{"lat":43.6965763698,"lng":-79.3837288767,"title":"#undefined"},"20":{"lat":43.6970573043,"lng":-79.3829349428,"title":"#undefined"},"21":{"lat":43.6961419741,"lng":-79.3806604296,"title":"#undefined"},"22":{"lat":43.6958316895,"lng":-79.3811324984,"title":"#undefined"},"23":{"lat":43.6954748602,"lng":-79.3812183291,"title":"#undefined"},"24":{"lat":43.6951490577,"lng":-79.3807462603,"title":"#undefined"},"25":{"lat":43.6947922243,"lng":-79.3807462603,"title":"#undefined"},"26":{"lat":43.6946681079,"lng":-79.3804887682,"title":"#undefined"},"27":{"lat":43.694699137,"lng":-79.3801454455,"title":"#undefined"},"28":{"lat":43.6930700857,"lng":-79.3762401491,"title":"#undefined"},"29":{"lat":43.6929304507,"lng":-79.375532046,"title":"#undefined"},"30":{"lat":43.6908979485,"lng":-79.3714980036,"title":"#undefined"},"31":{"lat":43.6906496992,"lng":-79.3708757311,"title":"#undefined"},"32":{"lat":43.6896722078,"lng":-79.3686226755,"title":"#undefined"},"33":{"lat":43.6883843773,"lng":-79.3676570803,"title":"#undefined"},"34":{"lat":43.6866775713,"lng":-79.367871657,"title":"#undefined"},"35":{"lat":43.68462934,"lng":-79.3670562655,"title":"#undefined"},"36":{"lat":43.6837448549,"lng":-79.3670562655,"title":"#undefined"},"37":{"lat":43.683046568,"lng":-79.3673995882,"title":"#undefined"},"38":{"lat":43.6814792721,"lng":-79.3687728792,"title":"#undefined"},"39":{"lat":43.6802688572,"lng":-79.3687943369,"title":"#undefined"},"40":{"lat":43.6791670481,"lng":-79.3690303713,"title":"#undefined"},"41":{"lat":43.6788566757,"lng":-79.3701247126,"title":"#undefined"},"42":{"lat":43.6786083766,"lng":-79.3705753237,"title":"#undefined"},"43":{"lat":43.6789963434,"lng":-79.3714980036,"title":"#undefined"},"44":{"lat":43.6793687893,"lng":-79.3741587549,"title":"#undefined"},"45":{"lat":43.6793687893,"lng":-79.3747810274,"title":"#undefined"},"46":{"lat":43.6799740089,"lng":-79.3761328608,"title":"#undefined"},"47":{"lat":43.6799119354,"lng":-79.378407374,"title":"#undefined"},"48":{"lat":43.6799584905,"lng":-79.3800596148,"title":"#undefined"},"49":{"lat":43.680206784,"lng":-79.3812397867,"title":"#undefined"},"50":{"lat":43.6807344043,"lng":-79.3820337206,"title":"#undefined"},"51":{"lat":43.6805481859,"lng":-79.3826559931,"title":"#undefined"},"52":{"lat":43.6822706841,"lng":-79.3835357577,"title":"#undefined"},"53":{"lat":43.6831086382,"lng":-79.3840292841,"title":"#undefined"},"54":{"lat":43.6839776154,"lng":-79.3846086413,"title":"#undefined"},"55":{"lat":43.6844741681,"lng":-79.3850592524,"title":"#undefined"},"56":{"lat":43.6848776142,"lng":-79.3853382021,"title":"#undefined"},"57":{"lat":43.6848776142,"lng":-79.3853382021,"title":"#undefined"},"58":{"lat":43.6849335,"lng":-79.3855001405,"title":"#undefined"},"59":{"lat":43.6850576366,"lng":-79.3856181577,"title":"#undefined"},"60":{"lat":43.6850576366,"lng":-79.3856181577,"title":"#undefined"},"61":{"lat":43.685290392,"lng":-79.3853928521,"title":"#undefined"},"62":{"lat":43.6857326248,"lng":-79.3852319196,"title":"#undefined"},"63":{"lat":43.6857248664,"lng":-79.3856181577,"title":"#undefined"},"64":{"lat":43.6862524381,"lng":-79.3856718019,"title":"#undefined"},"65":{"lat":43.6866946638,"lng":-79.3858220056,"title":"#undefined"},"66":{"lat":43.6870049957,"lng":-79.3861116841,"title":"#undefined"},"67":{"lat":43.6872222271,"lng":-79.3864120916,"title":"#undefined"},"68":{"lat":43.6874394577,"lng":-79.3868734315,"title":"#undefined"},"69":{"lat":43.6879825306,"lng":-79.3877102807,"title":"#undefined"},"70":{"lat":43.6882230328,"lng":-79.388675876,"title":"#undefined"},"71":{"lat":43.6872687766,"lng":-79.388278909,"title":"#undefined"},"72":{"lat":43.6862524381,"lng":-79.3932678178,"title":"#undefined"},"73":{"lat":43.685880035,"lng":-79.3932785466,"title":"#undefined"},"74":{"lat":43.684398158,"lng":-79.4004668668,"title":"#undefined"},"75":{"lat":43.6842585028,"lng":-79.4005741552,"title":"#undefined"},"76":{"lat":43.6837929831,"lng":-79.4029023126,"title":"#undefined"},"77":{"lat":43.6842429855,"lng":-79.4031490758,"title":"#undefined"},"78":{"lat":43.6837309135,"lng":-79.4054665044,"title":"#undefined"},"79":{"lat":43.6827921034,"lng":-79.4051124528,"title":"#undefined"},"80":{"lat":43.6824817497,"lng":-79.4066788629,"title":"#undefined"},"81":{"lat":43.6816437868,"lng":-79.4060673192,"title":"#undefined"},"82":{"lat":43.6813101501,"lng":-79.4037820771,"title":"#undefined"},"83":{"lat":43.6812325599,"lng":-79.403395839,"title":"#undefined"},"84":{"lat":43.6808678847,"lng":-79.4030310586,"title":"#undefined"},"85":{"lat":43.6807592576,"lng":-79.4034494832,"title":"#undefined"},"86":{"lat":43.680704944,"lng":-79.4037391618,"title":"#undefined"},"87":{"lat":43.6803402656,"lng":-79.4037713483,"title":"#undefined"},"88":{"lat":43.6806661486,"lng":-79.4048549607,"title":"#undefined"},"89":{"lat":43.6807670167,"lng":-79.4053163007,"title":"#undefined"},"90":{"lat":43.6809609935,"lng":-79.4069041684,"title":"#undefined"},"91":{"lat":43.6812868731,"lng":-79.4076122716,"title":"#undefined"},"92":{"lat":43.6815351611,"lng":-79.408041425,"title":"#undefined"},"93":{"lat":43.6816825816,"lng":-79.4084062055,"title":"#undefined"},"94":{"lat":43.68220243,"lng":-79.4090070203,"title":"#undefined"},"95":{"lat":43.6822955367,"lng":-79.4099726155,"title":"#undefined"},"96":{"lat":43.6824196788,"lng":-79.4109489396,"title":"#undefined"},"97":{"lat":43.6825050263,"lng":-79.4114102796,"title":"#undefined"},"98":{"lat":43.6826058914,"lng":-79.4115926698,"title":"#undefined"},"99":{"lat":43.682675721,"lng":-79.4118608907,"title":"#undefined"},"100":{"lat":43.6827377916,"lng":-79.4122685865,"title":"#undefined"},"101":{"lat":43.68300935,"lng":-79.4128050283,"title":"#undefined"},"102":{"lat":43.6831490081,"lng":-79.4135024026,"title":"#undefined"},"103":{"lat":43.6834438409,"lng":-79.4142319635,"title":"#undefined"},"104":{"lat":43.6836300503,"lng":-79.4149722531,"title":"#undefined"},"105":{"lat":43.6834826346,"lng":-79.4157983735,"title":"#undefined"},"106":{"lat":43.6837386722,"lng":-79.4161524251,"title":"#undefined"},"107":{"lat":43.6842895373,"lng":-79.4163348153,"title":"#undefined"},"108":{"lat":43.6842895373,"lng":-79.4163348153,"title":"#undefined"},"109":{"lat":43.6846541917,"lng":-79.4160665944,"title":"#undefined"},"110":{"lat":43.6854843542,"lng":-79.4165386632,"title":"#undefined"},"111":{"lat":43.685336943,"lng":-79.417203851,"title":"#undefined"},"112":{"lat":43.6856472819,"lng":-79.4173969701,"title":"#undefined"},"113":{"lat":43.6858722766,"lng":-79.4166352227,"title":"#undefined"},"114":{"lat":43.6860041696,"lng":-79.4166674092,"title":"#undefined"},"115":{"lat":43.6865860473,"lng":-79.416227527,"title":"#undefined"},"116":{"lat":43.6872920513,"lng":-79.4166352227,"title":"#undefined"},"117":{"lat":43.6878118511,"lng":-79.4168283418,"title":"#undefined"},"118":{"lat":43.6882385491,"lng":-79.4168283418,"title":"#undefined"},"119":{"lat":43.6885876633,"lng":-79.4169034436,"title":"#undefined"},"120":{"lat":43.6888436792,"lng":-79.4172253087,"title":"#undefined"},"121":{"lat":43.6889290175,"lng":-79.4175257161,"title":"#undefined"},"122":{"lat":43.6889367756,"lng":-79.4179226831,"title":"#undefined"},"123":{"lat":43.6895418986,"lng":-79.4185664132,"title":"#undefined"},"124":{"lat":43.6899375527,"lng":-79.419628568,"title":"#undefined"},"125":{"lat":43.6898987632,"lng":-79.4198967889,"title":"#undefined"},"126":{"lat":43.6898987632,"lng":-79.4201864675,"title":"#undefined"},"127":{"lat":43.6903952669,"lng":-79.4208623841,"title":"#undefined"},"128":{"lat":43.6902556257,"lng":-79.4218065217,"title":"#undefined"},"129":{"lat":43.69024011,"lng":-79.4220962003,"title":"#undefined"},"130":{"lat":43.6903797513,"lng":-79.4224073365,"title":"#undefined"},"131":{"lat":43.6905814548,"lng":-79.4235124066,"title":"#undefined"},"132":{"lat":43.6908684932,"lng":-79.4237913564,"title":"#undefined"},"133":{"lat":43.6908995243,"lng":-79.4242956117,"title":"#undefined"},"134":{"lat":43.691008133,"lng":-79.4247569516,"title":"#undefined"},"135":{"lat":43.6909383132,"lng":-79.4259156659,"title":"#undefined"},"136":{"lat":43.690977102,"lng":-79.4263340905,"title":"#undefined"},"137":{"lat":43.6911322571,"lng":-79.4271923974,"title":"#undefined"},"138":{"lat":43.6911555303,"lng":-79.4283081964,"title":"#undefined"},"139":{"lat":43.6919002687,"lng":-79.4297780469,"title":"#undefined"},"140":{"lat":43.6921097247,"lng":-79.4298102334,"title":"#undefined"},"141":{"lat":43.6922183313,"lng":-79.4300140813,"title":"#undefined"},"142":{"lat":43.6924200286,"lng":-79.4304217771,"title":"#undefined"},"143":{"lat":43.6926527554,"lng":-79.4307650998,"title":"#undefined"},"144":{"lat":43.692776876,"lng":-79.4311942533,"title":"#undefined"},"145":{"lat":43.69389395,"lng":-79.4329323247,"title":"#undefined"},"146":{"lat":43.6944292073,"lng":-79.4330181554,"title":"#undefined"},"147":{"lat":43.6949877314,"lng":-79.433962293,"title":"#undefined"},"148":{"lat":43.6953678352,"lng":-79.434616752,"title":"#undefined"},"149":{"lat":43.6956703651,"lng":-79.4347669557,"title":"#undefined"},"150":{"lat":43.6971597205,"lng":-79.4353248551,"title":"#undefined"},"151":{"lat":43.6980983058,"lng":-79.4356896356,"title":"#undefined"}}},"team":[{"user_id":"176","type":"you","name-first":"Burns","name-last":"Wattie","role":"walk-leader","primary":"on","bio":"Burns is a midtowner who loves to cycle, run, cook and walk  - or run \u2013 the dog. He volunteers with Cycle Toronto, active in his local ward group (Cycle Toronto Midtown)  and the Yonge Street Working group.","twitter":"@homecookexplore","facebook":"","website":"","email":"burns.wattie@gmail.com","phone":false}],"time":{"type":"set","slots":{"0":{"date":"May 3, 2014","time":"01:00 PM","duration":"2 Hours, 30 Minutes","eb_start":"2014-05-03 13:00:00","eb_end":"2014-05-03 15:30:00"},"1":{"date":"May 4, 2014","time":"01:00 PM","duration":"2 Hours, 30 Minutes","eb_start":"2014-05-04 13:00:00","eb_end":"2014-05-04 15:30:00"}}},"thumbnail_id":"316","thumbnail_url":null,"wards":"Ward 22 St. Paul\\'s","checkboxes":{"theme-nature-naturelover":true,"theme-urban-moversandshakers":true,"theme-civic-activist":true,"accessible-familyfriendly":true,"accessible-dogs":true,"accessible-steephills":true,"accessible-bicyclesonly":true}}
*/

},{"./elements/CAWAccessibleSelect.jsx":8,"./elements/CAWDateSelect.jsx":9,"./elements/CAWImageUpload.jsx":10,"./elements/CAWMapBuilder.jsx":11,"./elements/CAWTeamBuilder.jsx":12,"./elements/CAWThemeSelect.jsx":13,"./elements/CAWWardSelect.jsx":14,"./functions/helpers.jsx":16,"./functions/translate.js":18}],5:[function(require,module,exports){
'use strict';
/**
* The dialogue to share on facebook
* 
* @public
* @param  Object shareObj
* @return void
*/
var FacebookShareDialog = function(shareObj) {
  this._shareObj = shareObj;
  this._shareObj.method = 'feed';
};
Object.defineProperties(FacebookShareDialog.prototype, {
  /**
   * _shareObj
   * 
   * @protected
   * @var       Object (default: null)
   */
  _shareObj: {value: null, writable: true},

  /**
   * show
   * 
   * @public
   * @param  Function failed
   * @param  Function successful
   * @return void
   */
  show: {
    value: function(failed, successful) {
      var _this = this;
      FB.ui(
        this._shareObj,
        function(response) {
          if (response !== undefined) {
            if (response === null) {
              if (failed) failed();
            } else {
              if (successful) successful();
            }
          }
        }
      );
    }
  }
});

module.exports = FacebookShareDialog;


},{}],6:[function(require,module,exports){
'use strict';
var View = require('./View.jsx');

/**
 * Basic View info for a regular ol' page
 * 
 * @param  jQuery element
 * @return void
 */
var PageView = function(element) {
  View.call(this, element);
  this._addNavEvents();
  this._addOverlayCloseEvent();
};
PageView.prototype = Object.create(View.prototype, {
  /**
   * _addOverlayCloseEvent
   * 
   * @protected
   * @return    void
   */
  _addOverlayCloseEvent: {
    value: function() {
      var _this = this;
      this._element.find('.o-background').click(
        function(event) {
        _this._element.find('.overlay').hide();
      }
      );
      this._element.find('a.closeModalCta').click(
        function(event) {
        event.preventDefault();
        _this._element.find('.overlay').hide();
      }
      );
    }
  },

  /**
   * _addNavEvents
   * 
   * @protected
   * @return    void
   */
  _addNavEvents: {
    value: function() {
      this._element.find('a.search-open').click(
        function() {
        $('html, body').animate(
          {
          scrollTop: 0
        },
        300
        );
        $('body > header').addClass('dropped');
      }
      );
      this._element.find('a.search-close').click(
        function() {
        $('body > header').removeClass('dropped');
      }
      );
    }
  },

  /**
   * _makeGaCall
   * 
   * @protected
   * @param     Array call
   * @return    void
   */
  _makeGaCall: {
    value: function(call) {
      _gaq.push(call);
    }
  },

  /**
   * trackCustomVar
   * 
   * @see    http://www.sitepoint.com/google-analytics-custom-variables/
   * @see    http://online-behavior.com/analytics/custom-variables-segmentation
   * @public
   * @param  String index
   * @param  String name
   * @param  String value
   * @param  String scope (optional)
   * @return void
   */
  trackCustomVar: {
    value: function(index, name, value, scope) {
      var call = ['_setCustomVar', index, name, value, scope];
      this._makeGaCall(call);
    }
  },

  /**
   * trackEvent
   * 
   * @see    https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
   * @public
   * @param  String category The name you supply for the group of objects you want to track.
   * @param  String action A string that is uniquely paired with each category, and commonly used to define the type of user interaction for the web object.
   * @param  String optLabel (optional) An optional string to provide additional dimensions to the event data.
   * @param  Number optValue (optional) An integer that you can use to provide numerical data about the user event.
   * @param  Boolean override (optional)
   * @return void
   */
  trackEvent: {
    value: function(category, action, optLabel, optValue, override) {
      var call = ['_trackEvent'];
      if (category !== undefined) {
        call.push(category);
      }
      if (action !== undefined) {
        call.push(action);
      }
      if (optLabel !== undefined) {
        call.push(optLabel);
      }
      if (optValue !== undefined) {
        call.push(optValue);
      }
      this._makeGaCall(call, override);
    }
  },

  /**
   * trackView
   * 
   * @public
   * @param  String path
   * @return void
   */
  trackView: {
    value: function(path) {
      var call = ['_trackPageview', path];
      this._makeGaCall(call);
    }
  }
});

module.exports = PageView;

},{"./View.jsx":7}],7:[function(require,module,exports){
'use strict';
require('../shims.js');

/**
* View constructor
* 
* @public
* @param  jQuery element
* @return void
*/
var View = function(element) {
  this._element = element;
};
Object.defineProperties(View.prototype, {
  /**
   * _element
   * 
   * @protected
   * @var       jQuery (default: null)
   */
  _element: {value: null, writable: true, configurable: true},

  /**
   * getElement
   * 
   * @public
   * @return HTMLFormElement
   */
  getElement: {
    value: function() {
      return this._element;
    }
  }
});

module.exports = View;


},{"../shims.js":3}],8:[function(require,module,exports){
var mixins = require('../functions/mixins.jsx');

var AccessibleSelect = React.createClass({
  displayName: 'AccessibleSelect',
  mixins: [mixins.linkedParentState],

  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);

    return (
      React.createElement("fieldset", null, 
        React.createElement("legend", {className: "required-legend"},  t('How accessible is this walk?') ), 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-md-6"}, 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-familyfriendly')}),  t('Family friendly') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-wheelchair')}),  t('Wheelchair accessible') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-dogs')}),  t('Dogs welcome') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-strollers')}),  t('Strollers welcome') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-bicycles')}),  t('Bicycles welcome') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-steephills')}),  t('Steep hills') )
          ), 
          React.createElement("div", {className: "col-md-6"}, 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-uneven')}),  t('Wear sensible shoes (uneven terrain)') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-busy')}),  t('Busy sidewalks') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-bicyclesonly')}),  t('Bicycles only') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-lowlight')}),  t('Low light or nighttime') ), 
            React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-seniors')}),  t('Senior Friendly') )
          )
        )
      )
    );
  }
});

module.exports = AccessibleSelect;

},{"../functions/mixins.jsx":17}],9:[function(require,module,exports){
// TODO: Make 'intiatives' build as separate selectors
var DateSelect = React.createClass({displayName: 'DateSelect',
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    var today = new Date;
    var start = new Date(
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate() + 7,
        11,
        00
      )
    );
    // Default to a 1-hour walk time
    var duration = 60 * 60 * 1000;

    // Note: we're only keeping the 'date' on there to use Date's string
    // parsing. This method is concerned only with the Time
    // TODO: Support proper time localization - ultimately these times are just
    // strings, so we're using GMT, but that's bad practice.
    return {start: start, duration: duration};
  },
  setDay: function(date) {
    var startDate = this.state.start;

    // Set the Day we're choosing
    startDate.setUTCFullYear(date.getUTCFullYear());
    startDate.setUTCMonth(date.getUTCMonth());
    startDate.setUTCDate(date.getUTCDate());

    // Refresh the timepicker
    this.refs.timePicker.setStartTimes(startDate);

    // Update our state
    // FIXME: This is an overly-complex pattern, but done to avoid frequent
    // date rebuilding, which is very slow. See if it can be done through
    // state updates instead.
    this.setState({start: startDate});
  },
  /* @param Date time The current time of day
   * @param Int duration Number of minutes the walk lasts
   */
  setTime: function(time, duration) {
    var startDate = this.state.start;

    startDate.setUTCHours(time.getUTCHours());
    startDate.setUTCMinutes(time.getUTCMinutes());

    this.setState({start: startDate});
  },
  linkTime: function() {
    var _this = this;
    return {
      value: _this.state.start.getTime(),
      requestChange: function(value) {
        _this.setState({start: new Date(Number(value))});
      }
    };
  },
  // Push the date we built here to the linked state
  addDate: function() {
    var valueLink = this.props.valueLink;
    var value = valueLink.value || {};
    var slots = (value.slots || []).slice();
    var start = this.state.start.getTime();
    var end = start + this.state.duration;

    // Store the timeslot state as seconds, not ms
    slots.push([start / 1000, end / 1000]);

    value.slots = slots;
    valueLink.requestChange(value);
  },
  render: function() {
    var valueLink = this.props.valueLink;
    var t = this.props.i18n.translate.bind(this.props.i18n);

    return (
      React.createElement("div", {className: "tab-pane", id: "time-and-date"}, 
        React.createElement("div", {className: "tab-content", id: "walkduration"}, 
          React.createElement("div", {className: "tab-pane hide", id: "time-and-date-select"}, 
            React.createElement("div", {className: "page-header", 'data-section': "time-and-date"}, 
              React.createElement("h1", null,  t('Set the Time and Date') )
            ), 
            React.createElement("legend", null,  t('Pick one of the following:') ), 
            React.createElement("div", {className: "row"}, 
              React.createElement("ul", {className: "thumbnails", id: "block-select"}, 
                React.createElement("li", null, 
                  React.createElement("a", {href: "#time-and-date-all", 'data-toggle': "tab"}, 
                    React.createElement("div", {className: "thumbnail"}, 
                      React.createElement("img", {src: CCM_THEME_PATH + '/img/time-and-date-full.png'}), 
                      React.createElement("div", {className: "caption"}, 
                        React.createElement("div", {className: "text-center"}, 
                          React.createElement("h4", null,  t('By Request') )
                        ), 
                        React.createElement("p", null,  t('Highlight times that you\'re available to lead the walk, or leave your availability open. People will be asked to contact you to set up a walk.') )
                      )
                    )
                  )
                ), 
                React.createElement("li", null, 
                  React.createElement("a", {href: "#time-and-date-set", 'data-toggle': "tab"}, 
                    React.createElement("div", {className: "thumbnail"}, 
                      React.createElement("img", {src: CCM_THEME_PATH + '/img/time-and-date-some.png'}), 
                      React.createElement("div", {className: "caption"}, 
                        React.createElement("div", {className: "text-center"}, 
                          React.createElement("h4", null,  t('Pick Your Date') )
                        ), 
                        React.createElement("p", null,  t('Set specific dates and times that this walk is happening.') )
                      )
                    )
                  )
                )
              )
            )
          ), 
          React.createElement("div", {className: "tab-pane active", id: "time-and-date-set"}, 
            React.createElement("div", {className: "page-header", 'data-section': "time-and-date"}, 
              React.createElement("h1", null,  t('Time and Date') ), 
              React.createElement("p", {className: "lead"},  t('Select the date and time your walk is happening.') )
            ), 

            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement(DatePicker, {setDay: this.setDay, defaultDate: this.state.start})
              ), 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("div", {className: "thumbnail"}, 
                  React.createElement("div", {className: "caption"}, 
                    React.createElement("h4", {className: "date-indicate-set"}, 
                      React.createElement("small", null,  t('Date selected'), ":"), 
                      this.state.start.toLocaleDateString(undefined, {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'})
                    ), 
                    React.createElement("hr", null), 
                    React.createElement(TimePicker, {ref: "timePicker", i18n: this.props.i18n, valueLinkDuration: this.linkState('duration'), valueLinkStart: this.linkTime()}), 
                    React.createElement("hr", null), 
                    React.createElement("button", {className: "btn btn-primary", id: "save-date-set", onClick: this.addDate},  t('Add Date') )
                  )
                )
              )
            ), 
            React.createElement("br", null), 
            React.createElement(TimeSetTable, {i18n: this.props.i18n, valueLink: valueLink}), 
            React.createElement("hr", null)
          ), 
          React.createElement("div", {className: "tab-pane hide", id: "time-and-date-all"}, 
            React.createElement("div", {className: "page-header", 'data-section': "time-and-date"}, 
              React.createElement("h1", null,  t('Time and Date') ), 
              React.createElement("p", {className: "lead"},  t('Your availability will be visible to people on your walk page and they’ll be able to send you a walk request.') )
            ), 
            React.createElement("label", {className: "checkbox"}, 
              React.createElement("input", {type: "checkbox", name: "open"}),  t('Leave my availability open. Allow people to contact you to set up a walk.')
            ), 
            React.createElement("br", null), 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("div", {className: "date-picker"})
              ), 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("div", {className: "thumbnail"}, 
                  React.createElement("div", {className: "caption"}, 
                    React.createElement("div", {className: "date-select-group"}, 
                      React.createElement("small", null,  t('Date selected'), ":"), 
                      React.createElement("h4", {className: "date-indicate-all"}), 
                      React.createElement("hr", null)
                    ), 
                    React.createElement("label", {htmlFor: "walk-duration"},  t('Approximate Duration of Walk'), ":"), 
                    React.createElement("select", {name: "duration", id: "walk-duration", defaultValue: "1 Hour, 30 Minutes"}, 
                      React.createElement("option", {value: "30 Minutes"}, "30 Minutes"), 
                      React.createElement("option", {value: "1 Hour"}, "1 Hour"), 
                      React.createElement("option", {value: "1 Hour, 30 Minutes"}, "1 Hour, 30 Minutes"), 
                      React.createElement("option", {value: "2 Hours"}, "2 Hours"), 
                      React.createElement("option", {value: "2 Hours, 30 Minutes"}, "2 Hours, 30 Minutes"), 
                      React.createElement("option", {value: "3 Hours"}, "3 Hours"), 
                      React.createElement("option", {value: "3 Hours, 30 Minutes"}, "3 Hours, 30 Minutes")
                    ), 
                    React.createElement("div", {className: "date-select-group"}, 
                      React.createElement("hr", null), 
                      React.createElement("button", {className: "btn btn-primary", id: "save-date-all", onClick: this.addDate},  t('Add Date') )
                    )
                  )
                )
              )
            ), 
            React.createElement("br", null), 
            React.createElement(TimeOpenTable, null), 
            React.createElement("hr", null)
          )
        )
      )
    );
  }
});

var DatePicker = React.createClass({displayName: 'DatePicker',
  componentDidMount: function() {
    // Setup sorting on the walk-stops list
    $(this.getDOMNode()).datepicker({
      defaultDate: this.props.defaultDate,
      onSelect: function(dateText) {
        this.props.setDay(new Date(dateText));
      }.bind(this)
    });
  },
  render: function() {
    return (
      React.createElement("div", {className: "date-picker"})
    );
  }
});

var TimePicker = React.createClass({displayName: 'TimePicker',
  getInitialState: function() {
    return {startTimes: []};
  },

  // Date management is slow, so avoid rebuilding unless needed
  setStartTimes: function(start, step) {
    if (this.state.start !== start) {
      // It's fastest to build our date formatter once upfront
      var dtfTime = new Intl.DateTimeFormat(undefined, {hour: 'numeric', minute: '2-digit', timeZone: 'UTC'});
      // All start times begin on the date's 0:00, and by default step every 30 min
      var yrMoDay = [start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()];
      var firstTime = Date.UTC.apply(this, yrMoDay);
      var lastTime = Date.UTC.apply(this, yrMoDay.concat([23, 30]));
      var startTimes = [];
      step = step || 1800000;

      for (var i = 0, time = firstTime;
           time <= lastTime;
           time += step) {
        startTimes.push({
          asMs: time,
          asString: dtfTime.format(time)
        });
      }

      this.setState({
        start: start,
        startTimes: startTimes
      });
    }
  },

  componentWillUpdate: function() {
  },

  componentWillMount: function() {
    this.componentWillUpdate();
    var startDate = new Date(this.props.valueLinkStart.value);
    this.setStartTimes(startDate);
  },

  render: function() {
    // Count walk times in 30 min increments
    var linkDuration = this.props.valueLinkDuration;
    var requestChange = linkDuration.requestChange;
    var linkStart = this.props.valueLinkStart;
    var t = this.props.i18n.translate.bind(this.props.i18n);

    // Cast duration as a number
    linkDuration.requestChange = function(value) {
      requestChange(Number(value));
    };

    return (
      React.createElement("div", {className: "time-picker"}, 
        React.createElement("label", {htmlFor: "walk-time"},  t('Start Time'), ":"), 
        React.createElement("select", {name: "start", id: "walk-start", valueLink: linkStart}, 
          this.state.startTimes.map(function(time, i) {
            return (
              React.createElement("option", {key: 'walk-start' + i, value: time.asMs}, 
                time.asString
              )
              );
          })
        ), 
        React.createElement("label", {htmlFor: "walk-time"},  t('Approximate Duration of Walk'), ":"), 
        React.createElement("select", {name: "duration", id: "walk-duration", valueLink: linkDuration}, 
          React.createElement("option", {value: 30 * 60000}, "30 Minutes"), 
          React.createElement("option", {value: 60 * 60000}, "1 Hour"), 
          React.createElement("option", {value: 90 * 60000}, "1 Hour, 30 Minutes"), 
          React.createElement("option", {value: 120 * 60000}, "2 Hours"), 
          React.createElement("option", {value: 150 * 60000}, "2 Hours, 30 Minutes"), 
          React.createElement("option", {value: 180 * 60000}, "3 Hours"), 
          React.createElement("option", {value: 210 * 60000}, "3 Hours, 30 Minutes")
        )
      )
    );
  }
});

var TimeSetTable = React.createClass({displayName: 'TimeSetTable',
  removeSlot: function(i) {
    var valueLink = this.props.valueLink;
    var value = valueLink.value;
    var slots = (value.slots || []).slice();

    slots.splice(i, 1);
    value.slots = slots;

    valueLink.requestChange(value);
  },
  render: function() {
    var slots = this.props.valueLink.value.slots || [];
    var t = this.props.i18n.translate.bind(this.props.i18n);
    var t2 = this.props.i18n.translatePlural.bind(this.props.i18n);

    var dtfDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'});
    var dtfDuration = new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: '2-digit', timeZone: 'UTC'});

    return (
      React.createElement("table", {className: "table table-bordered table-hover", id: "date-list-all"}, 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("th", null, t('Date')), 
            React.createElement("th", null, t('Start Time')), 
            React.createElement("th", null, t('Duration')), 
            React.createElement("th", null)
          )
        ), 
        React.createElement("tbody", null, 
          slots.map(function(slot, i) {
            var start = (new Date(slot[0] * 1000));
            var duration = (new Date((slot[1] - slot[0]) * 1000));

            var hours = duration.getUTCHours();
            var minutes = duration.getUTCMinutes();
            var durationFmt = [];
            if (hours) {
              durationFmt.push(t2('%d Hour', '%d Hours', hours));
            }
            if (minutes) {
              durationFmt.push(t2('%d Minute', '%d Minutes', minutes));
            }

            return (
              React.createElement("tr", {key: i}, 
                React.createElement("td", null, dtfDate.format(start)), 
                React.createElement("td", null, dtfDuration.format(start)), 
                React.createElement("td", null, durationFmt.join(', ')), 
                React.createElement("td", null, React.createElement("a", {onClick: this.removeSlot.bind(this, i)}, React.createElement("i", {className: "fa fa-times-circle-o"}), " ", t('Remove')))
              )
              )
          }.bind(this))
        )
      )
    );
  }
});

// TODO: Once 'open' walk schedules are implemented on festivals
var TimeOpenTable = React.createClass({displayName: 'TimeOpenTable',
  render: function() {
    return (
      React.createElement("table", null)
    );
  }
});

module.exports = DateSelect;

},{}],10:[function(require,module,exports){
var ImageUpload = React.createClass({
  displayName: 'ImageUpload',

  removeImage: function(i) {
    var thumbnails = this.props.valueLink.value;
    thumbnails.splice(i, 1);
    this.props.valueLink.requestChange(thumbnails);
  },

  handleUpload: function(e) {
    var fd = new FormData();
    var _this = this;
    
    if (e.currentTarget.files) {
      // TODO: Update to support uploading multiple files at once
      // TODO: display a spinner w/ the local file as the BG until
      // it's fully uploaded
      // Load one file
      fd.append('Filedata', e.currentTarget.files[0]);
  
      // Form validation token, generated by concrete5
      fd.append('ccm_token', this.props.valt);

      $.ajax({
        url: CCM_TOOLS_PATH + '/files/importers/quick',
        type: 'POST',
        cache: false,
        data: fd,
        processData: false,
        contentType: false,
        success: function(data, textStatus, jqXHR) {
          var thumbnails = _this.props.valueLink.value;
          thumbnails.push(data);
          _this.props.valueLink.requestChange(thumbnails);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // TODO: display error message
        }
      });
    }
  },

  render: function() {
    var thumbnails = this.props.valueLink.value;
    var t = this.props.i18n.translate.bind(this.props.i18n);
    // TODO: include an upload callback that loads the uploaded image locally,
    // instead of the one off the server
    // TODO: Implement server-side support for multiple thumbnails, then 
    // remove limit here
    return (
      React.createElement("form", {className: "upload-image"}, 
        React.createElement("label", {htmlFor: "walkphotos", id: "photo-tip"},  t('Upload a photo that best represents your walk.') ), 
        thumbnails.map(function(thumb, i) {
          // Grab just the name, so local files being uploaded have the same key as the hosted URL
          var filename = (thumb.url || '' + i).replace(/^.*[\\\/]/, '');
          return (
            React.createElement("div", {
              key: filename, 
              className: "thumbnail", 
              style: {backgroundImage: 'url(' + thumb.url + ')'}}, 
              React.createElement("a", {className: "remove", onClick: this.removeImage.bind(this, i)}, React.createElement("i", {className: "fa fa-times-circle"}))
            )
            );
        }, this), 
        (thumbnails.length < 1) ?
        React.createElement("div", {className: "thumbnail fileupload"}, 
          React.createElement("input", {className: "ccm-al-upload-single-file", type: "file", onChange: this.handleUpload}), 
          React.createElement("i", {className: "fa fa-camera-retro fa-5x"}), 
          React.createElement("span", {className: "fileupload-new"},  t('Click to upload an image') )
        ) : null
      )
    );
  }
});

module.exports = ImageUpload;

},{}],11:[function(require,module,exports){
'use strict';

var Helper = require('../functions/helpers.jsx');

var MapBuilder = React.createClass({displayName: 'MapBuilder',
  getDefaultProps: function () {
    return {
      // Map config startup defaults
      initialZoom: 15,
    };
  },

  // State for this component should only track the map editor
  getInitialState: function() {
    return {
      // The 'mode' we're in: 'addPoint', 'addRoute'
      mode: {},
      map: null,
      markers: new google.maps.MVCArray,
      route: null,
      infowindow: new google.maps.InfoWindow
    };
  },

  componentDidMount: function() {
    var _this = this,
    valueLink = this.props.valueLink,
    mapNode = this.refs.gmap.getDOMNode(),
    mapOptions = {
      center: new google.maps.LatLng(this.props.city.lat, this.props.city.lng),
      zoom: this.props.initialZoom,
      scrollwheel: false,
      rotateControl: true,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE]
      }
    },
    map = new google.maps.Map(mapNode, mapOptions),
    markers = this.state.markers,
    route = this.state.route;

    this.setState({map: map}, function() {
      // Draw the route
      if (valueLink.value) {
        valueLink.value.markers.forEach(function(marker) {
          markers.push(
            this.buildMarker(
              new google.maps.LatLng(marker.lat, marker.lng),
              {title: marker.title, description: marker.description}
            )
          );
        }.bind(this));

        route = this.buildRoute(valueLink.value.route);
      } else {
        route = this.buildRoute([]);
      }

      // Set marker/route adding
      google.maps.event.addListener(map, 'click', function(ev) {
        _this.state.infowindow.setMap(null);
        if (_this.state.mode.addRoute) {
          route.setPath(route.getPath().push(ev.latLng));
          _this.setState({route: route});
        }
      });
      // Map won't size properly on a hidden tab, so refresh on tab shown
      // FIXME: this $() selector is unbecoming of a React app
      $('a[href="#route"]').on('shown.bs.tab', function(e) {
        this.boundMapByWalk();
      }.bind(this));

      this.setState({markers: markers, route: route});
    }.bind(this));
  },

  // Make the map fit the markers in this walk
  boundMapByWalk: function() {
    // Don't include the route - it can be too expensive to compute.
    var bounds = new google.maps.LatLngBounds;
    google.maps.event.trigger(this.state.map, 'resize');
    if (this.state.markers.getLength()) {
      for (var i = 0, len = this.state.markers.getLength(); i < len; i++) {
        bounds.extend(this.state.markers.getAt(i).getPosition());
      }

      this.state.map.fitBounds(bounds);
    }
  },

  // Map parameters
  stopMarker: {
    url: CCM_THEME_PATH + '/images/marker.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(30, 46),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(11, 44)
  },
  
  // Map related functions
  // Build gmaps Marker object from base data
  // @param google.maps.LatLng latlng The position to add
  // @param Object title {title, description}
  buildMarker: function(latlng, title) {
    var marker;
    var _this = this;
    var map = this.state.map;
    var options = {
      animation: google.maps.Animation.DROP,
      draggable: true,
      style: 'stop',
      map: map,
      icon: this.stopMarker
    };

    // If we passed in a position
    if (latlng instanceof google.maps.LatLng) {
      options.position = latlng;
    } else {
      options.position = this.state.map.center;
    }

    // Set to an empty title/description object.
    // Google maps has a limited amount of marker data we 
    if (!title) {
      title = {title: '', description: ''};
    }
    options.title = JSON.stringify(title);

    marker = new google.maps.Marker(options);
    
    google.maps.event.addListener(marker, 'click', function(ev) {
      _this.showInfoWindow(this)
    });

    google.maps.event.addListener(marker, 'drag', function(ev) {
    });
    return marker;
  },

  /**
   * Show the info box for editing this marker
   *
   * @param google.maps.Marker marker
   */
  showInfoWindow: function(marker) {
    var _this = this;
    var infoDOM = document.createElement('div');

    React.render(
      React.createElement(WalkInfoWindow, {
        marker: marker, 
        deleteMarker: this.deleteMarker.bind(this, marker), 
        refresh: this.setState.bind(this, {})}
      ),
      infoDOM
    );

    // Center the marker and display its info window
    this.state.map.panTo(marker.getPosition());
    this.state.infowindow.setContent(infoDOM);
    this.state.infowindow.open(this.state.map, marker);
  },

  buildRoute: function(routeArray) {
    var map = this.state.map;

    var poly = new google.maps.Polyline({
      strokeColor: '#F16725',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      editable: true,
      map: map
    });

    // Remove vertices when right-clicked
    google.maps.event.addListener(poly, 'rightclick', function(ev) {
      // Check if we clicked a vertex
      if (ev.vertex !== undefined) {
         poly.setPath(poly.getPath().removeAt(ev.vertex));
      }
    });

    // Hide the infowindow if we click outside it
    google.maps.event.addListener(poly, 'mousedown', function(ev) {
      this.state.infowindow.setMap(null);
    }.bind(this));

    if (routeArray.length > 0) {
      poly.setPath(routeArray.map(function(point) {
        return new google.maps.LatLng(point.lat, point.lng);
      }));
    }

    return poly;
  },

  /**
   * @param google.maps.Marker marker
   */
  deleteMarker: function(marker) {
    var markers = this.state.markers;

    // Clear marker from map
    marker.setMap(null);

    // Remove reference in state
    markers.removeAt(markers.indexOf(marker));

    this.setState({markers: markers});
  },

  /**
   * Insert a marker before a reference marker. If no reference, insert at end.
   * @param google.maps.Marker marker 
   * @param google.maps.Marker referenceMarker
   */
  insertBefore: function(marker, referenceMarker) {
    var markers = this.state.markers;
    if (referenceMarker) {
      markers.insertAt(markers.getArray().indexOf(referenceMarker), marker);
    } else {
      markers.push(marker);
    }
    this.setState({markers: markers});
  },

  // Button Actions
  toggleAddPoint: function() {
    var markers = this.state.markers;
    var marker = this.buildMarker();
    markers.push(marker);
    this.setState({markers: markers, mode: {}}, function() {
      this.showInfoWindow(marker);
    }.bind(this)); 

    this.state.infowindow.setMap(null);
  },

  toggleAddRoute: function() {
    this.setState({
      mode: {
        addRoute: !this.state.mode.addRoute
      }
    });
    this.state.infowindow.setMap(null);
  },

  clearRoute: function() {
    this.state.infowindow.setMap(null);
    this.state.route.setPath([]);
    this.setState({mode: {}});
  },

  // Build a version of state appropriate for persistence
  getStateSimple: function() {
    var markers = this.state.markers.getArray().map(function(marker) {
      var titleObj = JSON.parse(marker.title);
      return {
        lat: marker.position.lat(),
        lng: marker.position.lng(),
        title: titleObj.title,
        description: titleObj.description,
        style: 'stop'
      };
    });
    var route = [];
    if (this.state.route) {
      route = this.state.route.getPath().getArray().map(function(point) {
        return {
          lat: point.lat(),
          lng: point.lng()
        };
      });
    }

    return {
      markers: markers,
      route: route
    };
  },

  render: function() {
    var walkStops;
    var t = this.props.i18n.translate.bind(this.props.i18n);

    if (this.state.markers && this.state.markers.length) {
      // This 'key' is to force the component to not rebuild
      walkStops = [
        React.createElement("h3", {key: 'stops'}, t('Walk Stops')),
        React.createElement(WalkStopTable, {
          ref: "walkStopTable", 
          key: 1, 
          i18n: this.props.i18n, 
          markers: this.state.markers, 
          deleteMarker: this.deleteMarker, 
          insertBefore: this.insertBefore, 
          showInfoWindow: this.showInfoWindow}
        )
      ];
    }
    
    return (
      React.createElement("div", {className: "tab-pane", id: "route"}, 
        React.createElement("div", {className: "page-header", 'data-section': "route"}, 
          React.createElement("h1", null,  t('Share Your Route') )
        ), 
        React.createElement("div", {className: "alert alert-info"}, 
           t('Make sure to add a description to your meeting place, and the last stop. This is how people will find you on the day of your walk.') 
        ), 
        React.createElement("div", {id: "route-help-panel"}, 
          React.createElement("a", {className: "accordion-toggle collapsed", 'data-toggle': "collapse", 'data-parent': "#route-menu", href: "#route-menu"}, 
            React.createElement("h2", {className: "lead"},  t('Need help building your route?') )
          ), 
          React.createElement("ol", {id: "route-menu", className: "collapse", style: {height: 0}}, 
            React.createElement("li", null, 
              React.createElement("h4", null,  t('Set a Meeting Place') ), 
              React.createElement("ol", null, 
                React.createElement("li", null,  t('Click "Meeting Place" to add a pinpoint on the map') ), 
                React.createElement("li", null,  t('Click and drag it into position') ), 
                React.createElement("li", null,  t('Fill out the form fields and press Save Meeting Place') )
              )
            ), 
            React.createElement("li", null, 
              React.createElement("h4", null,  t('Add Stops') ), 
              React.createElement("ol", null, 
                React.createElement("li", null,  t('Click "Add Stop" to add a stop on the map') ), 
                React.createElement("li", null,  t('Click and drag it into position') ), 
                React.createElement("li", null,  t('Fill out the form fields and press Save Stop') ), 
                React.createElement("li", null,  t('Repeat to add more stops') )
              )
            ), 
            React.createElement("li", null, 
              React.createElement("h4", null,  t('Add Route') ), 
              React.createElement("ol", null, 
                React.createElement("li", null,  t('Click Add Route') ), 
                React.createElement("li", null,  t('A point will appear on your meeting place, now click on each of the stops that flow to connect them.') ), 
                React.createElement("li", null,  t('Click and drag the circles on the orange lines to make the path between each stop. Right click on a point to delete it.') ), 
                React.createElement("li", null,  t('Click Save Route') )
              ), 
              React.createElement("p", null, 
                 t('If you want to delete your route to start over, click '), 
                React.createElement("a", {href: "", className: "clear-route"},  t('Clear Route') ), ".", 
                 t('Your Stops will not be deleted') 
              )
            )
          )
        ), 
        React.createElement("div", {id: "map-control-bar"}, 
          React.createElement("button", {
            ref: "addPoint", 
            className: (this.state.mode.addPoint) ? 'active' : '', 
            onClick: this.toggleAddPoint}, 
            React.createElement("i", {className: "fa fa-map-marker"}),  t('Add Stop') 
          ), 
          React.createElement("button", {
            ref: "addRoute", 
            className: (this.state.mode.addRoute) ? 'active' : '', 
            onClick: this.toggleAddRoute}, 
            React.createElement("i", {className: "fa fa-arrows"}),  t('Add Route') 
          ), 
          React.createElement("button", {ref: "clearroute", onClick: this.clearRoute}, 
            React.createElement("i", {className: "fa fa-eraser"}),  t('Clear Route') 
          )
        ), 
        React.createElement("div", {className: "map-notifications"}), 
        React.createElement("div", {id: "map-canvas", ref: "gmap"}), 
        walkStops, 
        React.createElement("hr", null)
      )
    );
  }
});

var WalkStopTable = React.createClass({displayName: 'WalkStopTable',
  componentDidMount: function() {
    // Setup sorting on the walk-stops list
    $(this.getDOMNode()).sortable({
      items: 'tbody tr',
      update: function(event, ui) {
        this.props.insertBefore(
          this.state.markers.getAt(ui.item.data('position')),
          this.state.markers.getAt(ui.item.index())
        );
      }.bind(this)
    });
  },
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      React.createElement("table", {ref: "routeStops", className: "table table-bordered table-hover"}, 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("th", null,  t('Title') ), 
            React.createElement("th", null,  t('Description') ), 
            React.createElement("th", null, React.createElement("i", {className: "fa fa-trash-o"}))
          )
        ), 
        React.createElement("tbody", null, 
          this.props.markers.getArray().map(function(marker, i) {
            var titleObj = JSON.parse(marker.title);
            var showInfoWindow = function() {
              this.props.showInfoWindow(marker);
            }.bind(this);
            var deleteMarker = function() {
              this.props.deleteMarker(marker);
            }.bind(this);
            return (
              React.createElement("tr", {'data-position': i, key: 'marker' + i}, 
                React.createElement("td", {onClick: showInfoWindow}, titleObj.title), 
                React.createElement("td", {onClick: showInfoWindow}, titleObj.description), 
                React.createElement("td", null, 
                  React.createElement("a", {className: "delete-stop", onClick: deleteMarker}, 
                    React.createElement("i", {className: "fa fa-times-circle-o"})
                  )
                )
              )
              );
          }.bind(this))
        )
      )
    );
  }
});

var WalkInfoWindow = React.createClass({displayName: 'WalkInfoWindow',
  getInitialState: function() {
    return {
      marker: null
    };
  },
  componentWillMount: function() {
    this.setState({
      marker: this.props.marker
    });
  },
  setMarkerContent: function(ev) {
    var marker = this.state.marker;
    var markerContent = JSON.parse(marker.getTitle());
    if (ev.target.classList.contains('marker-title')) {
      markerContent.title = ev.target.value;
    } else if (ev.target.classList.contains('marker-description')) {
      markerContent.description = ev.target.value;
    }
    marker.setTitle(JSON.stringify(markerContent));
    this.setState({marker: marker});
    this.props.refresh();
  },
  render: function() {
    var marker = this.state.marker;
    var markerContent = JSON.parse(marker.getTitle());

    return (
      React.createElement("div", {className: "stop-form"}, 
        React.createElement("input", {
          type: "text", 
          onChange: this.setMarkerContent, 
          value: markerContent.title, 
          placeholder: "Title of this stop", 
          className: "marker-title"}
        ), 
        React.createElement("textarea", {
          className: "marker-description box-sizing", 
          onChange: this.setMarkerContent, 
          placeholder: "Description of this stop", 
          value: markerContent.description}
        ), 
        React.createElement("a", {onClick: this.props.deleteMarker}, 
          React.createElement("i", {className: "fa fa-trash-o"})
        )
      )
    );
  }
});

module.exports = MapBuilder;

},{"../functions/helpers.jsx":16}],12:[function(require,module,exports){
var mixins = require('../functions/mixins.jsx');

var TeamBuilder = React.createClass({
  displayName: 'TeamBuilder',

  mixins: [mixins.linkedParentState],

  handleTeamMemberChange: function(propname, memberValue, id) {
    var valueLink = this.props.valueLink;
    var value = valueLink.value;
    value[id][propname] = memberValue;
    valueLink.requestChange(value);
  },
  addLeader: function() {
    var valueLink = this.props.valueLink;
    var team = valueLink.value;
    team.push({type: 'leader', "name-first":'', "name-last":'', bio: '', primary: '', twitter: '', facebook: '', website: '', email: '', phone: ''});
    valueLink.requestChange(team);
  },
  addOrganizer: function() {
    var valueLink = this.props.valueLink;
    var team = valueLink.value;
    team.push({type: 'organizer', "name-first":'', "name-last":'', institution: '', website: ''});
    valueLink.requestChange(team);
  },
  addCommunityVoice: function() {
    var valueLink = this.props.valueLink;
    var team = valueLink.value;
    team.push({type: 'community', "name-first":'', "name-last":'', bio: '', twitter: '', facebook: '', website: ''});
    valueLink.requestChange(team);
  },
  addVolunteer: function() {
    var valueLink = this.props.valueLink;
    var team = valueLink.value;
    team.push({type: 'volunteer', "name-first":'', "name-last":'', role: '', website: ''});
    valueLink.requestChange(team);
  },
  // Set the member at that specific index
  render: function() {
    // If there's no 'you', create one as the current user
    var valueLink = this.props.valueLink;
    var value = valueLink.value;
    var t = this.props.i18n.translate.bind(this.props.i18n);
    
    // Loop through all the users and render the appropriate user type
    var users = value.map(function(user, i) {
      // Use empty strings for unset/false
      user.phone = user.phone || '';
      if (user.type === 'you') {
        return React.createElement(TeamOwner, {i18n: this.props.i18n, key: i, value: user, onChange: this.handleTeamMemberChange});
      } else if (user.type === 'leader') {
        return React.createElement(TeamLeader, {i18n: this.props.i18n, key: i, value: user, onChange: this.handleTeamMemberChange});
      } else if (user.type === 'organizer') {
        return React.createElement(TeamOrganizer, {i18n: this.props.i18n, key: i, value: user, onChange: this.handleTeamMemberChange});
      } else if (user.type === 'community') {
        return React.createElement(TeamCommunityVoice, {i18n: this.props.i18n, key: i, value: user, onChange: this.handleTeamMemberChange});
      } else if (user.type === 'volunteer') {
        return React.createElement(TeamVolunteer, {i18n: this.props.i18n, key: i, value: user, onChange: this.handleTeamMemberChange});
      }
    }, this);

    return (
      React.createElement("div", {className: "tab-pane", id: "team"}, 
        React.createElement("div", {className: "page-header", 'data-section': "team"}, 
          React.createElement("h1", null,  t('Build Your Team') )
        ), 
        users, 
        React.createElement("div", {className: "thumbnail team-member", id: "add-member"}, 
          React.createElement("h2", null,  t('Who else is involved with this walk?') ), 
          React.createElement("h3", {className: "lead"},  t('Click to add team members to your walk'), " (",  t('Optional'), ")"), 
          React.createElement("div", {className: "team-set"}, 
            React.createElement("div", {className: "team-row"}, 
              React.createElement("section", {className: "new-member", id: "new-walkleader", title: "Add New Walk Leader", onClick: this.addLeader}, 
                React.createElement("div", {className: "icon"}), 
                React.createElement("h4", {className: "title text-center"},  t('Walk Leader') ), 
                React.createElement("p", null,  t('A person presenting information, telling stories, and fostering discussion during the Jane\'s Walk.') )
              ), 
              React.createElement("section", {className: "new-member", id: "new-walkorganizer", title: "Add New Walk Organizer", onClick: this.addOrganizer}, 
                React.createElement("div", {className: "icon"}), 
                React.createElement("h4", {className: "title text-center"},  t('Walk Organizer') ), 
                React.createElement("p", null,  t('A person responsible for outreach to new and returning Walk Leaders and Community Voices.') )
              )
            ), 
            React.createElement("div", {className: "team-row"}, 
              React.createElement("section", {className: "new-member", id: "new-communityvoice", title: "Add A Community Voice", onClick: this.addCommunityVoice}, 
                React.createElement("div", {className: "icon"}), 
                React.createElement("h4", {className: "title text-center"},  t('Community Voice') ), 
                React.createElement("p", null,  t('A community member with stories and/or personal experiences to share.') )
              ), 
              React.createElement("section", {className: "new-member", id: "new-othermember", title: "Add another helper to your walk", onClick: this.addVolunteer}, 
                React.createElement("div", {className: "icon"}), 
                React.createElement("h4", {className: "title text-center"},  t('Volunteers') ), 
                React.createElement("p", null,  t('Other people who are helping to make your walk happen.') )
              )
            )
          )
        )
      )
    );
  }
});


var TeamOwner = React.createClass({displayName: 'TeamOwner',
  mixins: [mixins.linkedTeamMemberState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      React.createElement("div", {className: "team-member thumbnail useredited", id: "walk-leader-me"}, 
        React.createElement("fieldset", null, 
          React.createElement("legend", null,  t('You') ), 
          React.createElement("div", {className: "row", id: "walkleader"}, 
            React.createElement("div", {className: "item required"}, 
              React.createElement("label", {htmlFor: "name"},  t('Name') ), 
              React.createElement("input", {type: "text", id: "name", placeholder: "First", valueLink: this.linkProp('name-first')}), 
              React.createElement("input", {type: "text", id: "name", placeholder: "Last", valueLink: this.linkProp('name-last')})
            ), 

            React.createElement("div", {className: "item required"}, 
              React.createElement("label", {htmlFor: "role"},  t('Role') ), 
              React.createElement("select", {id: "role", valueLink: this.linkProp('role')}, 
                React.createElement("option", {defaultValue: "walk-leader"},  t('Walk Leader') ), 
                React.createElement("option", {defaultValue: "co-walk-leader"},  t('Co-Walk Leader') ), 
                React.createElement("option", {defaultValue: "walk-organizer"},  t('Walk Organizer') )
              )
            ), 
            React.createElement("div", {className: "item hide", id: "primary-walkleader-select"}, 
              React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", className: "role-check", checkLink: this.linkProp('primary')}),  t('Primary Walk Leader') )
            ), 
            React.createElement("div", {className: "item required"}, 
              React.createElement("label", {htmlFor: "bio"},  t('Introduce yourself') ), 
              React.createElement("div", {className: "alert alert-info"}, 
                 t('We recommend keeping your bio under 60 words')
              ), 
              React.createElement("textarea", {id: "bio", rows: "6", valueLink: this.linkProp('bio')})
            ), 

            React.createElement("div", {className: "row", id: "newwalkleader"}, 
              React.createElement("div", {className: "col-md-6 required"}, 
                React.createElement("label", {htmlFor: "you-email"}, React.createElement("i", {className: "fa fa-envelope"}), " ", t('Email')), 
                React.createElement("input", {type: "email", id: "you-email", placeholder: "", valueLink: this.linkProp('email')})
              ), 

              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("label", {htmlFor: "leader-twitter"}, React.createElement("i", {className: "fa fa-twitter"}), " Twitter"), 
                React.createElement("div", {className: "input-group"}, 
                  React.createElement("span", {className: "input-group-addon"}, "@"), 
                  React.createElement("input", {className: "col-md-12", id: "leader-twitter", type: "text", placeholder: "Username", valueLink: this.linkProp('twitter')})
                )
              )
            ), 

            React.createElement("div", {className: "row", id: "newwalkleader"}, 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("label", {htmlFor: "facebook"}, React.createElement("i", {className: "fa fa-facebook-square"}), " Facebook"), 
                React.createElement("input", {type: "text", id: "facebook", placeholder: "", valueLink: this.linkProp('facebook')})
              ), 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("label", {htmlFor: "website"}, React.createElement("i", {className: "fa fa-link"}), " ", t('Website')), 
                React.createElement("input", {type: "text", id: "website", placeholder: "", valueLink: this.linkProp('website')})
              )
            ), 
            React.createElement("hr", null), 
            React.createElement("div", {className: "private"}, 
              React.createElement("h4", null,  t('We\'ll keep this part private') ), 
              React.createElement("div", {className: "alert alert-info"}, 
                 t('We\'ll use this information to contact you about your walk submission. We wont share this information with 3rd parties.')
              ), 
              React.createElement("div", {className: "row", id: "newwalkleader"}, 
                React.createElement("div", {className: "col-md-6 tel required"}, 
                  React.createElement("label", {htmlFor: "phone"}, React.createElement("i", {className: "fa fa-phone-square"}),  t('Phone Number') ), 
                  React.createElement("input", {type: "tel", maxLength: "18", id: "phone", placeholder: "", valueLink: this.linkProp('phone')})
                )
              )
            )
          )
        )
      )
    );
  }
});

var TeamLeader = React.createClass({displayName: 'TeamLeader',
  mixins: [mixins.linkedTeamMemberState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      React.createElement("div", {className: "thumbnail team-member walk-leader clearfix", id: "walk-leader-new"}, 
        React.createElement("fieldset", null, 
          React.createElement("legend", null,  t('Walk Leader') ), 
          React.createElement("div", {id: "walkleader"}, 
            React.createElement("div", {className: "item required"}, 
              React.createElement("label", {htmlFor: "name"},  t('Name') ), 
              React.createElement("div", {className: "item"}, 
                React.createElement("form", {className: "form-inline"}, 
                  React.createElement("input", {type: "text", id: "name", placeholder: "First", valueLink: this.linkProp('name-first')}), 
                  React.createElement("input", {type: "text", id: "name", placeholder: "Last", valueLink: this.linkProp('name-last')})
                )
              )
            ), 
            React.createElement("div", {className: "item", id: "primary-walkleader-select"}, 
              React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", className: "role-check", valueLink: this.linkProp('primary')}),  t('Primary Walk Leader') )
            ), 
            React.createElement("div", {className: "item required"}, 
              React.createElement("label", {htmlFor: "bio"},  t('Introduce the walk leader') ), 
              React.createElement("div", {className: "alert alert-info"}, 
                 t('We recommend keeping the bio under 60 words')
              ), 
              React.createElement("textarea", {className: "col-md-12", id: "bio", rows: "6", valueLink: this.linkProp('bio')})
            ), 
            React.createElement("div", {className: "row", id: "newwalkleader"}, 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("label", {htmlFor: "prependedInput"}, React.createElement("i", {className: "fa fa-twitter"}), " Twitter"), 
                React.createElement("div", {className: "input-prepend"}, 
                  React.createElement("span", {className: "add-on"}, "@"), 
                  React.createElement("input", {id: "prependedInput", className: "col-md-12", type: "text", placeholder: "Username", valueLink: this.linkProp('twitter')})
                )
              ), 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("label", {htmlFor: "facebook"}, React.createElement("i", {className: "fa fa-facebook-square"}), " Facebook"), 
                React.createElement("input", {type: "text", id: "facebook", placeholder: "", valueLink: this.linkProp('facebook')})
              )
            ), 
            React.createElement("div", {className: "row", id: "newwalkleader"}, 
              React.createElement("div", {className: "col-md-6"}, 
                React.createElement("label", {htmlFor: "website"}, React.createElement("i", {className: "fa fa-link"}),  t('Website') ), 
                React.createElement("input", {type: "text", id: "website", placeholder: "", valueLink: this.linkProp('website')})
              )
            ), 
            React.createElement("hr", null), 
            React.createElement("h4", null,  t('Private') ), 
            React.createElement("div", {className: "alert alert-info"}, 
               t('We\'ll use this information to contact you about your walk submission. We wont share this information with 3rd parties.') 
            ), 
            React.createElement("div", {className: "row", id: "newwalkleader"}, 
              React.createElement("div", {className: "col-md-6 required"}, 
                React.createElement("label", {htmlFor: "email"}, React.createElement("i", {className: "fa fa-envelope"}),  t('Email') ), 
                React.createElement("input", {type: "email", id: "email", placeholder: "Email", valueLink: this.linkProp('email')})
              ), 
              React.createElement("div", {className: "col-md-6 tel"}, 
                React.createElement("label", {htmlFor: "phone"}, React.createElement("i", {className: "fa fa-phone-square"}),  t('Phone Number') ), 
                React.createElement("input", {type: "tel", maxLength: "16", id: "phone", placeholder: "", valueLink: this.linkProp('phone')})
              )
            )
          )
        ), 
        React.createElement("footer", null, 
          React.createElement("button", {className: "btn remove-team-member"},  t('Remove Team Member') )
        )
      )
    )
  }
});

var TeamOrganizer = React.createClass({displayName: 'TeamOrganizer',
  mixins: [mixins.linkedTeamMemberState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      React.createElement("div", {className: "thumbnail team-member walk-organizer", id: "walk-organizer-new"}, 
        React.createElement("fieldset", null, 
          React.createElement("legend", null,  t('Walk Organizer') ), 
          React.createElement("div", {className: "row", id: "walkleader"}, 
            React.createElement("div", {className: "col-md-9"}, 
              React.createElement("div", {className: "item required"}, 
                React.createElement("label", {htmlFor: "name"},  t('Name') ), 
                React.createElement("form", {className: "form-inline"}, 
                  React.createElement("input", {type: "text", id: "name", placeholder: "First", valueLink: this.linkProp('name-first')}), 
                  React.createElement("input", {type: "text", id: "name", placeholder: "Last", valueLink: this.linkProp('name-last')})
                )
              ), 
              React.createElement("label", {htmlFor: "affiliation"},  t('Affilated Institution'), " (",  t('Optional'), ")"), 
              React.createElement("input", {type: "text", id: "name", placeholder: "e.g. City of Toronto", valueLink: this.linkProp('institution')}), 
              React.createElement("div", {className: "row", id: "newwalkleader"}, 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("label", {htmlFor: "website"}, React.createElement("i", {className: "fa fa-link"}),  t('Website') ), 
                  React.createElement("input", {type: "text", className: "col-md-12", id: "website", placeholder: "", valueLink: this.linkProp('website')})
                )
              )
            )
          )
        ), 
        React.createElement("footer", null, 
          React.createElement("button", {className: "btn remove-team-member"},  t('Remove Team Member') )
        )
      )
    )
  }
});

var TeamCommunityVoice = React.createClass({displayName: 'TeamCommunityVoice',
  mixins: [mixins.linkedTeamMemberState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      React.createElement("div", {className: "thumbnail team-member community-voice", id: "community-voice-new"}, 
        React.createElement("fieldset", null, 
          React.createElement("legend", {id: "community-voice"},  t('Community Voice') ), 
          React.createElement("div", {className: "row", id: "walkleader"}, 
            React.createElement("div", {className: "col-md-9"}, 
              React.createElement("div", {className: "item required"}, 
                React.createElement("label", {htmlFor: "name"},  t('Name') ), 
                React.createElement("form", {className: "form-inline"}, 
                  React.createElement("input", {type: "text", id: "name", placeholder: "First", valueLink: this.linkProp('name-first')}), 
                  React.createElement("input", {type: "text", id: "name", placeholder: "Last", valueLink: this.linkProp('name-last')})
                )
              ), 
              React.createElement("div", {className: "item"}, 
                React.createElement("label", {htmlFor: "bio"},  t('Tell everyone about this person') ), 
                React.createElement("div", {className: "alert alert-info"}, 
                   t('We recommend keeping the bio under 60 words')
                ), 
                React.createElement("textarea", {className: "col-md-12", id: "bio", rows: "6", valueLink: this.linkProp('bio')})
              ), 
              React.createElement("div", {className: "row", id: "newwalkleader"}, 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("label", {htmlFor: "prependedInput"}, React.createElement("i", {className: "fa fa-twitter"}), " Twitter"), 
                  React.createElement("div", {className: "input-prepend"}, 
                    React.createElement("span", {className: "add-on"}, "@"), 
                    React.createElement("input", {className: "col-md-12", id: "prependedInput", type: "text", placeholder: "Username", valueLink: this.linkProp('twitter')})
                  )
                ), 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("label", {htmlFor: "facebook"}, React.createElement("i", {className: "fa fa-facebook-square"}), " Facebook"), 
                  React.createElement("input", {type: "text", id: "facebook", placeholder: "", valueLink: this.linkProp('facebook')})
                )
              ), 
              React.createElement("div", {className: "row", id: "newwalkleader"}, 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("label", {htmlFor: "website"}, React.createElement("i", {className: "fa fa-link"}),  t('Website') ), 
                  React.createElement("input", {type: "text", className: "col-md-12", id: "website", placeholder: "", valueLink: this.linkProp('website')})
                )
              )
            )
          )
        ), 
        React.createElement("footer", null, 
          React.createElement("button", {className: "btn remove-team-member"},  t('Remove Team Member') )
        )
      )
    )
  }
});

var TeamVolunteer = React.createClass({displayName: 'TeamVolunteer',
  mixins: [mixins.linkedTeamMemberState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    return (
      React.createElement("div", {className: "thumbnail team-member othermember", id: "othermember-new"}, 
        React.createElement("fieldset", null, 
          React.createElement("legend", {id: "othermember"},  t('Volunteers') ), 
          React.createElement("div", {className: "row", id: "walkleader"}, 
            React.createElement("div", {className: "col-md-9"}, 
              React.createElement("div", {className: "item required"}, 
                React.createElement("label", {htmlFor: "name"},  t('Name') ), 
                React.createElement("form", {className: "form-inline"}, 
                  React.createElement("input", {type: "text", id: "name", placeholder: "First", valueLink: this.linkProp('name-first')}), 
                  React.createElement("input", {type: "text", id: "name", placeholder: "Last", valueLink: this.linkProp('name-last')})
                )
              ), 

              React.createElement("div", {className: "item required"}, 
                React.createElement("label", {htmlFor: "role"},  t('Role') ), 
                React.createElement("input", {type: "text", id: "role", valueLink: this.linkProp('role')})
              ), 

              React.createElement("div", {className: "row", id: "newwalkleader"}, 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("label", {htmlFor: "website"}, React.createElement("i", {className: "fa fa-link"}),  t('Website') ), 
                  React.createElement("input", {type: "text", className: "col-md-12", id: "website", placeholder: "", valueLink: this.linkProp('website')})
                )
              )

            )
          )
        ), 
        React.createElement("footer", null, 
          React.createElement("button", {className: "btn remove-othermember"},  t('Remove Team Member') )
        )
      )
    )
  }
});

module.exports = TeamBuilder;

},{"../functions/mixins.jsx":17}],13:[function(require,module,exports){
var mixins = require('../functions/mixins.jsx');

var ThemeSelect = React.createClass({displayName: 'ThemeSelect',
  mixins: [mixins.linkedParentState],
 
  getInitialState: function() {
    return {
      maxChecked: 3,
      totalChecked: 0
    };
  },

  getDefaultProps: function() {
    return {
      // Using array for themes to enforce order
      themeCategories: [{
        name: 'Community',
        themes: [{
          id: 'theme-civic-activist',
          name: 'Activism'
        }, {
          id: 'theme-civic-truecitizen',
          name: 'Citizenry'
        }, {
          id: 'theme-civic-goodneighbour',
          name: 'Community'
        }, {
          id: 'theme-culture-writer',
          name: 'Storytelling'
        }]
      }, {
        name: 'City-building',
        themes: [{
          id: 'theme-urban-architecturalenthusiast',
          name: 'Architecture'
        }, {
          id: 'theme-culture-aesthete',
          name: 'Design'
        }, {
          id: 'theme-urban-suburbanexplorer',
          name: 'Suburbs'
        }, {
          id: 'theme-urban-moversandshakers',
          name: 'Transportation'
        }]
      }, {
        name: 'Society',
        themes: [{
          id: 'theme-civic-gender',
          name: 'Gender'
        }, {
          id: 'theme-civic-health',
          name: 'Health'
        }, {
          id: 'theme-culture-historybuff',
          name: 'Heritage'
        }, {
          id: 'theme-civic-nativeissues',
          name: 'Native Issues'
        }, {
          id: 'theme-civic-religion',
          name: 'Religion'
        }]
      }, {
        name: 'Expression',
        themes: [{
          id: 'theme-culture-artist',
          name: 'Art'
        }, {
          id: 'theme-urban-film',
          name: 'Film'
        }, {
          id: 'theme-culture-bookworm',
          name: 'Literature'
        }, {
          id: 'theme-urban-music',
          name: 'Music'
        }, {
          id: 'theme-urban-play',
          name: 'Play'
        }]
      }, {
        name: 'The Natural World',
        themes: [{
          id: 'theme-nature-petlover',
          name: 'Animals'
        }, {
          id: 'theme-nature-greenthumb',
          name: 'Gardening'
        }, {
          id: 'theme-nature-naturelover',
          name: 'Nature'
        }, {
          id: 'theme-urban-water',
          name: 'Water'
        }]
      }, {
        name: 'Modernity',
        themes: [{
          id: 'theme-civic-international',
          name: 'International Issues'
        }, {
          id: 'theme-civic-military',
          name: 'Military'
        }, {
          id: 'theme-civic-commerce',
          name: 'Commerce'
        }, {
          id: 'theme-culture-nightowl',
          name: 'Night Life'
        }, {
          id: 'theme-culture-techie',
          name: 'Technology'
        }, {
          id: 'theme-urban-sports',
          name: 'Sports'
        }, {
          id: 'theme-culture-foodie',
          name: 'Food'
        }]
      }]
    };
  },

  render: function() {
    var _this = this;
    var totalChecked = 0;
    var checkboxes = this.props.valueLink.value;
    var t = this.props.i18n.translate.bind(this.props.i18n);

    for (var i in checkboxes) {
      if (checkboxes[i] && i.substring(0, 6) === 'theme-') {
        totalChecked++;
      }
    }

    // TODO: Don't select themes for NYC
    return (
      React.createElement("fieldset", {id: "theme-select"}, 
        React.createElement("legend", {className: "required-legend"},  t('Themes') ), 
        React.createElement("div", {className: "alert alert-info"}, 
           t('Pick between %d and %d boxes.', 1, this.state.maxChecked) 
        ), 
         this.props.themeCategories.map(function(category) {
          return (
            React.createElement("fieldset", {key: category.name}, 
              React.createElement("legend", null, t(category.name)), 
              category.themes.map(function(theme) {
                // Don't let a checkbox be checked if it pushes over limit
                var disabled = (totalChecked >= _this.state.maxChecked) && !checkboxes[theme.id];
                return (
                  React.createElement("label", {key: theme.id, className: "checkbox"}, 
                    React.createElement("input", {type: "checkbox", disabled: disabled, checkedLink: _this.linkParentState(theme.id)}), 
                    t(theme.name)
                  )
                  );
              })
            )
            );
          })
        
      )
    );
  }
});

module.exports = ThemeSelect;

},{"../functions/mixins.jsx":17}],14:[function(require,module,exports){
var mixins = require('../functions/mixins.jsx');

var WardSelect = React.createClass({displayName: 'WardSelect',
  mixins: [mixins.linkedParentState],
  render: function() {
    var t = this.props.i18n.translate.bind(this.props.i18n);
    var wards = this.props.wards;
    if (wards && this.props.valueLink) {
      return (
        React.createElement("fieldset", {id: "wards"}, 
          React.createElement("legend", null,  t('Sub-locality') ), 
          React.createElement("div", {className: "item"}, 
            React.createElement("div", {className: "alert alert-info"},  t('Choose a specific neighbourhood or area where your walk will take place.') ), 
            React.createElement("select", {id: "ward", name: "ward", valueLink: this.props.valueLink}, 
              React.createElement("option", {value: ""}, "Choose a region"), 
              wards.map(function(e, i) { return React.createElement("option", {key: i, value: e.value}, e.value); })
            )
          )
        )
      );
    } else {
      return (
        React.createElement("fieldset", {id: "wards"})
      );
    }
  }
});

module.exports = WardSelect;

},{"../functions/mixins.jsx":17}],15:[function(require,module,exports){
/**
 * WalkMap
 * constructor
 *
 * @param object mapData Input data with {route, markers}
 * @param object DOMElement mapCanvas Target to render the map to
 *
 */
var WalkMap = function(mapData, mapCanvas) {
  // Default to #map-canvas
  this.mapCanvas = mapCanvas;

  // Initialize the map on our canvas
  this.map = new google.maps.Map(mapCanvas, this.mapOptions);

  // Load markers and build as google.maps.Marker
  this.markers = this.buildMarkers(this.buildArray(mapData.markers));
  this.route = this.buildRoute(this.buildArray(mapData.route));

  // Style Map
  this.map.mapTypes.set('map_style', this.styledMap);
  this.map.setMapTypeId('map_style');
  // TODO: Replace hard-coded selectors with ReactJS
  document.querySelector('.walk-stops').style.display = 'block';

  // Center our map after first building it
  this.centerMap();

  // Make the text menu with walk stops linked to the map
  this.addWalkStopMenuEvents();
};

Object.defineProperties(WalkMap.prototype, {
  /* @prop Array Markers on the map */
  markers: {
    value: [],
    writable : true
  },

  /* @prop Array Route the map follows */
  route: {
    value: [],
    writable: true
  },

  /* @prop DOMElement Canvas we'll render to */
  mapCanvas: {
    value: null,
    writable: true
  },

  /* @prop DOMElement of the list of stops you can select */
  stopList: {
    value: null,
    writable: true
  },

  // Static map display options
  mapOptions: {
    value: {
      zoom: 16,
      scrollwheel: false,
      zoomControl: true,
      disableDefaultUI: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    }
  },

  /**
   * styledMap
   * The very verbose styling information for this map
   *
   * @type      StyledMapType
   * @protected
   */
  styledMap: {
    value: new google.maps.StyledMapType(
      [{
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#ffffff" }
      ]
    },{
      "featureType": "road.arterial",
      "elementType": "labels.text.stroke",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
        { "visibility": "on" },
        { "saturation": -100 }
      ]
    },{
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [
        { "saturation": -100 }
      ]
    },{
      "featureType": "landscape.natural",
      "stylers": [
        { "saturation": -100 },
        { "lightness": 36 }
      ]
    },{
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        { "visibility": "on" },
        { "saturation": 37 }
      ]
    },{
      "featureType": "landscape.man_made",
      "stylers": [
        { "saturation": -100 }
      ]
    }],
    {
      name: "Styled Map"
    }),
    writable: false,
    enumerable: true,
    configurable: true
  },

  // Map Markers
  mapMarker: {value: new google.maps.MarkerImage(CCM_THEME_PATH + '/images/marker.png')},
  mapMarkerActive: {value: new google.maps.MarkerImage(CCM_THEME_PATH + '/images/marker-active.png')},

  // google map object
  map: {
    value: null, 
    writable: true
  },

  // Path of the walk
  walkPath: {
    value: {},
    writable: true
  },

  // The information in the window that pops up
  // TODO: remove this InfoBox and use React w/ InfoWindow
  infobox: {
    value: new InfoBox({
      content: document.getElementById('infobox'),
      maxWidth: 150,
      pixelOffset: new google.maps.Size(-3, -25),
      alignBottom: true,
      boxStyle: {
        background: '#fff',
        width: '280px',
        padding: '10px',
        border: '1px solid #eee',
      },
      closeBoxMargin: '-22px -22px 2px -8px',
      closeBoxURL: CCM_THEME_PATH + '/images/map-close.png',
      infoBoxClearance: new google.maps.Size(20, 20)
    })
  },

  // @param Function Pop up the info box
  showInfoBox: {
    value: function(marker, i, markerContent) {
      // Set active icon + menu to active, others inactive
      this.markers.forEach(function(mk) {
        if (mk === marker) {
          marker.setIcon(this.mapMarkerActive);
          this.selectWalkStopMenuItem(i);
        } else {
          mk.setIcon(this.mapMarker);
        }
      }.bind(this));

      this.map.panTo(marker.getPosition());

      // FIXME: is there a smarter way to hold both a name and description in
      // the title? We were using a separate array to store them before, which
      // is even worse, but JSON encoding the title is weird. gmaps won't let 
      // it be anything but a string.
      this.infobox.setContent(React.renderToStaticMarkup(
        React.createElement("span", null, 
          React.createElement("h4", null, 
            JSON.parse(this.markers[i].getTitle()).name
          ), 
          React.createElement("p", null, 
            JSON.parse(this.markers[i].getTitle()).description
          ), 
          markerContent
        )
      ));
      this.infobox.open(this.map, marker);

      [].forEach.call(document.querySelectorAll('.walk-stops'), function(stop) {
        if (stop.dataset.key == i) {
          stop.classList.add('active');
        } else {
          stop.classList.remove('active');
        }
      });
    }
  },

  /**
   * Data-loading methods
   */
  /**
   * The old JSON had objects used in many places where arrays made more sense
   * This method is for backwards-compatibility to ensure old walks still load
   * @param (Array|Object) collection Either an array or a number-mapped object
   */
  buildArray: {
    value: function(collection) {
      // Check if it's already an array, and if not it's an obj
      if (Array.isArray(collection)) {
        return collection.slice();
      } else {
        var newArray = [];
        for (var i in collection) {
          newArray[i] = collection[i];
        }
        return newArray;
      }
    }
  },

  // Build you google markers
  // @param Array markers of [{lat, lng}]
  // @return Array [google.maps.Marker]
  buildMarkers: {
    value: function(markers) {
      return markers.map(function(marker, i) {
        var _this = this;
        var gMarker = new google.maps.Marker({
          position: new google.maps.LatLng(marker.lat, marker.lng),
          map: this.map,
          icon: this.mapMarker,
          title: JSON.stringify({
            name: marker.title,
            description: marker.description
          }),
          id: i
        });

        google.maps.event.addListener(gMarker, 'click', function(ev) {
          _this.showInfoBox(this, i)
        });

        return gMarker;
      }.bind(this));
    }
  },

  // Build your google path
  // @param Array route points [{lat, lng}]
  // @return google.maps.PolyLine
  buildRoute: {
    value: function(route) {
      // Draw the path based on the route
      var walkPath = new google.maps.Polyline({
        path: route.map(function(rp) {
          return new google.maps.LatLng(rp.lat, rp.lng);
        }),
        strokeColor: '#F16725',
        strokeOpacity: 0.8,
        strokeWeight: 4 
      });

      walkPath.setMap(this.map);

      return walkPath;
    }
  },

  // Bind click handlers to our markers
  addWalkStopMenuEvents: {
    value: function() {
      var _this = this;
      [].forEach.call(document.querySelectorAll('.walk-stop'), function(stopEl, i) {
        stopEl.addEventListener('click', function() {
          if (this.dataset.key == i) {
            google.maps.event.trigger(_this.markers[i], 'click');
          } 
        });
      });
    }
  },

  /**
   * Map formatting
   */
  // Center the map based on its contents
  centerMap: {
    value: function() {
      var bounds = new google.maps.LatLngBounds();
      var totalPlotted = 0;
      this.markers.forEach(function(marker) {
        bounds.extend(marker.getPosition());
        ++totalPlotted;
      });
      this.route.getPath().getArray().forEach(function(pathMark) {
        bounds.extend(pathMark);
        ++totalPlotted;
      });
      if (totalPlotted) {
        this.map.fitBounds(bounds);
      }
      // Zoom out a bit from the centered/zoomed setting
      google.maps.event.addListenerOnce(this.map, 'zoom_changed', function() {
        var oldZoom = this.map.getZoom();
        this.map.setZoom(Math.min(16, oldZoom));
      }.bind(this));
    }
  },

  selectWalkStopMenuItem: {
    value: function(i) {
      // Set the marker menu active as well
      [].forEach.call(document.querySelectorAll('.walk-stop'), function(stopEl) {
        if (stopEl.dataset.key == i) {
          stopEl.classList.add('active');
          document.querySelector('.walk-stops-meta').scrollTop = stopEl.offsetTop - 10;
        } else {
          stopEl.classList.remove('active');
        }
      });
    }
  },
});

module.exports = WalkMap;

},{}],16:[function(require,module,exports){
/* 
 * Helpers for building React pages with
 *
 * Try to only put things in here after exhausting all possible other options,
 * and review this file periodically to see what can be removed as new features
 * are added to React.
 */

// Render a JSX fragment into a <span> wrapper. Helpful when an API takes a Node
// as the input, e.g. Google Maps
exports.renderAsNode = function(reactElement) {
  var returnEl = document.createElement('span');
  React.render(returnEl, reactElement);
  return returnEl;
};

// Not a generalized Object => Array, rather a convertor to change
// {0: 'a', 1: 'b', 2: 'c'} into ['a','b','c']. Use only to convert
// obsolete encodings of walks into proper arrays
exports.objectToArray = function(obj) {
  var destination = [];

  // Assign numeric index in object as array index
  for (var i in obj) {
    destination[i] = obj[i];
  }

  // Needed to remove any empty elements, e.g. if input obj counts from 1 not 0
  return destination.filter(function(n) { return n !== undefined; });
};


},{}],17:[function(require,module,exports){
// Link this component's state to the linkState() parent
module.exports.linkedParentState = {
  linkParentState: function(propname) {
    var valueLink = this.props.valueLink;
    var parentState = valueLink.value;

    return {
      value: parentState[propname],
      requestChange: function(value) {
        parentState[propname] = value;
        valueLink.requestChange(parentState);
      }
    };
  }
};

// Link this component's state to the linkState() parent
module.exports.linkedTeamMemberState = {
  linkProp: function(propname) {
    var onChange = this.props.onChange;
    var key = this._currentElement.key;
    return {
      value: this.props.value[propname],
      requestChange: function(value) {
        onChange(propname, value, key);
      }
    };
  },
};



},{}],18:[function(require,module,exports){
/**
 * i18n translation class
 *
 * @param object translations A map of i18next-format translations
 */

// sprintf tokenizer
function sprintf(str) {
  var args = Array.prototype.slice.call(arguments);
  return args.shift().replace(/%(s|d)/g, function(){
    return args.shift();
  });
}

function I18nTranslator(translations) {
  if (translations) {
    this.translations = translations;
  }
}
// Prototype methods
Object.defineProperties(I18nTranslator.prototype, {
  // The big translations map
  translations: {
    value: {},
    writable: true,
    enumerable: true
  },

  /**
   * Basic translation.
   * sprintf syntax used to replace %d and %s tokens with arguments
   */
  translate: {
    value: function(str) {
      var translated = Array.prototype.slice.call(arguments);
      translated[0] = (this.translations[str] || [str])[0];
      return sprintf.apply(this, translated);
    }
  },

  /**
   * Plural translations
   * Different languages make different numbers plural (eg is 0 plural or not)
   * Translations should provide conjugation only, and make no assumptions about
   * the nature of the data.
   *
   * @param string singular
   * @param string plural
   * @param int count
   * @return string
   * @example t2('%d ox', '%d oxen', numberOfOxen)
   */
  translatePlural: {
    value: function(singular, plural, count) {
      // TODO Use the plural rules for the language, not just English
      var isPlural = (count !== 1) ? 1 : 0;
 
      var translateTo = (this.translations[singular + '_' + plural] ||
                       [singular, plural])[isPlural];
 
      return sprintf(translateTo, count);
    }
  },

  /**
  * Translate with context
  * Some words mean different things based on context, so
  * use tc to give context.
  * 
  * @param string context
  * @param string str Sprintf-formatted string
  * @return string
  * @example tc('make or manufacture', 'produce'); tc('food', 'produce');
  */
  translateContext: {
    value: function(context, str) {
      // Grab the values to apply to the string
      var args = Array.prototype.slice.call(arguments, 2);
      // i18n lib makes context keys simply an underscore between them
      var key = context + '_' + str;
      sprintf.apply(this, [context, args]);
    }
  }
});

module.exports = I18nTranslator;

},{}],19:[function(require,module,exports){
'use strict';
var PageView = require('../Page.jsx');

/**
 * CityPageView
 * 
 * @extends PageView
 * 
 * @public
 * @param  jQuery element
 * @return void
 */
var CityPageView = function(element) {
  PageView.call(this, element);
  this._cards = Array.prototype.slice.call(this._element[0].querySelectorAll('.walk'), 0);
  this._data = JanesWalk.walks;
  this._sortWalkList();
  this._resetSelectElements();
  this._addCreateWalkEvent();
  this._addFilterEvents();
  this._setThemeCounts();
  this._captureHash();
  //        this._setupText2DonateInterstitials();
  this._addLinkListeners();
  $('.walks-list .tag').tooltip();
};
CityPageView.prototype = Object.create(PageView.prototype, {
  /**
   * _accessibility
   * 
   * @protected
   * @var       String|null (default: null)
   */
  _accessibility: {value: null, writable: true},

  /**
   * _cards
   * 
   * @protected
   * @var       Array|null (default: null)
   */
  _cards: {value: null, writable: true},

  /**
   * _data
   * 
   * @protected
   * @var       Array|null (default: null)
   */
  _data: {value: null, writable: true},

  /**
   * _date
   * 
   * @protected
   * @var       Array|null (default: null)
   */
  _date: {value: null, writable: true},

  /**
   * _initiative
   * 
   * @protected
   * @var       String|null (default: null)
   */
  _initiative: {value: null, writable: true},

  /**
   * _theme
   * 
   * @protected
   * @var       String|null (default: null)
   */
  _theme: {value: null, writable: true},

  /**
   * _ward
   * 
   * @protected
   * @var       String|null (default: null)
   */
  _ward: {value: null, writable: true},

  /**
   * _getFacebookDialogDonateObj
   * 
   * @see       http://scotch.io/tutorials/how-to-share-webpages-with-facebook
   * @see       http://www.local-pc-guy.com/web-dev/facebook-feed-dialog-vs-share-link-dialog
   * @protected
   * @return    Object
   */
  _getFacebookDialogDonateObj: {
    value: function() {
      return {
        link: 'http://janeswalk.org',
        // picture: 'http://janeswalk.org',
        name: 'Jane\'s Walk'
      };
    }
  },

  /**
   * _addLinkListeners
   * Listen on 'show all' walks
   *
   * @protected
   * @return void
   */
  _addLinkListeners: {
    value: function() {
      var _this = this;
      var showAll = document.querySelector('a.see-all');
      var toolTips = document.querySelectorAll('.walk .tags > li');
      Array.prototype.forEach.call(toolTips, function(tooltip) {
        tooltip.addEventListener('click', function(event) {
          event.preventDefault();
          fullMode();
          _this._theme = this.dataset.theme;
          _this._filterCards();
        });
      });
    }
  },

  /**
   * _setupText2DonateInterstitials
   * 
   * @protected
   * @return    void
   */
  _setupText2DonateInterstitials: {
    value: function() {
      var enabled = false,
      _this = this,
      isCanadianCity = (location.pathname.match(/\/canada\/[^/]+/) !== null),
      hasSeenDonateInterstitial,
      closeCallback,
      url,
      link;
      // Catfish events
      this._element.find('a.closeCatfishCta').click(function(event) {
        event.preventDefault();
        _this._element.find('.catfish').hide();

        // Track the closure
        jQuery.cookie(
          'hasSeenDonateCatfish',
          '1',
          {
            path: '/',
            domain: location.host
          }
        );
      });

      // Canadian city check
      if (enabled && isCanadianCity === true) {

        // Modal
        hasSeenDonateInterstitial = jQuery.cookie('hasSeenDonateInterstitial') !== null &&
          typeof jQuery.cookie('hasSeenDonateInterstitial') !== 'undefined';

        // Hasn't yet been seen
        if (hasSeenDonateInterstitial === false) {
          closeCallback = function() {

            // Track the closure
            jQuery.cookie(
              'hasSeenDonateInterstitial',
              '1',
              {
                path: '/',
                domain: location.host
              }
            );

            // Open the catfish
            _this._element.find('.catfish.c-donate').removeClass(
              'hidden'
            );
          };
          this._element.find('.overlay.o-donate').show();
          this._element.find('.overlay.o-donate .o-background').click(closeCallback);
          this._element.find('a.closeModalCta').click(closeCallback);

          // Already donated flow
          this._element.find('div.btnWrapper a').click(
            function(event) {

            // Track the closure
            jQuery.cookie(
              'hasSeenDonateInterstitial',
              '1',
              {
                path: '/',
                domain: location.host
              }
            );

            // Track the closure
            jQuery.cookie(
              'hasSeenDonateCatfish',
              '1',
              {
                path: '/',
                domain: location.host
              }
            );

            // Shout modal
            event.preventDefault();
            _this._element.find('.o-donate').hide();
            _this._element.find('.o-shout').show();

            // Twitter button
            _this._element.find('.o-shout .icon-twitter').click(function(event) {
              event.preventDefault();
              url = encodeURIComponent(
                'http://janeswalk.org/'
              );
              text = encodeURIComponent(
                $(this).closest('.option').find('.copy').text().trim()
              );
              link = 'https://twitter.com/intent/tweet' +
              '?url=' + (url) +
                '&via=janeswalk' +
                '&text=' + (text);
              window.open(
                link,
                'Twitter Share',
                'width=640, height=320'
              );
            });

            // Twitter button
            _this._element.find('.o-shout .icon-facebook').click(function(event) {
              event.preventDefault();
              var shareObj = _this._getFacebookDialogDonateObj();
              shareObj.description = $(this).closest('.option').find('.copy').text().trim();
              (new FacebookShareDialog(shareObj)).show();
            });
          }
          );
        } else {

          // Catfish
          hasSeenDonateCatfish = jQuery.cookie('hasSeenDonateCatfish') !== null &&
            typeof jQuery.cookie('hasSeenDonateCatfish') !== 'undefined';

          // Hasn't yet been seen
          if (hasSeenDonateCatfish === false) {
            this._element.find('.catfish').removeClass('hidden');
          }
        }
      }
    }
  },

  /**
   * _setThemeCounts
   * 
   * @protected
   * @return    void
   */
  _setThemeCounts: {
    value: function() {
      var _this = this,
      count,
      forEach = Function.prototype.call.bind(Array.prototype.forEach),
      el = this._element[0],
      countFilterMatches = function(option, index) {
        var filterCheck = option.getAttribute('value');

        // Default to checking option property in filter
        var compare_fn = this.compare_fn || function(f,o) { return f && f[o]; };

        if (filterCheck !== '*') {
          count = 0;
          for(var i in _this._data) {
            if(compare_fn(_this._data[i][this.filter], filterCheck)) {
              ++count;
            }
          }
          option.textContent += ' (' + count + ')';
          if (count === 0) {
            option.parentElement.removeChild(option);
          }
        }
      };

      forEach(
        el.querySelectorAll('div.filters select[name="theme"] option'),
        countFilterMatches,
        {filter: 'themes'}
      );
      forEach(
        el.querySelectorAll('div.filters select[name="accessibility"] option'),
        countFilterMatches,
        {filter: 'accessibilities'}
      );
      forEach(
        el.querySelectorAll('div.filters select[name="ward"] option'),
        countFilterMatches,
        {filter: 'wards'}
      );
      forEach(
        el.querySelectorAll('div.filters select[name="initiative"] option'),
        countFilterMatches,
        {filter: 'initiatives'}
      );
      forEach(
        el.querySelectorAll('div.filters select[name="date"] option'),
        countFilterMatches,
        {
          filter: 'datetimes',
          compare_fn: function compareDate(filter, optionValue) {
            for (var i = 0; i < filter.length; i++) {
              return filter[i].date.indexOf(optionValue) !== -1;
            } 
          } 
        }
      );
    }
  },

  /**
   * _resetSelectElements
   * 
   * @protected
   * @return    void
   */
  _resetSelectElements: {
    value: function() {
      var _this = this;
      this._element.find('div.filters select').each(function(index, element) {
        $(element).val('*');
      });
      this._element.find('.initiatives').addClass('hidden');
      this._element.find('.initiative').addClass('hidden');
      this._element.find('#initiative').change(function(event) {
        if ($(this).val() !== '#') {
          _this._element.find('.initiatives').removeClass('hidden');
          _this._element.find(
            '[data-jw-initiative="' + ($(this).val()) + '"]'
          ).removeClass('hidden');
        }
      });
    }
  },

  /**
   * _sortWalkList
   *
   * @protected
   * @return void
   */
  _sortWalkList: {
    value: function() {
      var archiveMessage = document.createElement('div');
      // JW dates are stored timezone-agnostic, e.g. an 0900 walk is at 0900 UTC
      var utcTime = Date.now() - (new Date).getTimezoneOffset() * 60 * 1000;
      archiveMessage.classList.add('statusMessage');
      // TODO: Use translation functions once loaded by ReactJS
      archiveMessage.textContent = 'Ended';

      // List the archived walks as archived
      this._cards.forEach(function(card) {
        var img = card.querySelector('.walkimage');
        var dayOld = (utcTime - Number(card.dataset.timeEnd)) > (24 * 60 * 60 * 1000);
        if (img && dayOld) {
          card.dataset.archived = true;
          img.appendChild(archiveMessage.cloneNode(true));
        }
      });

      // Sort the walks by date, with archived at the end
      this._cards.sort(function(a, b) {
        // If one is archived and the other not, the unarchived comes next
        if (a.dataset.archived  && !b.dataset.archived) {
          return 1;
        } else if (!a.dataset.archived  && b.dataset.archived) {
          return -1;
        } else {
          // If they're both archived or unarchived, sort by date
          return a.dataset.timeEnd - b.dataset.timeEnd;
        }
      });

      // And now, we can re-order it in the DOM
      this._cards.forEach(function(card) {
        // Take it out of its current order, and back in at the end
        card.parentElement.appendChild(card);
      });
    }
  },

  /**
   * _addCreateWalkEvent
   * 
   * @protected
   * @return    void
   */
  _addCreateWalkEvent: {
    value: function() {
      var _this = this,
      $btn = this._element.find('.create-walk');
      $btn.click(function(event) {
        event.preventDefault();
        if (_this._element.find('a[href="/index.php/login/logout/"]').length === 0) {
          _this._element.find('.overlay.o-connect').show();
        } else {
          location.href = $(this).attr('href');
        }
      });
    }
  },

  /**
   * _captureHash
   * 
   * @protected
   * @return    void
   */
  _captureHash: {
    value: function() {
      var _this = this;
      if (location.hash !== '') {
        var pieces = location.hash.replace('#', '').split('&');
        var key = '';
        $(pieces).each(function(index, piece) {
          key = '_' + (piece.split('=')[0]);
          _this[key] = piece.split('=')[1];
        });
        this._filterCards();
        this._element.find('select[name="ward"]').val(this._ward);
        this._element.find('select[name="theme"]').val(this._theme);
        this._element.find('select[name="accessibility"]').val(this._accessibility);
        this._element.find('select[name="initiative"]').val(this._initiative);
        this._element.find('select[name="date"]').val(this._date);
      }
    }
  },

  /**
   * _setHash
   * 
   * @protected
   * @return    void
   */
  _setHash: {
    value: function() {
      location.hash = 'ward=' + (this._ward) +
        '&theme=' + (this._theme) +
        '&accessibility=' + (this._accessibility) +
        '&initiative=' + (this._initiative) +
        '&date=' + (this._date);
    }
  },

  /**
   * _filterCards
   * 
   * @protected
   * @return    void
   */
  _filterCards: {
    value: function() {
      var _this = this,
      showing = 0,
      // Returns 'true' if this thing passes through the filter
      filterMatch = function(filter, dataset) {
        return (filter === '*') || (dataset && dataset[filter]);
      },
      filterDate = function(dateList, date) {
        if (date === '*') {
          return true;
        }
        for (var i = 0; i < dateList.length; i++) {
          if (dateList[i].date.indexOf(date) > -1) {
            return true;
          }
        }
        return false;
      };

      // Hide the cards first
      for (var i = 0, len = this._cards.length; i < len; i++) {
        this._cards[i].classList.add('hidden');
      }

      // Go through all the cards
      this._data.forEach(function(data, index) {
        // Check if we should show this card
        if(filterMatch(_this._ward, data.wards) &&
          filterMatch(_this._theme, data.themes) &&
          filterMatch(_this._accessibility, data.accessibilities) &&
          filterMatch(_this._initiative, data.initiatives) &&
          // See if date in filter dropdown is inside the array of dates
          filterDate(data.datetimes, _this._date)) {
          ++showing;
          _this._cards[index].classList.remove("hidden");
        }
      });

      // Empty state
      this._element.find('.empty').addClass('hidden');
      if (showing === 0) {
        this._element.find('.empty').removeClass('hidden');
      }
    }
  },

  /**
   * _addFilterEvents
   * 
   * @protected
   * @return    void
   */
  _addFilterEvents: {
    value: function() {
      var _this = this;
      this._element.find('div.filters select').change(function(event) {
        event.preventDefault();
        _this._ward = '*';
        if (_this._element.find('select[name="ward"]').length > 0) {
          _this._ward = _this._element.find('select[name="ward"]').val();
        }
        _this._theme = '*';
        if (_this._element.find('select[name="theme"]').length > 0) {
          _this._theme = _this._element.find('select[name="theme"]').val();
        }
        _this._accessibility = '*';
        if (_this._element.find('select[name="accessibility"]').length > 0) {
          _this._accessibility = _this._element.find('select[name="accessibility"]').val();
        }
        _this._initiative = '*';
        if (_this._element.find('select[name="initiative"]').length > 0) {
          _this._initiative = _this._element.find('select[name="initiative"]').val();
        }
        _this._date = '*';
        if (_this._element.find('select[name="date"]').length > 0) {
          _this._date = _this._element.find('select[name="date"]').val();
        }
        _this._setHash();
        _this._filterCards();
      });
    }
  }
});

module.exports = CityPageView;

},{"../Page.jsx":6}],20:[function(require,module,exports){
'use strict';
var PageView = require('../Page.jsx');

/**
 * HomePageView
 * 
 * @extends PageView
 * 
 * @public
 * @param  jQuery element
 * @return void
 */
var HomePageView = function(element) {
  PageView.call(this, element);
  this._addMapToggleEvents();
  this._addBgImage();
  this._addCityDropdownEvent();
  this._addCreateWalkEvent();
};
HomePageView.prototype = Object.create(PageView.prototype, {
  /**
   * _addCreateWalkEvent
   * 
   * @protected
   * @return    void
   */
  _addCreateWalkEvent: {value: function() {
    var _this = this,
    $btn = this._element.find('.calltoaction li a[href="/walk/form/"]');
    $btn.click(function(event) {
      event.preventDefault();
      if (_this._element.find('a[href="/index.php/login/logout/"]').length) {
        location.href = $(this).attr('href');
      } else {
        _this._element.find('.overlay').show();
      }
    });
  }},

  /**
   * _addCityDropdownEvent
   * 
   * @protected
   * @return    void
   */
  _addCityDropdownEvent: {value: function() {
    var $select = this._element.find('select.pageListSelect');
    $select.change(function(event) {
      location.href = $select.val();
    });
  }},

  /**
   * _addBgImage
   * 
   * @protected
   * @return    void
   */
  _addBgImage: {value: function() {
    var backgroundImageUrl = this._element.attr('data-backgroundImageUrl'),
    $backgroundImageBanner = this._element.find('.backgroundImageBanner'),
    image = document.createElement("img");
    image.onload = function() {
      $backgroundImageBanner.css({
        backgroundImage: 'url(' + (backgroundImageUrl) + ')'
      });
      $backgroundImageBanner.removeClass('faded');
    };
    image.src = backgroundImageUrl;
  }},

  /**
   * _addCityButtonCta
   * 
   * @protected
   * @param     String cityName
   * @param     String cityPath
   * @return    void
   */
  _addCityButtonCta: {value: function(cityName, cityPath) {
    React.render(
      this._element.find('.calltoaction ul').first(),
      React.createElement("li", {className: "cityButtonCta"}, 
        React.createElement("a", {href: cityPath, className: "btn btn-primary"}, 
          "View walks in ", cityName
        )
      )
    );
  }},

  /**
   * _addMapToggleEvents
   * 
   * @protected
   * @return    void
   */
  _addMapToggleEvents: {value: function() {
    var $showButton = this._element.find('.overlap .controls a.showButton'),
    $closeButton = this._element.find('.overlap .controls a.closeButton');
    $showButton.click(
      function() {
        $('.overlap').addClass('fullmap');
        $(this).fadeOut(
          400,
          function() {
            $closeButton.fadeIn();
          }
        );
        $('html, body').animate(
          {
            scrollTop: $(this).offset().top - 100
          },
          800
        );
      }
    );
    $closeButton.click(function() {
      $('.overlap').removeClass('fullmap');
      $(this).fadeOut(
        400,
        function() {
          $showButton.fadeIn();
        }
      );
    });
  }}
});

module.exports = HomePageView;

},{"../Page.jsx":6}],21:[function(require,module,exports){
'use strict';
var PageView = require('../Page.jsx');

/**
 * ProfilePageView
 * 
 * @extends PageView
 *
 * init
 * 
 * @public
 * @param  jQuery element
 * @return void
 */
var ProfilePageView = function(element) {
  try { 
    PageView.call(this, element);
    this._showProperStep();
    this._addTabClickEvents();
    this._setupDisplayPictureFlashWidget();
    this._addPictureDeleteEvent();
    this._addPromoteWalkClickEvent();
    this._addPromoteCityClickEvent();
    this._addPromoteBlogPostClickEvent();
    this._setupCityPromoteModalEvents();
    this._setupWalkPromoteModalEvents();
    this._setupBlogPostPromoteModalEvents();
    this._setupPromoteSlideshows();
    this._setupTransferWalkEvents();
    this._setupUnpublishWalkEvents();
  } catch(e) {
    console.error("Error initializing profile: " + e.stack);
  }
};

ProfilePageView.prototype = Object.create(PageView.prototype, {
  /**
   * _slideIndexes
   * 
   * @protected
   * @var       Object
   */
  _slideIndexes: {
    value: {blogPost: 0, city: 0, walk: 0 },
    writable: true
  },

  /**
   * _currentTab
   * 
   * @protected
   * @var       String|null (default: null)
   */
  _currentTab: {
    value: null,
    writable: true
  },

  /**
   * _addPictureDeleteEvent
   * 
   * @protected
   * @return    void
   */
  _addPictureDeleteEvent: {
    value: function() {
      this._element.find('a[href="/index.php/profile/delete/"]').click(function(event) {
        event.preventDefault();
        $.ajax({
          type: 'DELETE',
          url: $(this).attr('href'),
          success: function() {
            location.href = '/index.php/profile/#tab=picture&success=1';
          }
        });
      });
    }
  },

  /**
   * _addPromoteBlogPostClickEvent
   * 
   * @protected
   * @return    void
   */
  _addPromoteBlogPostClickEvent: {
    value: function() {
      var _this = this,
      $btn = this._element.find('.column.blogPosts .subactions .promote');
      $btn.click(function(event) {
        event.preventDefault();
        var blogPostObj = _this._getBlogPostObjById(
          $(this).data('blogpostid')
        );
        _this._element.find('.blogPostPromoteOverlay .copy').each(
          function(index, copy) {
          var $copy = $(copy);
          $copy.data('blogpostpath', blogPostObj.path);
          $copy.find('.objTitle').text(blogPostObj.title);
        }
        );
        _this._element.find('.blogPostPromoteOverlay').show();
      });
    }
  },

  /**
   * _addPromoteCityClickEvent
   * 
   * @protected
   * @return    void
   */
  _addPromoteCityClickEvent: {
    value: function() {
      var _this = this,
      $btn = this._element.find('#cityBlock .promoteBtn');
      $btn.click(function(event) {
        event.preventDefault();
        _this._element.find('.cityPromoteOverlay').show();
      });
    }
  },

  /**
   * _getBlogPostObjById
   * 
   * @protected
   * @param     Number blogPostId
   * @return    void
   */
  _getBlogPostObjById: {
    value: function(blogPostId) {
      var $link = this._element.find('[data-blogpostid="' + (blogPostId) + '"]');
      return {
        title: $link.first().data('blogposttitle'),
        path: $link.first().data('blogpostpath')
      };
    }
  },

  /**
   * _getWalkObjById
   * 
   * @protected
   * @param     Number walkId
   * @return    void
   */
  _getWalkObjById: {
    value: function(walkId) {
      var $link = this._element.find('[data-walkid="' + (walkId) + '"]');
      return {
        title: $link.first().data('walktitle'),
        path: $link.first().data('walkpath')
      };
    }
  },

  /**
   * _addPromoteWalkClickEvent
   * 
   * @protected
   * @return    void
   */
  _addPromoteWalkClickEvent: {
    value: function() {
      var _this = this,
      $btn = this._element.find(
        '.column.city .subactions .promote,' +
        '.column.walks .subactions .promote'
      );
      $btn.click(function(event) {
        event.preventDefault();
        var walkObj = _this._getWalkObjById($(this).data('walkid'));
        _this._element.find('.walkPromoteOverlay .copy').each(function(index, copy) {
          copy.dataset.walkpath = walkObj.path;
          copy.textContent = copy.textContent.replace(/\[WALKNAME\]/, walkObj.title);
        });
        _this._element.find('.walkPromoteOverlay').show();
      });
    }
  },

  /**
   * _addTabClickEvents
   * 
   * @protected
   * @return    void
   */
  _addTabClickEvents: {
    value: function() {
      // Nav tabs
      var _this = this;
      this._element.find('ul.nav-tabs li a').click(function(event) {
        event.preventDefault();
        _this._currentTab = $(this).attr('data-tab');
        _this._showCurrentTab();
      });

      // Stand alone links
      this._element.find('.tabLink').click(function(event) {
        event.preventDefault();
        _this._currentTab = $(this).attr('data-tab');
        _this._showCurrentTab();
      });
    }
  },

  /**
   * _setupBlogPostPromoteModalEvents
   * 
   * @protected
   * @return    void
   */
  _setupBlogPostPromoteModalEvents: {
    value: function() {
      var _this = this;
      this._element.find('.blogPostPromoteOverlay').find('.icon-twitter').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showTwitterShareWindow(
          'http://janeswalk.org' + ($copy.data('blogpostpath')),
          $copy.text().trim()
        );
      });
      this._element.find('.blogPostPromoteOverlay').find('.icon-facebook').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showFacebookShareWindow(
          'http://janeswalk.org' + ($copy.data('blogpostpath')),
          'Jane\'s Walk',
          $copy.text().trim()
        );
      });
      this._element.find('.blogPostPromoteOverlay').find('.icon-envelope').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showEmailShareWindow(
          'Jane\'s Walk in ' + (_this._element.find('#profileWrapper').data('city')),
          $copy.text().trim()
        );
      });
    }
  },

  /**
   * _setupCityPromoteModalEvents
   * 
   * @protected
   * @return    void
   */
  _setupCityPromoteModalEvents: {
    value: function() {
      var cityPath = this._element.find('.cityPromoteOverlay').data('citypath'),
      cityName = this._element.find('.cityPromoteOverlay').data('cityname');
      var _this = this;
      this._element.find('.cityPromoteOverlay').find('.icon-twitter').click(function(event) {
        event.preventDefault();
        _this._showTwitterShareWindow(
          'http://janeswalk.org' + (cityPath),
          $(this).closest('.option').find('.copy').text().trim()
        );
      });
      this._element.find('.cityPromoteOverlay').find('.icon-facebook').click(function(event) {
        event.preventDefault();
        _this._showFacebookShareWindow(
          'http://janeswalk.org' + (cityPath),
          'Jane\'s Walk',
          $(this).closest('.option').find('.copy').text().trim()
        );
      });
      this._element.find('.cityPromoteOverlay').find('.icon-envelope').click(function(event) {
        event.preventDefault();
        _this._showEmailShareWindow(
          'Jane\'s Walk in ' + (cityName),
          $(this).closest('.option').find('.copy').text().trim()
        );
      });
    }
  },

  /**
   * _setupTransferWalkEvents
   *
   * @protected
   * @return  void
   */
  _setupTransferWalkEvents: {
    value: function() {
      var _this = this;
      // Set the requests when clicking the modal links
      this._element.find('#walk-transfer .users a').click(function(event) {
        event.preventDefault();
        $.get(
          this.getAttribute('href'),
          function(data) {
            if (data.error) {
              console.error(data.error);
            } else {
              // Just refresh the page for now
              window.location = window.location;
            }
          }
        );
      });

      // Set the 'transfer' buttons in the walks columns
      this._element.find('a.transfer').removeClass('hidden').click(function(event) {
        event.preventDefault();
        var modal = _this._element.find('#walk-transfer'),
        href = this.getAttribute('href'),
        links = modal.find('.users a');
        for (var i = 0, len = links.length; i < len; i++) {
          links[i].setAttribute('href', href + 'transfer/' + links[i].getAttribute('data-uid'));
        }
        modal.modal();
      });
    }
  },

  /**
   * _setupUnpublishWalkEvents
   *
   * @protected
   * @return  void
   */
  _setupUnpublishWalkEvents: {
    value: function() {
      var _this = this;
      // Set the 'unpublish' buttons in the walks columns
      this._element.find('a.delete').click(function(event) {
        event.preventDefault();
        $.ajax({
          url: this.getAttribute('href'),
          type: 'DELETE',
          success: function() {
            window.location = window.location;
          }
        });
      });
    }
  },

  /**
   * _setupDisplayPictureFlashWidget
   * 
   * @protected
   * @return    void
   */
  _setupDisplayPictureFlashWidget: {
    value: function() {
      window.ThumbnailBuilder_onSaveCompleted = function() {
        location.href = '/index.php/profile/#tab=picture&success=1';
      };
      var params = {
        bgcolor: '#ffffff',
        wmode: 'transparent',
        quality: 'high' 
      },
      flashvars = {
        width: this._element.find('#flashContainer').attr('data-width'),
        height: this._element.find('#flashContainer').attr('data-height'),
        image: this._element.find('#flashContainer').attr('data-imagepath'),
        save: this._element.find('#flashContainer').attr('data-savepath')
      };
      if(typeof swfobject !== "undefined") {
        swfobject.embedSWF(
          this._element.find('#flashContainer').attr('data-flashpath'),
          'flashContainer',
          '500',
          '400',
          '10,0,0,0',
          'includes/expressInstall.swf',
          flashvars,
          params
        );
      }
    }
  },

  /**
   * _showSlide
   * 
   * @protected
   * @param     String slideshowName
   * @return    void
   */
  _showSlide: {
    value: function(slideshowName) {
      var index = this._slideIndexes[slideshowName],
      $overlay = this._element.find('[data-slideshow="' + (slideshowName) + '"]'),
      $options = $overlay.find('.options .option');
      $options.addClass('hidden');
      $($options[index]).removeClass('hidden');
    }
  },

  /**
   * _setupPromoteSlideshows
   * 
   * @protected
   * @return    void
   */
  _setupPromoteSlideshows: {
    value: function() {
      var _this = this;
      this._element.find('.promoteOverlay .nav > a.left').click(function(event) {
        event.preventDefault();
        var $anchor = $(this),
        slideshow = $anchor.data('slideshow'),
        $overlay = $anchor.closest('.promoteOverlay'),
        numOptions = $overlay.find('.options .option').length,
        $options = $overlay.find('.options .option');
        if (_this._slideIndexes[slideshow] === 0) {
          _this._slideIndexes[slideshow] = numOptions - 1;
        } else {
          --_this._slideIndexes[slideshow];
        }
        _this._showSlide(slideshow);
      });
      this._element.find('.promoteOverlay .nav > a.right').click(function(event) {
        event.preventDefault();
        var $anchor = $(this),
        slideshow = $anchor.data('slideshow'),
        $overlay = $anchor.closest('.promoteOverlay'),
        numOptions = $overlay.find('.options .option').length,
        $options = $overlay.find('.options .option');
        if (_this._slideIndexes[slideshow] === (numOptions - 1)) {
          _this._slideIndexes[slideshow] = 0;
        } else {
          ++_this._slideIndexes[slideshow];
        }
        _this._showSlide(slideshow);

      });
    }
  },

  /**
   * _setupWalkPromoteModalEvents
   * 
   * @protected
   * @return    void
   */
  _setupWalkPromoteModalEvents: {
    value: function() {
      var _this = this;
      this._element.find('.walkPromoteOverlay').find('.icon-twitter').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showTwitterShareWindow(
          'http://janeswalk.org' + ($copy.data('walkpath')),
          $copy.text().trim()
        );
      });
      this._element.find('.walkPromoteOverlay').find('.icon-facebook').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showFacebookShareWindow(
          'http://janeswalk.org' + ($copy.data('walkpath')),
          'Jane\'s Walk',
          $copy.text().trim()
        );
      });
      this._element.find('.walkPromoteOverlay').find('.icon-envelope').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showEmailShareWindow(
          'Jane\'s Walk in ' + (_this._element.find('#profileWrapper').data('city')),
          $copy.text().trim()
        );
      });
    }
  },

  /**
   * _showCurrentTab
   * 
   * @protected
   * @return    void
   */
  _showCurrentTab: {
    value: function() {
      this._element.find('ul.nav-tabs li.active').removeClass('active');
      this._element.find('ul.nav-tabs li a[data-tab="' + (this._currentTab) + '"]').parent().addClass('active');
      this._element.find('div.content div.block').addClass('hidden');
      this._element.find('div.content div.block[data-tab="' + (this._currentTab) + '"]').removeClass('hidden');
      location.hash = 'tab=' + (this._currentTab);
    }
  },

  /**
   * _showEmailShareWindow
   * 
   * @protected
   * @param     String subject
   * @param     String body
   * @return    void
   */
  _showEmailShareWindow: {
    value: function(subject, body) {
      subject = encodeURIComponent(subject);
      body = encodeURIComponent(body);
      var link = 'mailto:?subject=' + (subject) + '&body=' + (body);
      window.open(link);
    }
  },

  /**
   * _showFacebookShareWindow
   * 
   * @protected
   * @param     String link
   * @param     String title
   * @param     String text
   * @return    void
   */
  _showFacebookShareWindow: {
    value: function(link, title, text) {
      (new FacebookShareDialog({
        link: link,
        name: title,
        description: text
      })).show();
    }
  },

  /**
   * _showProperStep
   * 
   * @protected
   * @return    void
   */
  _showProperStep: {
    value: function() {
      if (location.hash !== '') {
        var pieces = location.hash.split('&'),
        hash = {},
        again;
        $(pieces).each(
          function(index, piece) {
          again = piece.split('=');
          hash[again[0].replace('#', '')] = again[1];
        }
        );
        this._currentTab = hash.tab;
        this._showCurrentTab();
        if (
          typeof hash.success !== 'undefined' &&
            parseInt(hash.success) === 1
        ) {
          this._element.find('div.content div.block[data-tab="' + (this._currentTab) + '"]').addClass('success');
        }
      }
    }
  },

  /**
   * _showTwitterShareWindow
   * 
   * @protected
   * @param     String link
   * @param     String text
   * @return    void
   */
  _showTwitterShareWindow: {
    value: function(link, text) {
      link = encodeURIComponent(link);
      text = encodeURIComponent(text);
      if (text.length > 130) {
        text = text.substring(0,130) + '...';
      }
      link = 'https://twitter.com/intent/tweet' +
      '?url=' + (link) +
        '&via=janeswalk' +
        '&text=' + (text);
      window.open(
        link,
        'Twitter Share',
        'width=640, height=320'
      );
    }
  }
});

module.exports = ProfilePageView;

},{"../Page.jsx":6}],22:[function(require,module,exports){
'use strict';
var PageView = require('../Page.jsx');
var FacebookShareDialog = require('../FacebookShareDialog.jsx');
var WalkMap = require('../elements/WalkMap.jsx');

/**
 * WalkPageView
 * 
 * @extends PageView
 * 
 * init
 * 
 * @public
 * @param  jQuery element
 * @return void
 */
var WalkPageView = function(element) {
  PageView.call(this, element);
  
  var mapCanvas = document.getElementById('map-canvas');

  this._addFacebookDialogEvents();

  // Check if there's a map to init first
  if (mapCanvas) {
    new WalkMap(JanesWalk.page.gmap, mapCanvas);
  }
};
WalkPageView.prototype = Object.create(PageView.prototype, {
  /**
   * _addFacebookDialogEvents
   * 
   * @protected
   * @return    void
   */
  _addFacebookDialogEvents: {
    value: function() {
      var _this = this;
      this._element.find('.facebookShareLink').click(function(event) {
        event.preventDefault();
        _this.trackEvent('Walk', 'share.attempted', 'facebook');
        var shareObj = _this._getFacebookDialogObj();
        (new FacebookShareDialog(shareObj)).show(
          _this._facebookShareFailed,
          _this._facebookShareSuccessful
        );
      });
    }
  },

  /**
   * _facebookShareFailed
   * 
   * @protected
   * @return    void
   */
  _facebookShareFailed: {
    value: function() {
      this.trackEvent('Walk', 'share.failed', 'facebook');
    }
  },

  /**
   * _facebookShareSuccessful
   * 
   * @protected
   * @return    void
   */
  _facebookShareSuccessful: {
    value: function() {
      this.trackEvent('Walk', 'share.successful', 'facebook');
    }
  },

  /**
   * _getFacebookDialogObj
   * 
   * @see       http://scotch.io/tutorials/how-to-share-webpages-with-facebook
   * @see       http://www.local-pc-guy.com/web-dev/facebook-feed-dialog-vs-share-link-dialog
   * @protected
   * @return    Object
   */
  _getFacebookDialogObj: {
    value: function() {
      return {
        link: JanesWalk.page.url,
        picture: JanesWalk.page.pictureUrl,
        name: JanesWalk.page.title,
        description: JanesWalk.page.description,
        actions: {
          name: 'View Jane\'s Walks in ' + (JanesWalk.page.city.name),
          link: JanesWalk.page.city.url
        }
      };
    }
  },

});

module.exports = WalkPageView;

},{"../FacebookShareDialog.jsx":5,"../Page.jsx":6,"../elements/WalkMap.jsx":15}]},{},[1]);
