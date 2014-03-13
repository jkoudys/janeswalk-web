<?php defined('C5_EXECUTE') or die(_("Access Denied.")); ?>
<script type="text/javascript">
JanesWalk = {
  page: {
    url: 'http://' + (location.host) + (location.pathname),
    title: '<?= addslashes($c->getCollectionName()) ?>',
  },
  city: {
    name: '<?=addslashes($city->getCollectionName())?>',
    url: '<?=$nh->getCollectionURL($city)?>',
    lat: <?= $lat ?>,
    lng: <?= $lng ?>
  },
  form: {
    timepicker_cfg: { 
      defaultTime: '9:00 AM',
      <?php if($is_nyc) { ?>
        step: 180,
        disableTimeRanges: [ ['12am','8:59am'], ['9:01pm','11:59pm'] ],
      <?php } ?>
      timeFormat: 'h:i A' 
    },
    datepicker_cfg: {
      format: 'dd/mm/yyyy',
      beforeShowDay: function (date) {
        var date_utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        var dateFormatted = moment(date_utc).format('YYYY-MM-DD');
        if ($.inArray(dateFormatted, dateSelected) != -1) {
          return {
            enabled : false,
            classes : 'selected'
          };
        }
      },
      <?php if($is_nyc) { ?>
        startDate: new Date("May 3, 2014"),
        endDate: new Date("May 4, 2014")
      <?php } else { ?>
        startDate: new Date("May 2, 2014"),
        endDate: new Date("May 4, 2014")
      <?php } ?> 
    }
  }
};
<?php if($is_nyc) { ?>
JanesWalk.form['2014-05-04'] = {
  timepicker_cfg: {
    defaultTime: '9:00 AM',
    step: 180,
    disableTimeRanges: [ ['12am','8:59am'], ['3:01pm','11:59pm'] ],
    timeFormat: 'h:i A' 
  }
}
<?php } ?>
</script>

<div style='display:none' class='pagejson' data-url='<?=$nh->getCollectionURL($c)?>'></div>
<div class="navbar navbar-inverse navbar-fixed-top">
  <div class="navbar-inner">
    <div class="container-fluid">
      <span class="brand">
        <a href="<?= $nh->getCollectionURL($city) ?>" target="_blank">
          <i class="icon-map-marker"><?="{$city->getCollectionName()}, {$country->getCollectionName()}" ?></i>
        </a>
      </span>
      <div class="nav-collapse collapse">
        <p class="navbar-text pull-right">
          Logged in as <a href="<?=$this->url('/profile')?>" class="navbar-link" target="_blank"><?= $u->getUserName(); ?></a>
        </p>
      </div><!--/.nav-collapse -->
    </div>
  </div>
