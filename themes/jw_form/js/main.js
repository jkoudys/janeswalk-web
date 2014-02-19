// New Session Popover

$.paramsURL = function(param_name){
  var value = new RegExp('[\\?&]' + param_name + '=([^&#]*)').exec(window.location.href);
  if (value !== null) {
    return value[1];
  }
}

// Time Convert

function timeConvert (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}
;

var dateSelected = [];

// Typeahead team members
$.fn.teamTypeahead = function() {
  //$('.team-member #name').typeahead({
  this.typeahead({
    name: 'team-member',
    remote: { url: '../../api/walk_leaders?q=%QUERY', rateLimitWait: 100 },
    valueKey: 'first_name',
    template: function(datum) {
      return "<div class='datum'>" + (datum.avatar ? "<div style='background:url(" + datum.avatar + ")'></div>  " : "") + datum.first_name + " " + datum.last_name + (datum.city_name ? ", " + datum.city_name : "") + "</div>";
    },
  }).on('typeahead:selected', function (object, datum) {
    var teamMember = $(this).parents(".team-member").first();
    $('input[name=user_id\\[\\]]', teamMember).val(datum.user_id);
    if(!datum.last_name) {
      var twoNames = teamMember.first_name.split(' ');
      $('input[name=name-first\\[\\]]', teamMember).val(twoNames[0]);
      $('input[name=name-last\\[\\]]', teamMember).val(twoNames[1]);
    } else {
      $('input[name=name-first\\[\\]]', teamMember).val(datum.first_name);
      $('input[name=name-last\\[\\]]', teamMember).val(datum.last_name);
    }
    if(datum.facebook)
      $('#facebook', teamMember).val(datum.facebook);
    if(datum.twitter)
      $('input[name=twitter\\[\\]]', teamMember).val(datum.twitter);
    if(datum.website)
      $('input[name=website\\[\\]]', teamMember).val(datum.website);
    if(datum.bio)
      $('textarea[name=bio\\[\\]]', teamMember).text(datum.bio);
  });
}

