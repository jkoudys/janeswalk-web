/* jshint ignore:start */

// Shims, polyfills, etc.
// dataset
Function.prototype.bind||(Function.prototype.bind=function(e){"use strict";if(typeof this!="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&e?this:e,t.concat(Array.prototype.slice.call(arguments)))};return r.prototype=this.prototype,i.prototype=new r,i}),function(){"use strict";var e=Object.prototype,t=e.__defineGetter__,n=e.__defineSetter__,r=e.__lookupGetter__,i=e.__lookupSetter__,s=e.hasOwnProperty;t&&n&&r&&i&&(Object.defineProperty||(Object.defineProperty=function(e,o,u){if(arguments.length<3)throw new TypeError("Arguments not optional");o+="";if(s.call(u,"value")){!r.call(e,o)&&!i.call(e,o)&&(e[o]=u.value);if(s.call(u,"get")||s.call(u,"set"))throw new TypeError("Cannot specify an accessor and a value")}if(!(u.writable&&u.enumerable&&u.configurable))throw new TypeError("This implementation of Object.defineProperty does not support false for configurable, enumerable, or writable.");return u.get&&t.call(e,o,u.get),u.set&&n.call(e,o,u.set),e}),Object.getOwnPropertyDescriptor||(Object.getOwnPropertyDescriptor=function(e,t){if(arguments.length<2)throw new TypeError("Arguments not optional.");t+="";var n={configurable:!0,enumerable:!0,writable:!0},o=r.call(e,t),u=i.call(e,t);return s.call(e,t)?!o&&!u?(n.value=e[t],n):(delete n.writable,n.get=n.set=undefined,o&&(n.get=o),u&&(n.set=u),n):n}),Object.defineProperties||(Object.defineProperties=function(e,t){var n;for(n in t)s.call(t,n)&&Object.defineProperty(e,n,t[n])}))}();if(!document.documentElement.dataset&&(!Object.getOwnPropertyDescriptor(Element.prototype,"dataset")||!Object.getOwnPropertyDescriptor(Element.prototype,"dataset").get)){var propDescriptor={enumerable:!0,get:function(){"use strict";var e,t=this,n,r,i,s,o,u=this.attributes,a=u.length,f=function(e){return e.charAt(1).toUpperCase()},l=function(){return this},c=function(e,t){return typeof t!="undefined"?this.setAttribute(e,t):this.removeAttribute(e)};try{(({})).__defineGetter__("test",function(){}),n={}}catch(h){n=document.createElement("div")}for(e=0;e<a;e++){o=u[e];if(o&&o.name&&/^data-\w[\w\-]*$/.test(o.name)){r=o.value,i=o.name,s=i.substr(5).replace(/-./g,f);try{Object.defineProperty(n,s,{enumerable:this.enumerable,get:l.bind(r||""),set:c.bind(t,i)})}catch(p){n[s]=r}}}return n}};try{Object.defineProperty(Element.prototype,"dataset",propDescriptor)}catch(e){propDescriptor.enumerable=!1,Object.defineProperty(Element.prototype,"dataset",propDescriptor)}};

/* jshint ignore:end */

// Converts military to standard time (to convert times returned by Eventbrite API)
function toStandardTime(timeString) {
  timeArray = timeString.split(":");
  var timeOutput;
  var timeSuffix;
   if(timeArray[0]==12) {
    timeOutput = 12;
    timeSuffix = "pm";
  } else if (timeArray[0]>12) {
    timeOutput = (timeArray[0] - 12);
    timeSuffix = "pm";
  }
  else {
    timeOutput = timeArray[0];
    timeSuffix = "am";
  }
  timeOutput = timeOutput + ":" + timeArray[1] + timeSuffix;
  return timeOutput;
}

/* Used to blur everything but the one element we don't want blurred */
function blurPage() { $("body > section, body > header").addClass("blur"); }
function unblurPage() { $("body > section, body > header").removeClass("blur"); }
var _pageView;
$(document).ready(function(){
  var eventId,
    orderId;
  /**
  * Views
  * 
  */
  var bodyElement = $('body').first(),
  pageViewName = bodyElement.attr('data-pageViewName');

  // Not page view found
  if (typeof pageViewName === 'undefined') {
    if (console) console.log('No page view defined.');
  } else {
    _pageView = (new window[pageViewName](bodyElement));
  }

  // Calendar

  var cal = $('#calendar').calendario({
    displayWeekAbbr : true,
    startIn : 0,
    onDayClick : function( $el, $contentEl, dateProperties ) {
      $('.fc-row div').removeClass('selected');
      $el.addClass('selected');
      if( $contentEl.length > 0 ) {
        $('.request-btn, .request-nowalks').hide();
        showEvents( $contentEl, dateProperties );
      } else {
        $('.caption .book').remove();
        $('.caption .request-btn-book').remove();
        $('.request-nowalks, .request-btn').show();
      }
      if ($('body').hasClass('create-page')) {
        $('#selected-day').html(dateProperties.monthname +' '+ dateProperties.day +', '+ dateProperties.year);
      }
    }
  });



  // Populate Calendar with Eventbrite event dates
  // FIXME: the variable hoisting in this block is confusing as heck - cleanup.
  // Minimal work done to please jshint, but most of this file needs refactoring
  if (0 && $('#calendar').length > 0 && $('body').hasClass('active-walk')) {

    Eventbrite({'app_key':"4GLVHQYNUSSUONY3QN"}, function(eb_client){

      var params = {user: EventBriteEmail, event_statuses: "live"};

      eb_client.user_list_events(params, function(response) {

        // var eventsCount = response.events.length;
        // Only display one event for now.

        var eventsCount = 2;

        for (var eventsCounter=0; eventsCounter < eventsCount; eventsCounter++) {

          var eventDateTime = response.events[eventsCounter].event.start_date.split(" ");
          eventId = response.events[eventsCounter].event.id;
          var eventName = response.events[eventsCounter].event.title;
          var eventDateObject = new Date(eventDateTime[0]);
          var eventTime = eventDateTime[1];
          var eventDate;
          var param = {};

          if (!$.support.transition) {
            eventDateObject = eventDateTime[0].split(/\s*\-\s*/g);
            var eventMonth = eventDateObject[1];
            eventDate = eventMonth+"-"+eventDateObject[2]+"-"+eventDateObject[0];
            eventTime = '<a href="http://www.eventbrite.ca/event/' + eventId + '?ref=ebtn#" class="btn btn-primary btn-large book">Register for the ' + '<span class="time">' + toStandardTime(eventTime) + ' walk</span></a><a href="#" class="btn request-btn-book">Request another time</a>';
          } else {
            //construct datestring that is palatable to calendario (convert single-digit days/months to two-digits)
            eventDate = ("0" + (eventDateObject.getMonth()+1)).slice(-2) + "-" + ("0" + (eventDateObject.getDate()+1)).slice(-2) + "-" + eventDateObject.getFullYear();
            eventTime = '<a href="http://www.eventbrite.ca/event/' + eventId + '?ref=ebtn#" class="btn btn-primary btn-large book">Register for the ' + '<span class="time">' + toStandardTime(eventTime) + ' walk</span></a><a href="#" class="btn request-btn-book">Request another time</a>';
          }
          param[eventDate] = eventTime;
          cal.setData(param);
          console.log(param);
        }

      });

    });

  }


  if ($('body').hasClass('walk-page') || $('body').hasClass('create-page')) {
    $month = $('#custom-month').html(cal.getMonthName());
    $year = $('#custom-year').html(cal.getYear());
  }

  $('#custom-next').on('click', function() {
    cal.gotoNextMonth(updateMonthYear);
  } );
  $('#custom-prev').on( 'click', function() {
    cal.gotoPreviousMonth(updateMonthYear);
  });

  function updateMonthYear() {        
    $month.html( cal.getMonthName() );
    $year.html( cal.getYear() );
  }


  // Booking toggle

  function showEvents( $contentEl, dateProperties ) {
    $('.caption .book').remove();
    $('.caption .request-btn-book').remove();
    $('.request').slideUp();
    $('.request-btn').removeClass('active');
    //  $('.date-caption').append('<a href="#" class="btn btn-primary btn-large book">Book This Date '+ $contentEl.html() +'</a>');
    $('.date-caption').append($contentEl.html());
  }

  // Hover to Show Time
  $('.fc-content').tooltip({
    trigger: 'hover',
    title: "I'm available"
  });

  $('.tag').tooltip({
    trigger: 'hover',
    placement: 'bottom'
  });

  // Request Button
  $('.date-caption').delegate('.request-btn-book, .request-btn','click', function(event){
    event.preventDefault();
    $(this).toggleClass('active');
    $('.request').slideToggle();
  });

  // Slimscroll
  $('.walk-stops-meta').mCustomScrollbar({theme:'dark'});

  // Add Stop After Overlay
  $('#step-add-button-final').on('click', function(){
    $('#step-add-button').animate({'opacity':'1'});
  });

  // Notifications
  $('.notification').on('click', function(){
    $(this).removeClass('expanded');
  });

  if ($('body').hasClass('city-page') && typeof festivalWeekendCheck === "undefined") {
    setTimeout( function() {
      $('.notification.festival-weekend').addClass('expanded');
    },2000);

    $('.city-page').on('click', function(){
      $('.notification.festival-weekend').removeClass('expanded');
    });
  }

  if ($('body').hasClass('home')) {
    setTimeout( function() {
      $('#prototype').modal('show');
    },2000);
  }

  $('.custom-walk-page .container-outter .notify').on('click', function(event){
    event.preventDefault();
    $('.notification.custom-form').toggleClass('expanded');
  });

  $('body').on('mousedown', function(){
    if ($('.notification').hasClass('expanded')) {
      $('.notification').removeClass('expanded');
    }
  });

  // Smooth Scroll
  $('.bottom-bar').on('click', function(event){
    event.preventDefault();
    $('html, body').animate({ scrollTop: $('#walk-leader-bio').offset().top-80 }, 1000);
  });

  $('#register-btn').on('click', function(event){
    event.preventDefault();
    $('html, body').animate({ scrollTop: $('#register').offset().top-80 }, 1000, function(){
      setTimeout(function(){
        $('#register').addClass('focus');
      }, 100);
    });
  });

  // Construct button to continue reg with Eventbrite reg
  if ($('body').hasClass('reg-confirmation')){
    eventId = url('?eid');
    orderId = url('?oid');
    document.getElementById("button-regdonate").href='http://janeswalk.tv/confirm?event_id=' + eventId + '&order_id=' + orderId +'';
  } else if ($('body').hasClass('reg-confirmation-riverside-walk')) {
    eventId = url('?eid');
    orderId = url('?oid');
    document.getElementById("button-regdonate").href='http://janeswalk.tv/confirm-riverside?event_id=' + eventId + '&order_id=' + orderId +'';
  } else if ($('body').hasClass('reg-confirmation-congested')) {
    eventId = url('?eid');
    orderId = url('?oid');
    document.getElementById("button-regdonate").href='http://janeswalk.tv/confirm-congested?event_id=' + eventId + '&order_id=' + orderId +'';
  }
});