</div>
<div class="container-fluid form-container">
  <div class="row-fluid">
    <div class="span2">
      <div id="progress-panel">
        <div class="tabbable tabs-left">
          <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" class="description" href="#description"><i class="icon-list-ol"></i> Describe Your Walk</a></li>
            <li ><a data-toggle="tab" class="route" href="#route"><i class="icon-map-marker"></i> Share Your Route</a></li>
            <li ><a data-toggle="tab" class="time-and-date" href="#time-and-date"><i class="icon-calendar"></i> Set the Time & Date</a></li>
            <li ><a data-toggle="tab" class="accessibility" href="#accessibility"><i class="icon-flag"></i> Make it Accessible</a></li>
            <li ><a data-toggle="tab" class="team" href="#team"><i class="icon-group"></i> Build Your Team</a></li>
          </ul>
          <br>
          <section id="button-group">
            <button class="btn btn-info btn-preview" id="preview-walk" title="Preview what you have so far." data-previewurl="<?=str_replace("format=json","format=html",$_REQUEST['load']); ?>">Preview Walk</button>
            <button class="btn btn-info btn-submit" id="btn-submit" title="Publishing will make your visible to all.">Publish Walk</button>
            <button class="btn btn-info save" title="Save and return later" id="btn-save">Save and return later</button>
          </section>
        </div>
      </div>
    </div>
    <div class="span7" id="main-panel" role="main">
      <div class="tab-content">
        <div class="tab-pane active" id="description">
          <div class="walk-submit lead">
            <div class="row-fluid">
              <div class="span4">
                <img id="convo-marker" src="<?=$this->getThemePath();?>/img/jw-intro-graphic.svg" alt="Jane's Walk are walking conversations.">
              </div>
              <div class="span8"><h1>Hey there <?=$ui->getAttribute('first_name')?>!</h1>
                <p>Jane’s  Walks  are   walking  conversation  about  neighbourhoods .  You can return to this form at any time, so there's no need to finish everything at once.</p></div>
            </div>
          </div>
          <div class="page-header" data-section='description'>
            <h1>Describe Your Walk</h1>
          </div>
          <form>
            <fieldset>
              <div class="item required">
                <label for="title">Walk Title</label>
                <div class="alert alert-info">Something short and memorable.</div>
                <input type="text" id="title" name="title" placeholder="" value="<?=htmlspecialchars($c->getCollectionname())?>" required>
              </div>
            </fieldset>
          </form>
          <form method="post" enctype="multipart/form-data" action="<?=REL_DIR_FILES_TOOLS_REQUIRED?>/files/importers/quick" class="ccm-file-manager-submit-single">
            <hr>
            <div class="item required">
              <label for="walkphotos" id="photo-tip">Upload a photo that best represents your walk.</label>
              <iframe class="walkphotos" src="<?=REL_DIR_FILES_TOOLS?>/files/image_upload"></iframe> 
            </div>
          </form>
          <form>
            <hr>
            <fieldset>
              <div class="item required">
                <label for="shortdescription">Your Walk in a Nutshell</label>
                <div class="alert alert-info">Build intrigue! This is what people see when browsing our walk listings.</div>
                <textarea class="span12 limit" id="shortdescription" name="shortdescription" rows="2" maxlength="140" required><?=htmlspecialchars($c->getAttribute('shortdescription'))?></textarea>
                <div class="text-right">
                  <p>Characters left: <span class="counter">140</span></p>
                </div>
              </div>
              <hr>
              <div class="item required">
                <label for="longdescription" id="longwalkdescription">Walk Description</label>
                <div class="alert alert-info">
                  Help jump start the conversation on your walk by giving readers an idea of the discussions you'll be having on the walk together. We suggest including a couple of questions to get people thinking about how they can contribute to the dialog on the walk. To keep this engaging, we recommend keeping your description to 200 words. 
                </div>
                <textarea class="textarea-wysiwyg span12" id="longdescription" name="longdescription" rows="14"></textarea>
              </div>
            </fieldset>
            <?php if($wards) { ?>
            <fieldset id="wards">
              <div class="item">
                <label for="wards">Sub-locality</label>
                <div class="alert alert-info">Choose a specific neighbourhood or area where your walk will take place.</div>
                <?php foreach($wards as $ward) { ?>
                  <label class="ward"><input type="radio" name="ward" <?= $ward->selected ? 'checked' : '' ?> value="<?= addslashes($ward->value) ?>"><?= $ward->value ?></input></label>
                <?php } ?>
              </div>
            </fieldset>
            <?php } ?>

            <?php /*  <fieldset>
              <legend>Additional Resources (Optional)</legend>
              <div class="alert alert-info">Upload a file such as a PDF, or provide a link to a relevant website or video. Please include no more than 3 additional references.</div>


              <ul class="unstyled" id="resource-list">
                <li class="resource-item">
                  <div class="thumbnail">
                    <div class="caption">

                      <div class="row-fluid">
                        <div class="span5 item-select">
                          <label for="name">Upload document</label>
                          <input type="file" name="resource-file[]">
                          <div class="separator text-center">
                            <h2 class="lead">or</h2>
                          </div>
                          <label for="name">Share link</label>
                          <input class="input-link" type="text" placeholder="Website address" name="resource-title[]">
                        </div>
                        <div class="span7 item-text">
                          <input type="text" placeholder="Resource Title" name="resource-title[]">
                          <textarea class="limit" rows="2" placeholder="Description" name="resource-description[]"></textarea>
                          <div class="text-right">
                            <p></p>Characters left: <span class="counter ">140</span></p>
                        </div>
                      </div>
                    </div>

                    <footer>
                      <a href="#" class="btn remove-resourceitem">Remove Resource</a>
                    </footer>
                  </div>
                </div>
              </li>


              <li class="resource-item-new hide">
                <div class="thumbnail">
                  <div class="caption">

                    <div class="row-fluid">
                      <div class="span5 item-select">
                        <label for="name">Upload document</label>
                        <input type="file" name="resource-file[]">
                        <div class="separator text-center">
                          <h2 class="lead">or</h2>
                        </div>
                        <label for="name">Share link</label>
                        <input class="input-link" type="text" placeholder="Website address" name="resource-title[]">
                      </div>
                      <div class="span7 item-text">
                        <input type="text" placeholder="Resource Title" name="resource-title[]">
                        <textarea class="limit" rows="2" placeholder="Description" name="resource-description[]"></textarea>
                        <div class="text-right">
                          <p></p>Characters left: <span class="counter ">140</span></p>
                      </div>
                    </div>
                  </div>

                  <footer>
                    <a href="#" class="btn remove-resourceitem">Remove Resource</a>
                  </footer>
                </div>
              </div>
            </li>

          </ul>

          <a href="#" class="btn btn-info" id="add-resource">Add Another Resource</a>

          </fieldset> */ ?>
        <?php if(!$is_nyc) { ?>
        <fieldset id="theme-select">
          <legend class="required-legend">Themes</legend>
          <div class="alert alert-info">
            Pick between 1 and 3 boxes.
          </div>

          <div class="item">
            <div class="row-fluid">
              <div class="span6">
                <fieldset>
                  <legend>Nature</legend>
                  <label class="checkbox"><input type="checkbox" name="theme-nature-naturelover">  The Nature Lover</label>
                  <label class="checkbox"><input type="checkbox" name="theme-nature-greenthumb">  The Green Thumb</label>
                  <label class="checkbox"><input type="checkbox" name="theme-nature-petlover">  The Pet Lover</label>
                </fieldset>
              </div>

              <div class="span6">
                <fieldset>
                  <legend>Urban Planning</legend>
                  <label class="checkbox"><input type="checkbox" name="theme-urban-suburbanexplorer">  The Suburban Explorer</label>
                  <label class="checkbox"><input type="checkbox" name="theme-urban-architecturalenthusiast">  The Architectural Enthusiast</label>
                  <label class="checkbox"><input type="checkbox" name="theme-urban-moversandshakers">  The Movers &amp; Shakers (Transportation)</label>
                </fieldset>
              </div>
            </div>
          </div>

          <div class="item">
            <div class="row-fluid">
              <div class="span6">

                <fieldset>
                  <legend>Culture</legend>

                  <label class="checkbox"><input type="checkbox" name="theme-culture-historybuff">  The History Buff</label>
                  <label class="checkbox"><input type="checkbox" name="theme-culture-artist">  The Artist</label>
                  <label class="checkbox"><input type="checkbox" name="theme-culture-aesthete">  The Aesthete</label>
                  <label class="checkbox"><input type="checkbox" name="theme-culture-bookworm">  The Bookworm</label>
                  <label class="checkbox"><input type="checkbox" name="theme-culture-foodie">  The Foodie</label>
                  <label class="checkbox"><input type="checkbox" name="theme-culture-nightowl">  The Night Owl</label>
                  <label class="checkbox"><input type="checkbox" name="theme-culture-techie">  The Techie</label>
                  <label class="checkbox"><input type="checkbox" name="theme-culture-writer">  The Writer</label>
                </fieldset>
              </div>
              <div class="span6">
                <fieldset>
                  <legend>Civic Engagement</legend>
                  <label class="checkbox"><input type="checkbox" name="theme-civic-activist">  The Activist</label>
                  <label class="checkbox"><input type="checkbox" name="theme-civic-truecitizen">  The True Citizen</label>
                  <label class="checkbox"><input type="checkbox" name="theme-civic-goodneighbour">  The Good Neighbour</label>
                </fieldset>
              </div>
            </div>
          </div>
        </fieldset>
<?php
        } // end NYC check ?>
        <hr>
        <input class="btn btn-primary btn-large section-save" type="submit" value="Next" data-next="route" href="#route"><br><br>
      </form>
    </div>

    <div class="tab-pane" id="route">
      <div class="page-header" data-section="route">
        <h1>Share Your Route</h1>
      </div>

      <div id="route-help-panel">
        <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#route-menu" href="#route-menu"><h2 class="lead">Need help building your route?</h2></a>

        <div id="route-menu" class="collapse" style="height:0;">
          <div class="row-fluid">
            <div class="span4">
              <h4>1. Set a Meeting Place</h4>
              <ol>
                <li>Click "Meeting Place" to add a pinpoint on the map</li>
                <li>Click and drag it into position</li> 
                <li>Fill out the form fields and press Save Meeting Place</li> 
              </ol>
            </div>
            <div class="span4">
              <h4>2. Add Stops</h4>
              <ol>
                <li>Click "Add Stop" to add a stop on the map</li>
                <li>Click and drag it into position</li> 
                <li>Fill out the form fields and press Save Stop</li> 
                <li>Repeat to add more stops</li>
              </ol>
            </div>
            <div class="span4"> 
              <h4>3. Add Route</h4>
              <ol>
                <li>Click Add Route</li>
                <li>A point will appear on your meeting place, now click on each of the stops that flow to connect them.</li>
                <li>Click and drag the circles on the orange lines to make the path between each stop. Right click on a point to delete it.</li>
                <li>Click Save Route</li></ol>
              <ul>
                <li>If you want to delete your route to start over, click <a href="" class="clear-route">Clear Route</a>. Your Stops will not be deleted</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="row-fluid" id="map-control-bar">
        <button id="addmeetingplace" class="btn span1"><i class="icon-flag-jw"></i> Set a Meeting Place</button>
        <div class="addroute-wrapper span1"><button id="addpoint" class="btn"><i class="icon-map-marker-jw"></i> Add Stop</button><div class="disable-alert"></div></div>
        <button id="addroute" class="btn span1"><i class="icon-map-route"></i> Add Route</button>
        <button class="btn clear-route span1"><i class="icon-eraser"></i> Clear Route</button>

      </div>
      <div class="map-notifications"></div>
      <div id="map-canvas"></div>

      <h3>Walk Stops</h3>

      <table id="route-stops" class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3"><p>You haven't set any stops yet.</p></td>
          </tr>
        </tbody>
      </table>

      <hr>
      <a href="#time-and-date" class="btn btn-primary btn-large section-save" data-toggle="tab">Next</a><br><br>
    </div>

    <div class="tab-pane" id="time-and-date">
      <div class="tab-content" id="walkduration">
        <div class="tab-pane active" id="time-and-date-select">
          <div class="page-header" data-section='time-and-date'>
            <h1>Set the Time and Date</h1>
          </div>
          <legend >Pick one of the following:</legend>
          <div class="row-fluid">
            <ul class="thumbnails" id="block-select">
              <?php if(!in_array($city->getCollectionID(), [235, 276])) { ?>
              <li class="span6">
                <a href="#time-and-date-all" data-toggle="tab">
                  <div class="thumbnail">
                    <img src="<?=$this->getThemePath();?>/img/time-and-date-full.png" />
                    <div class="caption">
                      <div class="text-center">
                        <h4>By Request</h4>
                      </div>
                      <p>Highlight times that you're available to lead the walk, or leave your availability open. People will be asked to contact you to set up a walk.</p>
                    </div>
                  </div>
                </a>
              </li>
              <?php } ?>
              <li class="span6">
                <a href="#time-and-date-set" data-toggle="tab">
                  <div class="thumbnail">
                    <img src="<?=$this->getThemePath();?>/img/time-and-date-some.png" />
                    <div class="caption">
                      <div class="text-center">
                        <h4>Scheduled</h4>
                      </div>
                      <p>Set specific dates and times that this walk is happening.</p>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="tab-pane hide" id="time-and-date-set">
          <div class="page-header" data-section='time-and-date'>
            <h1>Time and Date</h1>
            <p class="lead">Select the date and time your walk is happening.</p>
          </div>

          <div class="row-fluid">
            <div class="span6">
              <div class="date-picker"></div>
            </div>
            <div class="span6">
              <div class="thumbnail">
                <div class="caption">
                  <small>Date selected:</small>
                  <h4 class="date-indicate-set" data-dateselected=""></h4>
                  <hr>
                  <label for="walk-time">Start Time:</label>

                  <input id="walk-time" type="text" class="time ui-timepicker-input input-small" autocomplete="off">

                  <label for="walk-time">Approximate Duration of Walk:</label>
                  <select name="duration" id="walk-duration">
                    <option value="30 Minutes">30 Minutes</option>
                    <option value="1 Hour">1 Hour</option>
                    <option value="1 Hour, 30 Minutes" selected>1 Hour, 30 Minutes</option>
                    <option value="2 Hours">2 Hours</option>
                    <option value="2 Hours, 30 Minutes">2 Hours, 30 Minutes</option>
                    <option value="3 Hours">3 Hours</option>
                    <option value="3 Hours, 30 Minutes">3 Hours, 30 Minutes</option>
                  </select><hr>
                  <button class="btn btn-primary" id="save-date-set">Add Date</button>
                </div>
                
              </div>
            </div>
          </div>

          <br>
          <table class="table table-bordered table-hover" id="date-list-set">
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>


          <hr>
          <a href="#time-and-date-select" data-toggle="tab" class="clear-date">Clear schedule and return to main Time and Date page</a>

          <hr>
          <a href="#accessibility" class="btn btn-primary btn-large section-save" data-toggle="tab">Next</a><br><br>
        </div>
        <div class="tab-pane hide" id="time-and-date-all">
          <div class="page-header" data-section='time-and-date'>
            <h1>Time and Date</h1>
            <p class="lead">Your availability will be visible to people on your walk page and they’ll be able to send you a walk request.</p>
          </div>
          <label class="checkbox">
            <input type="checkbox" name="open"> Leave my availability open. Allow people to contact you to set up a walk.
          </label>
          <br>

          <div class="row-fluid">
            <div class="span6">
              <div class="date-picker"></div>
            </div>
            <div class="span6">
              <div class="thumbnail">
                <div class="caption">
                  <div class="date-select-group">
                    <small>Date selected:</small>
                    <h4 class="date-indicate-all"></h4>
                    <hr>
                  </div>
                  <label for="walk-duration">Approximate Duration of Walk:</label>
                  <select name="duration" id="walk-duration">
                    <option value="30 Minutes">30 Minutes</option>
                    <option value="1 Hour">1 Hour</option>
                    <option value="1 Hour, 30 Minutes" selected>1 Hour, 30 Minutes</option>
                    <option value="2 Hours">2 Hours</option>
                    <option value="2 Hours, 30 Minutes">2 Hours, 30 Minutes</option>
                    <option value="3 Hours">3 Hours</option>
                    <option value="3 Hours, 30 Minutes">3 Hours, 30 Minutes</option>
                  </select>
                  <div class="date-select-group">
                    <hr>
                    <button class="btn btn-primary" id="save-date-all">Add Date</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br>
          <table class="table table-bordered table-hover" id="date-list-all">
            <thead>
              <tr>
                <th>My Available Dates</th>
                <th>Approximate Duration</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>

          <hr>
          <a href="#time-and-date-select" data-toggle="tab" class="clear-date">Clear schedule and return to main Time and Date page</a>

          <hr>
          <a href="#accessibility" class="btn btn-primary btn-large section-save" data-toggle="tab">Next</a><br><br>
        </div>
      </div>
    </div>

    <div class="tab-pane" id="accessibility">
      <div class="page-header" data-section='accessibility'>
        <h1>Make it Accessible</h1>
      </div>
      <div class="item">
        <fieldset>
          <legend class="required-legend">How accessible is this walk?</legend>
          <div class="row-fluid">
            <div class="span6">
              <label class="checkbox"><input type="checkbox" name="accessible-familyfriendly">  Family friendly</label>
              <label class="checkbox"><input type="checkbox" name="accessible-wheelchair">  Wheelchair accessible</label>
              <label class="checkbox"><input type="checkbox" name="accessible-dogs">  Dogs welcome</label>
              <label class="checkbox"><input type="checkbox" name="accessible-strollers">  Strollers welcome</label>
              <label class="checkbox"><input type="checkbox" name="accessible-bicycles">  Bicycles welcome</label>
            </div>
            <div class="span6">
              <label class="checkbox"><input type="checkbox" name="accessible-steephills">  Steep hills</label>
              <label class="checkbox"><input type="checkbox" name="accessible-uneven">  Wear sensible shoes (uneven terrain)</label>
              <label class="checkbox"><input type="checkbox" name="accessible-busy">  Busy sidewalks</label> 
              <label class="checkbox"><input type="checkbox" name="accessible-bicyclesonly">  Bicycles only</label>
            </div>
          </div>
        </fieldset>
      </div>

      <div class="item">
        <fieldset>
          <legend>What else do people need to know about the accessibility of this walk? (Optional)</legend>
          <textarea rows="3" name="accessible-info"></textarea>
        </fieldset>
      </div>

      <div class="item">
        <fieldset>
          <legend id="transit">How can someone get to the meeting spot by public transit? (Optional)</legend>
          <div class="alert alert-info">
            Nearest subway stop, closest bus or streetcar lines, etc.
          </div>
          <textarea rows="3" name="accessible-transit"></textarea>
        </fieldset>
      </div>

      <div class="item">
        <fieldset>
          <legend>Where are the nearest places to park? (Optional)</legend>
          <textarea rows="3" name="accessible-parking"></textarea>
        </fieldset>
      </div>

      <div class="item">
        <fieldset>
          <legend class="required-legend" >How will people find you?</legend>
          <div class="alert alert-info">
            Perhaps you will be holding a sign, wearing a special t-shirt or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.
          </div>
          <textarea rows="3" name="accessible-find"></textarea>
        </fieldset>
      </div>

      <hr>
      <a href="#team" class="btn btn-primary btn-large section-save" data-toggle="tab">Next</a><br><br>
    </div>

    <div class="tab-pane" id="team">
      <div class="page-header" data-section="team">
        <h1>Build Your Team</h1>
      </div>

      <div class="team-member thumbnail useredited" id="walk-leader-me">
        <fieldset>
          <input type="hidden" name="type[]" value="you">
          <input type="hidden" name="user_id[]" value="<?=$u->getUserID()?>">
          <legend>You</legend>
          <div class="row-fluid" id="walkleader">
            <div class="span9">
              <div class="item required">
                <label for="name">Name</label>
                <input type="text" class="input-small" name="name-first[]" id="name" placeholder="First" value="<?=htmlspecialchars($ui->getAttribute("first_name"))?>">
                <input type="text" class="input-small" name="name-last[]" id="name" placeholder="Last" value="<?=htmlspecialchars($ui->getAttribute("last_name"))?>">
              </div>

              <div class="item required">
                <label for="role">Role</label>
                <select id="role" name="role[]">
                  <option value="walk-leader" selected>Walk Leader</option>
                  <option value="co-walk-leader">Co-Walk Leader</option>
                  <option value="walk-organizer">Walk Organizer</option>
                </select>
              </div>
              <div class="item hide" id="primary-walkleader-select">
                <label class="checkbox"><input type="checkbox" name="primary[]" class="role-check" checked>  Primary Walk Leader</label>
              </div>
              <div class="item required">
                <label for="bio">Introduce yourself</label>
                <div class="alert alert-info">
                  We recommend keeping your bio under 60 words
                </div>
                <textarea class="span12" id="bio" rows="6" name="bio[]"><?=htmlspecialchars($ui->getAttribute("bio"))?></textarea>
              </div>

              <div class="row-fluid" id="newwalkleader">
                <div class="span6"> 
                  <label for="leader-twitter"><i class="icon-twitter"></i> Twitter</label>
                  <div class="input-prepend">
                    <span class="add-on">@</span>
                    <input class="span12" id="leader-twitter" type="text" placeholder="Username" name="twitter[]" value="<?=htmlspecialchars($ui->getAttribute("twitter"))?>">
                  </div>
                </div>

                <div class="span6">
                  <label for="facebook"><i class="icon-facebook-sign"></i> Facebook</label>
                  <input type="text" class="input-large" id="facebook" placeholder="" name="facebook[]" value="<?=htmlspecialchars($ui->getAttribute("facebook"))?>">
                </div>

              </div>

              <div class="row-fluid" id="newwalkleader">
                <div class="span6">
                  <label for="website"><i class="icon-link"></i> Website</label>
                  <input type="text" class="input-large" id="website" placeholder="" name="website[]" value="<?=htmlspecialchars($ui->getAttribute("website"))?>">
                </div>
              </div>

              <hr>
              <div class="private">
                <h4>We'll keep this part private</h4>
                <div class="alert alert-info">
                  We'll use this information to contact you about your walk submission. We wont share this information with 3rd parties.
                </div>

                <div class="row-fluid" id="newwalkleader">
                  <div class="span6 required"> 
                    <label for="you-email"><i class="icon-envelope"></i> Email</label>
                    <input type="email" class="input-large" id="you-email" placeholder="" name="email[]" value="<?=$ui->getUserEmail()?>">
                  </div>

                  <div class="span6 tel required">
                    <label for="phone"><i class="icon-phone-sign"></i> Phone Number</label>
                    <input type="tel" maxlength="18" class="input-large" id="phone" placeholder="" name="phone[]" value="<?=htmlspecialchars($ui->getAttribute("phone"))?>">
                  </div>
                </div>
              </div>  
            </div>
          </div>
        </fieldset>
      </div>

      <!--Additional Members -->

      <div id="walk-members">

      </div>

      <div class="thumbnail team-member" id="add-member">
        <h2>Who else is involved with this walk?</h2>
        <h3 class="lead">Click to add team members to your walk (Optional)</h3>
        <div class="team-set">
          <div class="team-row">
            <section class="new-member" id="new-walkleader" title="Add New Walk Leader" data-new="walk-leader-new">
              <div class="icon"></div>
              <h4 class="title text-center">Walk Leader</h4>
              <p>A person presenting information, telling stories, and fostering discussion during the Jane's Walk.</p>
            </section>
            <section class="new-member" id="new-walkorganizer" title="Add New Walk Organizer" data-new="walk-organizer-new">
              <div class="icon"></div>
              <h4 class="title text-center">Walk Organizer</h4>
              <p>A person responsible for outreach to new and returning Walk Leaders and Community Voices.</p>
            </section>
          </div>
          <div class="team-row">
            <section class="new-member" id="new-communityvoice" title="Add A Community Voice" data-new="community-voice-new">
              <div class="icon"></div>
              <h4 class="title text-center">Community Voice</h4>
              <p>A community member with stories and/or personal experiences to share.</p>
            </section>
            <section class="new-member" id="new-othermember" title="Add another helper to your walk" data-new="othermember-new">
              <div class="icon"></div>
              <h4 class="title text-center">Volunteers</h4>
              <p>Other people who are helping to make your walk happen.</p>
            </section>
          </div>
        </div>
      </div>

      <!-- Start Walk Leader -->

      <div class="thumbnail team-member hide walk-leader clearfix" id="walk-leader-new">
        <fieldset>
          <input type="hidden" name="type[]" value="leader">
          <input type="hidden" name="user_id[]" value="-1">
          <legend>Walk Leader</legend>

          <div class="row-fluid" id="walkleader">
            <div class="span9">
              <div class="item required">
                <label for="name">Name</label>
                <div class="item">
                  <form class="form-inline">
                    <input type="text" class="input-small" id="name" placeholder="First" name="name-first[]" />
                    <input type="text" class="input-small" id="name" placeholder="Last" name="name-last[]" />
                  </form>
                </div>
              </div>
              <div class="item" id="primary-walkleader-select">
                <label class="checkbox"><input type="checkbox" class="role-check" name="primary[]">  Primary Walk Leader</label>
              </div>

              <div class="item required">
                <label for="bio">Introduce the walk leader</label>
                <div class="alert alert-info">
                  We recommend keeping the bio under 60 words
                </div>
                <textarea class="span12" id="bio" rows="6" name="bio[]"></textarea>
              </div>

              <div class="row-fluid" id="newwalkleader">
                <div class="span6"> 
                  <label for="prependedInput"><i class="icon-twitter"></i> Twitter</label>
                  <div class="input-prepend">
                    <span class="add-on">@</span>
                    <input id="prependedInput" class="span12" type="text" placeholder="Username" name="twitter[]">
                  </div>
                </div>

                <div class="span6">
                  <label for="facebook"><i class="icon-facebook-sign"></i> Facebook</label>
                  <input type="text" class="input-large" id="facebook" placeholder="" name="facebook[]">
                </div>
              </div>

              <div class="row-fluid" id="newwalkleader">
                <div class="span6">
                  <label for="website"><i class="icon-link"></i> Website</label>
                  <input type="text" class="input-large" id="website" placeholder="" value="" name="website[]">
                </div>
              </div>

              <hr>

              <h4>Private</h4>
              <div class="alert alert-info">
                We'll use this information to contact you about your walk submission. We wont share this information with 3rd parties.</div>

              <div class="row-fluid" id="newwalkleader">
                <div class="span6 required"> 
                  <label for="email"><i class="icon-envelope"></i> Email</label>
                  <input type="email" class="input-large" id="email" placeholder="Email" name="email[]">
                </div>
                <div class="span6 tel">
                  <label for="phone"><i class="icon-phone-sign"></i> Phone Number</label>
                  <input type="tel" maxlength="16" class="input-large" id="phone" placeholder="" name="phone[]">
                </div>
              </div>  
            </div>
          </div>
        </fieldset>
        <footer>
          <button class="btn remove-team-member">Remove Team Member</button>
        </footer>  
      </div>

      <!-- Start Walk Organizer -->

      <div class="thumbnail team-member walk-organizer hide" id="walk-organizer-new">
        <fieldset>
          <legend>Walk Organizer</legend>
          <input type="hidden" name="type[]" value="organizer">
          <input type="hidden" name="user_id[]" value="-1">
          <div class="row-fluid" id="walkleader">
            <div class="span9">
              <div class="item required">
                <label for="name">Name</label>
                <form class="form-inline">
                  <input type="text" class="input-small" id="name" placeholder="First" name="name-first[]">
                  <input type="text" class="input-small" id="name" placeholder="Last" name="name-last[]">
                </form>
              </div>
              <label for="affiliation">Affilated Institution (Optional)</label>
              <input type="text" class="input-large" id="name" placeholder="e.g. City of Toronto" name="institution[]">
              <div class="row-fluid" id="newwalkleader">
                <div class="span6">
                  <label for="website"><i class="icon-link"></i> Website</label>
                  <input type="text" class="input-large span12" id="website" placeholder="" value="" name="name-website[]">
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <footer>
          <button class="btn remove-team-member">Remove Team Member</button>
        </footer> 
      </div>

      <!-- Start Community Voice -->

      <div class="thumbnail team-member hide community-voice" id="community-voice-new">
        <fieldset>
          <input type="hidden" name="type[]" value="community">
          <input type="hidden" name="user_id[]" value="-1">
          <legend id="community-voice">Community Voice</legend>
          <div class="row-fluid" id="walkleader">
            <div class="span9">
              <div class="item required">
                <label for="name">Name</label>
                <form class="form-inline">
                  <input type="text" class="input-small" id="name" placeholder="First" name="name-first[]">
                  <input type="text" class="input-small" id="name" placeholder="Last" name="name-last[]">
                </form>
              </div>
              <div class="item">
                <label for="bio">Tell everyone about this person</label>
                <div class="alert alert-info">
                  We recommend keeping the bio under 60 words
                </div>
                <textarea class="span12" id="bio" rows="6" name="bio[]"></textarea>
              </div>
              <div class="row-fluid" id="newwalkleader">
                <div class="span6"> 
                  <label for="prependedInput"><i class="icon-twitter"></i> Twitter</label>
                  <div class="input-prepend">
                    <span class="add-on">@</span>
                    <input class="span12" id="prependedInput" type="text" placeholder="Username" name="twitter[]">
                  </div>
                </div>
                <div class="span6">
                  <label for="facebook"><i class="icon-facebook-sign"></i> Facebook</label>
                  <input type="text" class="input-large" id="facebook" placeholder="" name="facebook[]">
                </div>
              </div>
              <div class="row-fluid" id="newwalkleader">
                <div class="span6">
                  <label for="website"><i class="icon-link"></i> Website</label>
                  <input type="text" class="input-large span12" id="website" placeholder="" value="" name="website[]">
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <footer>
          <button class="btn remove-team-member">Remove Team Member</button>
        </footer> 
      </div>

      <!-- Other -->
      <div class="thumbnail team-member hide othermember" id="othermember-new">
        <fieldset>
          <legend id="othermember">Volunteers</legend>
          <input type="hidden" name="type[]" value="volunteer">
          <input type="hidden" name="user_id[]" value="-1">
          <div class="row-fluid" id="walkleader">
            <div class="span9">
              <div class="item required">
                <label for="name">Name</label>
                <form class="form-inline">
                  <input type="text" class="input-small" id="name" placeholder="First" name="name-first[]">
                  <input type="text" class="input-small" id="name" placeholder="Last" name="name-last[]">
                </form>
              </div>

              <div class="item required">
                <label for="role">Role</label>
                <input type="text" id="role" name="role[]">
              </div>

              <div class="row-fluid" id="newwalkleader">
                <div class="span6">
                  <label for="website"><i class="icon-link"></i> Website</label>
                  <input type="text" class="input-large span12" id="website" placeholder="" value="" name="website[]">
                </div>
              </div>

            </div>
          </div>
        </fieldset>
        <footer>
          <button class="btn remove-othermember">Remove Team Member</button>
        </footer> 
      </div>
      <hr>
      <button class="btn btn-primary btn-large section-save" id="section-save">Save</button><br><br>
    </div>
  </div>