window.Janeswalk = {
  initialize: function() {

    $('.brand i').transition({ y: 0 });

    // Append html
    if ($('body').hasClass('index')) {
      $('html').addClass('index-bg');
    }

    // WYSIWYG
    $('#longdescription').wysihtml5('bypassDefaults', {
      'image': false,
      parserRules: {
        tags: {
          p: {}
        }
      }
    });

    // Date Picker

    var now = moment().format('MMMM D, YYYY');
    var nowFormatted = moment().format('YYYY-MM-DD');

    $('.date-indicate-all, .date-indicate-set').html(now).attr('data-dateselected',nowFormatted);

    $('.date-picker').datepicker({
      format: 'mm/dd/yyyy',
      beforeShowDay: function (date) {
        var date_utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        
        var dateFormatted = moment(date_utc).format('YYYY-MM-DD');
        
        if ($.inArray(dateFormatted, dateSelected) != -1) {
          return {
            enabled : false,
            classes : 'selected'
          };
        }
      }
    }).on('changeDate', function(e){
      dateObject = moment(e.date).format('MMMM D, YYYY');
      dateObjectFormatted = moment(e.date).format('YYYY-MM-DD');
      $('.date-indicate-all, .date-indicate-set').html(dateObject).attr('data-dateselected',dateObjectFormatted);
    });

    $('#save-date-set').on('click', function(){
      var selectedDate = $('.date-indicate-set').text();
      var selectedTime = timeConvert($('#walk-time').val());
      var selectedDuration = $('#time-and-date-set #walk-duration').val();
      addDateSet(selectedDate, selectedDuration, selectedTime);
    });

    $('#save-date-all').on('click', function(){
      var selectedDate = $('.date-indicate-all').text();
      var selectedDuration = $('#time-and-date-all #walk-duration').val();
      var selectedDateFormatted = $('.date-indicate-all').attr('data-dateselected');
      addDateAll(selectedDate, selectedDuration, selectedDateFormatted);
      
      // Disable date in calendar widget
      dateSelected.push(selectedDateFormatted);

    });

    // Clear on switch over
    $('.clear-date').on('click', function(){
      dateSelected = [];
      $('#block-select li').removeClass('active');
      $('#date-list-all tbody, #date-list-set tbody').html('');
      $('.date-picker').datepicker('update');
    });

    $('#date-list-all tbody, #date-list-set tbody').on('click', '#remove-date', function(event){
      $(this).parentsUntil('tbody').remove();
      for (var i = 0; i < dateSelected.length; i++) {
        if (dateSelected[i] === $(this).data('datedelete')) {
          dateSelected.splice(i);
        }
      }
      return false;
    });

    // Only allow duration set 
    // $('[type="checkbox"][name="open"]').on('click', function(){
    //   if ($(this).)
    // });

    $('[type="checkbox"][name="open"]').change(function(){
      if ($(this).prop('checked') === true) {
        console.log('adad');
        $('#time-and-date-all .date-select-group').hide();
        $('#time-and-date-all .date-picker').css({'opacity':'0.25'});
      } else {
        $('#time-and-date-all .date-select-group').show();
        $('#time-and-date-all .date-picker').css({'opacity':'1'});
      }
    });


    // Form validation & Walkthrough
    // This only works in description for now

    $('.section-save').on('click', function(event){

      var invalidFields = $(this).parentsUntil('.main-panel').find('*:invalid').length;
      var themeSelect = $(this).parentsUntil('.main-panel').find('#theme-select input:checked').length 

      // Validation is limited to Description for now.

      if ($('.page-header').data('section') === 'description') { 

          if (invalidFields == 0 && themeSelect != 0) {
          // When the form validates
          $('#progress-panel').find('.active a .status').remove();
          $('#theme-select .alert').removeClass('alert-error').addClass('alert-info');
          $('#progress-panel .active a i.warning').remove();
          $('#progress-panel').find('.active a').removeClass('error');
          $('#progress-panel').find('.active a').append(' <i class="icon-check-sign complete status"></i>').addClass('complete');
        
          // $('#progress-panel li.active').next().addClass('active');
          
          // var url = $(this).data('next')+'.html';
          // $.pjax({url:url,container:'#main-panel',fragment:'#main-panel'});

          $('#progress-panel a[href='+$(this).attr('href')+']').tab('show');
        
          event.preventDefault();
        } else if (themeSelect == 0) {
          $('#progress-panel').find('.active a .status').remove();
          $('#progress-panel .active a i.complete').remove();
          $('#progress-panel').find('.active a').removeClass('complete');
          $('#progress-panel').find('.active a').append(' <i class="icon-warning-sign warning status"></i>').addClass('error');
          $('#theme-select .alert').removeClass('alert-info').addClass('alert-error');
          $('#progress-panel a[href='+$(this).attr('href')+']').tab('show');
          event.preventDefault();
        } else {
          $('#progress-panel').find('.active a .status').remove();
          $('#progress-panel .active a i.complete').remove();
          $('#progress-panel').find('.active a').removeClass('complete');
          $('#progress-panel').find('.active a').append(' <i class="icon-warning-sign warning status"></i>').addClass('error');
          $('#progress-panel a[href='+$(this).attr('href')+']').tab('show');
        }
      }
    });

    // Adding New Team Members 
    $('#add-member').on('click', 'section', function(){
      var newTarget = $(this).data('new');
      addMember(newTarget, function(){
        $('body').animate({ scrollTop: $('.new').last().offset().top-80 }, 1000);
      });
    });

    $('footer').on('click', '.remove-team-member', function() {
      $(this).parentsUntil('#walk-members').remove();
      tipLoader();
    });

    // Primary Walk Leader expose
    $('#role').change(function(){
      if ($(this).val() == "co-walk-leader") {
        $('#primary-walkleader-select').removeClass('hide');
      } else {
        $('#primary-walkleader-select').addClass('hide');
      }
    });

    // Autotabbing for telephone numbers
    $('.tel :input').autotab_magic();

    // Notifications
    // Previewing Button
    $('#preview-walk').on('click', function(){
      $('#preview-modal').find('iframe').prop('src', previewUrl);
      $('#preview-modal').modal('show');
    });

   $('#preview-modal').on('show', function () {

    windowHeight = $(window).height()-220;

    $(this).find('.modal-body').css({width:'auto',
                     height:windowHeight, 
                    'max-height':'100%'});

   });

   $(window).resize(function() {

    windowHeight = $(window).height()-220;
    $('#preview-modal').find('.modal-body').css({width:'auto',
                     height:windowHeight, 
                    'max-height':'100%'});
   });

    // Publish Walk Button
    $('#btn-submit').on('click', function(){
      $('#publish-warning').modal();
    })

    // Nutshell Limiting
    $('.limit').limit({
      'counter':'.counter'
    });

    // Theme selection limiting
    $('#theme-select input[type=checkbox]').on('click', function(){
      if ($('#theme-select input[type=checkbox]:checked').length > 2) {
        $("#theme-select input[type=checkbox]:not(:checked)").prop('disabled', true);
      } else {
        $("#theme-select input[type=checkbox]:not(:checked)").prop('disabled', false);
      }
    });

    // Adding Resource
    $('#add-resource').on('click', function(event){
      var obj = addResource();
      // $('body').animate({ scrollTop: $('.new').last().offset().top-80 }, 1000);
      return false;
    });

    $('footer').on('click', '.remove-resourceitem', function() {
      $(this).parentsUntil('#resource-list').remove();
      tipLoader();
      return false;
    });


    // New Session Populate
    var walkTitle = $.paramsURL('title');
    var walkDescription = $.paramsURL('description');
    if (walkTitle != null) {
      $('#title').val(unescape(walkTitle));      
    }
    if (walkDescription != null) {
      $('#shortdescription').html(unescape(walkDescription));
    }

    // Time Picker
    $('#walk-time').timepicker({ 'timeFormat': 'h:i A' });

    // Save Handler
    // Populate data if available
    // This data could be in the dom, or the url to the data could be in the dom as a js var, this example (/form.html?load=/js/sample.json) loads it from a url param
    var newPage = false;
    var dataUrl = $(".pagejson").data("url") + "?format=json";
    var previewUrl = $(".pagejson").data("url");

    var notify_success = function() {
      $('body').append('<div class="alert alert-success" id="save-notify">Walk Saved</div>');
      setTimeout( function() {
        $('#save-notify').fadeOut('slow', function(){
          $(this).remove();
          });
        },2000);
    }
    var notify_error = function(error) {
      $('body').append('<div class="alert alert-error" id="save-notify">' + error.responseText + '</div>');
      setTimeout( function() {
        $('#save-notify').fadeOut('slow', function(){
          $(this).remove();
          });
        },2000);
    }

    $('.save, .btn-preview, .section-save').on('click', function(e){
      // Run validation first?
      $.ajax({
        type: "PUT",
        url: dataUrl,
        data: {json: JSON.stringify( JaneswalkData.build() )},
        success: notify_success,
        error: notify_error
        });
    });
    $('.btn-submit').click(function(e){
      $.ajax({
        type: "POST",
        url: dataUrl,
        data: {json: JSON.stringify( JaneswalkData.build() )},
        success: function() { console.log("Published Walk"); }
        });
      });

    if (dataUrl != null){
      $('.progress-spinner').spin(spinProperties);
      $.getJSON(dataUrl, function(data){
        JaneswalkData.fill(data);
      })
      .fail(function(){
        console.log("server error");
      })
      .always(function(){
        $('.progress-spinner').spin(false);
      });
    }
  }
};

