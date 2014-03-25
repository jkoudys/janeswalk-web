// function updateRegModal(eventId,eventName,eventDate,eventTime) {
//   var eventDateReadable = moment(eventDate).format('dddd[,] MMM Do YYYY');

//   document.getElementById("button-reg").href='http://www.eventbrite.ca/event/' + eventId + '?ref=ebtn#';
//   document.getElementById("button-regdonate").href='https://www.gifttool.com/donations/Donate?ID=1830&AID=2738';
//   document.getElementById("event-name-regmodal").innerHTML=eventName;
//   document.getElementById("event-date-regmodal").innerHTML=eventDateReadable;
//   document.getElementById("event-time-regmodal").innerHTML=eventTime;
// }

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
  /**
  * Views
  * 
  */
  var bodyElement = $('body').first(),
  pageViewName = bodyElement.attr('data-pageViewName');

  // Not page view found
  if (typeof pageViewName === 'undefined') {
    console && console.log('No page view defined.');
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

  if (0 && $('#calendar').length > 0 && $('body').hasClass('active-walk')) {

    Eventbrite({'app_key':"4GLVHQYNUSSUONY3QN"}, function(eb_client){

      var params = {user: EventBriteEmail, event_statuses: "live"};

      eb_client.user_list_events(params,function(response) {

        // var eventsCount = response.events.length;
        // Only display one event for now.

        var eventsCount = 2;

        for (var eventsCounter=0; eventsCounter < eventsCount; eventsCounter++) {

          var eventDateTime = response.events[eventsCounter].event.start_date.split(" ");
          var eventId = response.events[eventsCounter].event.id;
          var eventName = response.events[eventsCounter].event.title;
          var eventDateObject = new Date(eventDateTime[0]);
          var eventTime = eventDateTime[1];

          if (!$.support.transition) {
            var eventDateObject = eventDateTime[0].split(/\s*\-\s*/g);
            var eventMonth = eventDateObject[1];
            var eventDate = eventMonth+"-"+eventDateObject[2]+"-"+eventDateObject[0];
            var param = {};
            eventTime = '<a href="http://www.eventbrite.ca/event/' + eventId + '?ref=ebtn#" class="btn btn-primary btn-large book">Register for the ' + '<span class="time">' + toStandardTime(eventTime) + ' walk</span></a><a href="#" class="btn request-btn-book">Request another time</a>';
          } else {
            //construct datestring that is palatable to calendario (convert single-digit days/months to two-digits)
            var eventDate = ("0" + (eventDateObject.getMonth()+1)).slice(-2) + "-" + ("0" + (eventDateObject.getDate()+1)).slice(-2) + "-" + eventDateObject.getFullYear();
            eventTime = '<a href="http://www.eventbrite.ca/event/' + eventId + '?ref=ebtn#" class="btn btn-primary btn-large book">Register for the ' + '<span class="time">' + toStandardTime(eventTime) + ' walk</span></a><a href="#" class="btn request-btn-book">Request another time</a>';
            var param = {};
          }
          param[eventDate] = eventTime;
          cal.setData(param);
          console.log(param);
        }

      });

    });

  }


  if ($('body').hasClass('walk-page') || $('body').hasClass('create-page')) {
    $month = $( '#custom-month' ).html( cal.getMonthName() ),
    $year = $( '#custom-year' ).html( cal.getYear() );
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

  // Date Picker
  $('#date-picker, #date-picker2').datepicker({
    format: 'mm-dd-yyyy'
  });

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

  // Walk Leader Select
  $('.profiles').flexslider({
    selector: '.profile-inner',
    directionNav: false,
  });

  // Editor helper
  $('.editor').wysihtml5();

  // Slimscroll
  $('.walk-stops-meta').mCustomScrollbar({theme:'dark'});

  // Add Stop After Overlay
  $('#step-add-button-final').on('click', function(){
    $('#step-add-button').animate({'opacity':'1'});
  });

  // Spin.js Spinner
  $progress = $('#progress');

  $.fn.spin = function (opts) {
    this.each(function () {
      var $this = $(this),
      data = $this.data();
      if (data.spinner) {
        data.spinner.stop();
        delete data.spinner;
      }
      if (opts !== false) {
        data.spinner = new Spinner($.extend({
          color: '#F16725',
          lines: 11,
          length: 20,
          width: 2,
          radius: 16,
          corners: 1.0,
          rotate: 0,
          trail: 47,
          speed: 1.3,
        }, opts)).spin(this);
      }
    });
    return this;
  };

  $progress.spin();

  window.onload = function() {
    $progress.spin(false).css({'z-index':'-1'});
    $('.city-organizer').slideDown();
  };

  // Notifications
  var festivalWeekendCheck = $.cookie('festival-visible');

  $('.notification').on('click', function(){
    $(this).removeClass('expanded');
  });

  $('.festival-weekend').on('click', function(){
    $.cookie('festival-visible', false, { expires: 7, path: '/' });
  });

  if ($('body').hasClass('city-page') && festivalWeekendCheck === undefined) {
    setTimeout( function() {
      $('.notification.festival-weekend').addClass('expanded');
    },2000);

    $('.city-page').on('click', function(){
      $.cookie('festival-visible', false, { expires: 7, path: '/' });
      $('.notification.festival-weekend').removeClass('expanded');
    });
  };

  if ($('body').hasClass('home')) {
    setTimeout( function() {
      $('#prototype').modal('show')
    },2000);
  };

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

  // Flexslide for city page carousel
  $('.city-organizer').flexslider({
    startAt: 0,
    selector: '.pane',
    controlNav: false, 
    directionNav: false,
    slideshowSpeed: 4000,
    pauseOnHover: true,
    start: function(slider){
      $('.city-organizer').hover(function(){
        slider.flexAnimate(0);
      });
    }
  });

  // Construct button to continue reg with Eventbrite reg
  if ($('body').hasClass('reg-confirmation')){
    var eventId = url('?eid');
    var orderId = url('?oid');
    document.getElementById("button-regdonate").href='http://janeswalk.tv/confirm?event_id=' + eventId + '&order_id=' + orderId +'';
  } else if ($('body').hasClass('reg-confirmation-riverside-walk')) {
    var eventId = url('?eid');
    var orderId = url('?oid');
    document.getElementById("button-regdonate").href='http://janeswalk.tv/confirm-riverside?event_id=' + eventId + '&order_id=' + orderId +'';
  } else if ($('body').hasClass('reg-confirmation-congested')) {
    var eventId = url('?eid');
    var orderId = url('?oid');
    document.getElementById("button-regdonate").href='http://janeswalk.tv/confirm-congested?event_id=' + eventId + '&order_id=' + orderId +'';
  }
});