</div>

<div class="span3" id="tips-column">
  <aside id="tips-panel" role="complementary">
    <div class="popover right" id="city-organizer" style="display:block;">
      <h3 class="popover-title" data-toggle="collapse" data-target="#popover-content"><i class="icon-envelope"></i> Contact City Organizer for help</h3>
      <div class="popover-content collapse in" id="popover-content">
        <?= ($avatar = $av->getImagePath($ui_cityorganizer)) ? "<div class='u-avatar' style='background-image:url({$avatar})'></div>" : null; ?>
        <p>
          <?="Hi! I'm ".($ui_cityorganizer->getAttribute('first_name') ?: $ui_cityorganizer->getUserName())." the City Organizer for Jane's Walk {$city->getCollectionName()}. I'm here to help, so if you have any questions, please <strong><a href='mailto:{$ui_cityorganizer->getUserEmail()}'>email me!</a></strong></p>"?>
      </div>
    </div>
    <!-- Profile of City organizer -->

    <!-- Tip Title Here -->
    <div class="popover right tip fade" data-tipfor="transit">
      <h3 class="popover-title">Make it easy to get there by transit</h3>
      <div class="popover-content">
        <p>Have your walk start and finish near a transit stop to make it more accessible</p>
      </div>
    </div>

    <!-- Tip Title Here -->
    <div class="popover right tip fade" data-tipfor="question-one">
      <h3 class="popover-title">Creating Great Walks</h3>
      <div class="popover-content">
        <a href="#video-tip" data-toggle="modal"></a>
        <a href="#video-tip" data-toggle="modal" class="text-center">Watch the video</a>
      </div>
    </div>

    <!-- Tip Title Here -->
    <div class="popover right tip fade" data-tipfor="map-canvas">
      <h3 class="popover-title">Learn something new</h3>
      <div class="popover-content">
        <p>Think of a question you can ask at each stop to engage the group and create some AHA! moment, for both them and you too.</p>
      </div>
    </div>

    <!-- Tip Title Here -->
    <div class="popover right tip fade" data-tipfor="add-member">
      <h3 class="popover-title">Take a load off</h3>
      <div class="popover-content">
        <p>Sharing  the  hosting  duties  with  some  co‐guides  is  often  a  good  idea  and  lightens  the  load.</p>
      </div>
    </div>

    <!-- Tip Title Here -->
    <div class="popover right tip fade" data-tipfor="longwalkdescription">
      <h3 class="popover-title">Make your description shine</h3>
      <div class="popover-content">
        <p>Ask some rhetorical questions that have to do with what you’ll talk about. In your description, give people an idea of whether on your walk they'll be stopping and talking with local shop owners or residents. </p>
      </div>
    </div>

    <!-- Tip Title Here -->
    <div class="popover right tip fade" data-tipfor="walkduration">

      <h3 class="popover-title">Calculating your Walk Length</h3>
      <div class="popover-content">
        <p>Make your walk duration twice as long as your rehearsal walk.</p>
      </div>
    </div>

    <!-- Tip Title Here -->
    <div class="popover right tip fade" data-tipfor="new-communityvoice">
      <h3 class="popover-title">Give your walk more character!</h3>
      <div class="popover-content">
        <p>Consider  involving  some  local  residents  or  business  people  on  the  stroll.  Talk  to  a  hot‐dog  vendor  who  is  thoroughly  familiar  with  the  characters,  habituees,  the  patterns  and  rhythms  of  the  street  (Jane  Jacobs  idea  of  the  sidewalk  ballet).  You  might  want  to  drop  into  a store,  feature  an  older  neighbour  with  interesting  stories,  or  even  meet up  with  a  local  politician  to get  their  perspective  on  the  neighbourhood.
        </p>
      </div>
    </div>

    <!-- Tip Title Here -->
    <div class="popover right tip fade" data-tipfor="addpoint">

      <h3 class="popover-title">Find the sweet spot</h3>
      <div class="popover-content">
        <p>We recomend having between 6 and 10 stops on a walk.</p>
      </div>
    </div>

    <!-- New #1 Tip Title Here -->
    <div class="popover right tip fade" data-tipfor="longwalkdescription">

      <h3 class="popover-title">Keep the conversation 50/50</h3>
      <div class="popover-content">
        <p>Look for opportunities to engage your participants with questions and conversation that lead to a 50/50 split between walk leaders presenting and participants</p>
      </div>
    </div>

    <!-- New #2 Tip Title Here -->
    <div class="popover right tip fade" data-tipfor="longwalkdescription">

      <h3 class="popover-title">Include Multiple Views</h3>
      <div class="popover-content">
        <p>If your presenting a subject that could be viewed from different perspectives, include them in the walk. Better yet, have people on the walk share alternative views</p>
      </div>
    </div>

    <!-- New #3 Tip Title Here -->
    <div class="popover right tip fade" data-tipfor="longwalkdescription">
      <h3 class="popover-title">Taking the Next Step</h3>
      <div class="popover-content">
        <p>Places are always changing. Discuss how your topics will evolve and change over time. Whats the future view, and could participants get more engaged in this place.
        </p>
      </div>
    </div>
  </aside>