function addMember(newTarget, callback){
  var obj = $('#'+newTarget).clone(true,true).appendTo('#walk-members').addClass('new useredited').show();
  $("#name",obj).teamTypeahead();
  tipLoader();
  $('.tel :input').autotab_magic();
  if (callback){
    callback();
  }
  return obj;
}

function addDateSet(selectedDate, selectedDuration, selectedTime){
  var inputs = '<input type="hidden" name="date-date[]" value="'+selectedDate+'">'+
  '     <input type="hidden" name="date-time[]" value="'+selectedTime+'">'+
  '     <input type="hidden" name="date-duration[]" value="'+selectedDuration+'">';
  var dateRow = '<tr><td>'+inputs+'<strong>'+selectedDate+'</strong></td><td>'+selectedTime+'</td><td><a href="#" id="remove-date"><i class="icon-remove"></i> Remove</a></td></tr>';
  $('#date-list-set tbody').append(dateRow);
}

function addDateAll(selectedDate, selectedDuration, selectedDateFormatted){
  var inputs = '<input type="hidden" name="date-date[]" value="'+selectedDate+'">'+
  '     <input type="hidden" name="date-duration[]" value="'+selectedDuration+'">';
  var dateRow = '<tr><td>'+inputs+'<strong>'+selectedDate+'</strong></td><td>'+selectedDuration+'</td><td><a href="#" id="remove-date" data-datedelete="'+selectedDateFormatted+'"><i class="icon-remove"></i> Remove</a></td></tr>';
  $('#date-list-all tbody').append(dateRow);
}

