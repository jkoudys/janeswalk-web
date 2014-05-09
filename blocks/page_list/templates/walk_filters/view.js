/* classList shim */
;if("document" in self&&!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false;do{r=t[s]+"";var q=g(this,r);if(q!==-1){this.splice(q,1);o=true}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}return !o};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))};

document.addEventListener('DOMContentLoaded', function(){
  var walkList = document.querySelector("#jw-list .walklist");
  var sortOptions = walkList.querySelectorAll("thead th");
  var walkElements = walkList.querySelectorAll("tbody tr");
  for(var i=0, len = sortOptions.length; i < len; i++) {
    sortOptions[i].index = i;
    sortOptions[i].walkElements = walkElements;

    sortOptions[i].onclick = function(ev) {
      var walkList = document.querySelector("#jw-list .walklist");
      var walkBody = walkList.querySelector("tbody");
      var walkElements = this.walkElements;
      var walks = [];
      if(this.classList.contains("sort")) {
        for(var currentWalks = walkBody.querySelectorAll("tr"), i = currentWalks.length - 1; i >= 0; i--) {
          walkBody.appendChild(currentWalks[i]);
        }
        this.classList.toggle("reverse");
      }
      else {
        for(var i=0, len = walkElements.length; i < len; i++) {
          walks[i] = walkElements[i];
          walks[i].index = this.index;
        }

        walks.sort(function(a,b) {
          var astr = (a.querySelectorAll("td")[a.index]).textContent;
          var bstr = (b.querySelectorAll("td")[b.index]).textContent;
          return astr.localeCompare(bstr) || parseInt(a.getAttribute("data-janeswalk-sort")) - parseInt(b.getAttribute("data-janeswalk-sort"));
        });
        for(var i = 0, len = walks.length; i < len; i++) {
          walkBody.appendChild(walks[i]);
        }

        // Clear the sort arrows, set to the new one
        for(var i=0, len=sortOptions.length; i < len; i++) {
          sortOptions[i].classList.remove("sort", "reverse");
        }
        this.classList.add("sort");
      }
    }
  }
});