</div>
  </div>
</div>

<!-- Publish Model 1 -->
<div id="publish-warning" class="modal hide fade">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h3>Okay, You're Ready to Publish</h3>
  </div>
  <div class="modal-body">
    <p>Just one more thing! Once you hit publish your walk will be live on Jane's Walk right away. You can return at any time to make changes.</p>
  </div>

  <div class="modal-footer">
    <div class="pull-left">
      <a href="" class="walkthrough close" data-dismiss="modal"> Bring me back to edit</a>
    </div>
    <a href="<?php echo $this->url('/profile') ?>">
      <button class="btn btn-primary walkthrough" data-step="publish-confirmation">Publish</button></a>
  </div>

</div>

<!-- Publish Model 2 -->
<div id="publish-confirmation" class="modal hide fade">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h3>Your Walk Has Been Published!</h3>
  </div>
  <div class="modal-body">
    <p>Congratulations! Your walk is now available for all to peruse.</p>
    <h2 class="lead"> Don't forget to share your walk!</h2>
    <label>Your Walk Web Address:</label>
    <input type="text" class="clone js-url-field" value="http://janeswalk.tv/be-there-be-square.html" readonly="readonly">
    <hr>
    <button class="btn facebook"><i class="icon-facebook-sign"></i> Share on Facebook</button>
    <button class="btn twitter"><i class="icon-twitter-sign"></i> Share on Twitter</button>
  </div>
  <div class="modal-footer">
    <button class="btn btn-primary walkthrough">Close</button>
  </div>
</div>

<!-- Preview Modal -->
<div id="preview-modal" class="modal hide fade">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h3>Preview of your Walk</h3>
  </div>
  <div class="modal-body">
    <iframe src="" frameborder="0">
    </iframe>
  </div>
  <div class="modal-footer">
    <a href="#" class="btn close" data-dismiss="modal">Close Preview</a>
  </div>
</div>