function addResource(){
  var obj = $('.resource-item-new.hide').clone(true,true).appendTo('#resource-list').addClass('new').removeClass('hide');
  tipLoader();
  return obj;
}

var globalThumbId;

// Data
var JaneswalkData = {
  description: ['title','shortdescription', 'longdescription'],
  accessible: ['accessible-info', 'accessible-transit', 'accessible-parking', 'accessible-find'],
  data: {},
  build: function(step) {
    this.dataSet= {};
    if (step == null){
      step = false;
    }

    var self = this,
      name,
      value,
      file,
      desc;

    if (step === 1 || step === false){
      // Description
      $.each(this.description, function(key, value){
        self.dataSet[value] = $('[name="'+value+'"]').val();
      });

      // Theme checkboxes
      self.dataSet.checkboxes = {};
      $('[type="checkbox"][name^="theme-"]').each(function(){
        name = $(this).attr('name');
        value = $(this).prop('checked');
        self.dataSet.checkboxes[name] = value;
      });

      // Resources
      self.dataSet.resources = {};
      $('.resource-item, .resource-item-new').not('.hide').each(function(key, value){
        file = $(this).find('[name="resource-file[]"]').val();
        title = $(this).find('[name="resource-title[]"]').val();
        desc = $(this).find('[name="resource-description[]"]').val();
        self.dataSet.resources[key] = {file: file, title: title, description: desc};
      });
    }

    if (step === 2 || step === false){
      // Map
      self.dataSet.map = {};
      self.dataSet.map.markers = {};
      $.each(jwMap.markers, function(key, val){
        self.dataSet.map.markers[key] = {
          title: val.title,
          description: val.description,
          questions: val.questions,
          style: val.style,
          lat: val.getPosition().lat(),
          lng: val.getPosition().lng()
        };
      });
      self.dataSet.map.route = {};
      $.each(jwMap.point, function(key, val){
        self.dataSet.map.route[key] = {
          lat: val.getPosition().lat(),
          lng: val.getPosition().lng(),
          title: val.title
        };
      });
    }

    if (step === 3 || step === false){
      // Time - get type, and then get list of slots
      self.dataSet.time = {};
      self.dataSet.time.slots = {};
      if ($('#time-and-date-all').hasClass('active')){
        self.dataSet.time.type = 'all';
        self.dataSet.time.open = $('[type="checkbox"][name="open"]').prop('checked');
        $('#date-list-all tbody tr').each(function(key, value){
          self.dataSet.time.slots[key] = {date: $(this).find('[name="date-date[]"]').val(), duration: $(this).find('[name="date-duration[]"]').val()};
        });
      } else if ($('#time-and-date-set').hasClass('active')){
        self.dataSet.time.type = 'set';
        $('#date-list-set tbody tr').each(function(key, value){
          self.dataSet.time.slots[key] = {date: $(this).find('[name="date-date[]"]').val(), time: $(this).find('[name="date-time[]"]').val(), duration: $(this).find('[name="date-duration[]"]').val()};
        });
      } else {
        self.dataSet.time.type = false;
      }
    }

    if (step === 4 || step === false){
      // Accessible
      $.each(this.accessible, function(key, value){
        self.dataSet[value] = $('[name="'+value+'"]').val();
      });

      // Accessible checkboxes
      $('[type="checkbox"][name^="accessible-"]').each(function(){
        name = $(this).attr('name');
        value = $(this).prop('checked');
        self.dataSet.checkboxes[name] = value;
      });
    }

    if (step === 5 || step === false){
      // Team
      self.dataSet.team = {};
      var member;
      $('.team-member.useredited').each(function(key, val){
        member = {
          'user_id': $(this).find('[name="user_id[]"]').val(),
          'type': $(this).find('[name="type[]"]').val(),
          'profile-photo': $(this).find('[name="profile-photo[]"]').val(),
          'name-first': $(this).find('[name="name-first[]"]').val(),
          'name-last': $(this).find('[name="name-last[]"]').val(),
          'role': $(this).find('[name="role[]"]').val(),
          'primary': $(this).find('[name="primary[]"]').val(),
          'bio': $(this).find('[name="bio[]"]').val(),
          'twitter': $(this).find('[name="twitter[]"]').val(),
          'facebook': $(this).find('[name="facebook[]"]').val(),
          'website': $(this).find('[name="website[]"]').val(),
          'email': $(this).find('[name="email[]"]').val(),
          'institution': $(this).find('[name="institution[]"]').val()
        };

        var phone1 = $(this).find('[name="phone-1[]"]').val();
        var phone2 = $(this).find('[name="phone-2[]"]').val();
        var phone3 = $(this).find('[name="phone-2[]"]').val();
        if (phone1 != undefined && phone2 != undefined && phone3 != undefined){
          member.phone = $(this).find('[name="phone-1[]"]').val()+'-'+$(this).find('[name="phone-2[]"]').val()+'-'+$(this).find('[name="phone-3[]"]').val()
        } else {
          member.phone = false;
        }

        self.dataSet.team[key] = member;
      });
    }

    self.dataSet.thumbnail_id = globalThumbId;

    console.log(this.dataSet);
    console.log(JSON.stringify(this.dataSet));
    return this.dataSet;
  },

  fill: function(data){
    this.data = data;
    // Standard fields
    $.each(data, function(key, val){
      var obj = $('[name="'+key+'"]');
      if (obj.length > 0){
        if (obj.is('textarea')){
          obj.html(val);
          if (key == 'longdescription'){
            $('#longdescription').data("wysihtml5").editor.setValue(val);
          }
        } else {
          obj.val(val);
        }
      }
      else if(key == 'thumbnail_id' && val) {
        var thumbLoad = $("iframe.walkphotos");
        var ifUrl = thumbLoad.attr('src');
        ifUrl = ifUrl.substring(0, ifUrl.indexOf("tools")) + "tools/files/importers/quick?fID=" + val;
        globalThumbId = val;
        thumbLoad.attr('src',ifUrl);
      }
    });

    // Checkboxes
    if (typeof(data.checkboxes) != "undefined"){
      $.each(data.checkboxes, function(key, val){
        var obj = $('[name="'+key+'"]');
        if (obj.length > 0){
          obj.prop('checked', val);
        }
      });
    }

    // Resources
    if (typeof(data.resources) != "undefined"){
      $.each(data.resources, function(key, val){
        var newObj = addResource();
        $.each(val, function(key, val){
          if (key != 'file'){
            newObj.find('[name="resource-'+key+'[]"]').val(val);
          } else {
            // format file box if file already exists
          }
        });
      });
    }

    // Time and Date
    if (typeof(data.time.type) != "undefined" && data.time.type !== false){

      if (data.time.type == 'all'){
        $('a[href="#time-and-date-all"]').tab('show');
      } else {
        $('a[href="#time-and-date-set"]').tab('show');
      }
      
      $.each(data.time.slots, function(key, val){
        if (data.time.type == 'all'){
          addDateAll(val.date, val.duration, val.time);
        } else {
          addDateSet(val.date, val.duration, val.time);
        }
      });
    }

    // Team
    if (typeof(data.team) != "undefined"){
      $.each(data.team, function(key, member){
        var newTarget,
        obj;
        // you, leader, organizer, community, volunteer
        if (member.type == 'you'){
          obj = $('#walk-leader-me');
        } else if (member.type == 'leader'){
          newTarget = 'walk-leader-new';
          obj = addMember(newTarget);
        } else if (member.type == 'organizer'){
          newTarget = 'walk-organizer-new';
          obj = addMember(newTarget);
        } else if (member.type == 'community'){
          newTarget = 'community-voice-new';
          obj = addMember(newTarget);
        } else if (member.type == 'volunteer'){
          newTarget = 'othermember-new';
          obj = addMember(newTarget);
        }
        JaneswalkData.teamPopulate(member, obj);
      });
    }
  },

  mapPopulate: function(jwMap) {
    if (typeof(this.data.map) != "undefined"){
      if (typeof(this.data.map.markers) != "undefined"){
        $.each(this.data.map.markers, function(key, marker){
          if(marker.lat && marker.lng) {
            if (marker.style == 'meeting'){
              jwMap.addmeetingplace(null, marker.title, marker.description, marker.lat, marker.lng);
            } else {
              jwMap.addmarker(null, marker.title, marker.description, marker.questions, marker.lat, marker.lng);
            }
          }
        });
      }
      if (typeof(this.data.map.route) != "undefined"){
        $.each(this.data.map.route, function(key, point){
          jwMap.addlines(null, point.title, point.lat, point.lng);
        });
      }
      jwMap.centerRoute();
    }
  },

  teamPopulate: function(data, target){
    $.each(data, function(key, val){
      var obj = $(target).find('[name="'+key+'[]"]');
      if (obj.length > 0 && (obj.is('input') && (obj.attr('type') == 'text' || obj.attr('type') == 'email')) || obj.is('textarea') || obj.is('select')){
        obj.val(val).change();
      } else if (obj.length > 0 && obj.is('input') && obj.attr('type') == 'checkbox'){
        obj.prop('checked', val);
      }

      if (key == 'phone' && val !== false){
        $(target).find('[name="phone[]"]').val(val);
      }
    });
  }
};

// Pull params from URLs
function parseUrl( url ) {
    var fakelink = document.createElement('a');
    fakelink.href = url;
    return fakelink;
}

// Handling tips
var tipLoader = function() {
  $('.tip').transition({ y: '0px',opacity:0 }).each(function(index) {
    $(this).animate({'opacity':0}, 'fast', function(){
      $(this).removeClass('in');
      var formTip = $('.tip').eq(index).data('tipfor');
      var itemTarget = $('#main-panel .active #'+formTip);
      if (itemTarget.length > 0) {
        $('.tip').eq(index).addClass('in');
      }
    });
  });
  setTimeout(function(){
    $('.tip.in').transition({ y: '20px',opacity:1 });
  },1000);
}

// File uploader
var walkSetImage = function( fileId ) {
  globalThumbId = fileId;
}

// Spinner Props
var spinProperties = {lines:10,length:15,width:5,radius:30};

// On page load
$(function() {
  // Loader
  $('.progress-spinner').spin(spinProperties);
  Janeswalk.initialize();
});

$(window).load(function() {
  tipLoader();
  var jwMap = {};
  $('.progress-spinner').spin(false);
  $('.tag').tooltip({
    trigger: 'hover',
    placement: 'bottom'
  });

  // Scroll top on tab change 
  $('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
    tipLoader();
    $('body').scrollTop(0);
    $('.walk-submit').addClass('hide');
  });

  // Set DOM listener on page load.
  if ($('#map-canvas').length > 0) {
    // Let's be rid of this gmapinit malarkey
    jwMap = new JaneswalkMapEditor('#map-canvas');
    JaneswalkData.mapPopulate(jwMap);
  }

  $('a[href="#route"][data-toggle="tab"]').on('shown.bs.tab', function(e) {
    google.maps.event.trigger(jwMap.map, 'resize');
    jwMap.centerRoute();
    tipLoader();
  });
});

// Prototype Modal
setTimeout( function() {
  $('#prototype').modal();
},2000);

